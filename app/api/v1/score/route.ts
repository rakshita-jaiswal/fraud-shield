import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/api-key-auth"
import { detectFraud } from "@/lib/fraud-detection"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

export const runtime = "nodejs"

// POST /api/v1/score - Score a transaction for fraud
export async function POST(request: NextRequest) {
  try {
    // Extract API key from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 })
    }

    const apiKey = authHeader.replace("Bearer ", "")

    // Validate API key
    const validation = await validateApiKey(apiKey)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error || "Invalid API key" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (typeof body.amount !== "number" || body.amount <= 0) {
      return NextResponse.json({ error: "Invalid amount: must be a positive number" }, { status: 400 })
    }

    // Run fraud detection
    const fraudResult = await detectFraud({
      amount: body.amount,
      currency: body.currency,
      userEmail: body.user_email,
      userIp: body.user_ip,
      userCountry: body.user_country,
      deviceFingerprint: body.device_fingerprint,
      paymentMethod: body.payment_method,
      merchantCategory: body.merchant_category,
    })

    // Store transaction in database
    const supabase = createServiceRoleClient()
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        user_id: validation.userId,
        transaction_id: body.transaction_id,
        amount: body.amount,
        currency: body.currency || "USD",
        user_email: body.user_email,
        user_ip: body.user_ip,
        user_country: body.user_country,
        device_fingerprint: body.device_fingerprint,
        payment_method: body.payment_method,
        merchant_category: body.merchant_category,
        fraud_score: fraudResult.fraudScore,
        risk_level: fraudResult.riskLevel,
        prediction: fraudResult.prediction,
        shap_values: fraudResult.shapValues,
        model_version: "v1.0",
        processing_time_ms: fraudResult.processingTimeMs,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to store transaction" }, { status: 500 })
    }

    // Track usage
    await trackUsage(validation.userId!, validation.keyId!)

    // Return fraud score response
    return NextResponse.json(
      {
        transaction_id: transaction.id,
        fraud_score: fraudResult.fraudScore,
        risk_level: fraudResult.riskLevel,
        prediction: fraudResult.prediction,
        shap_values: fraudResult.shapValues,
        processing_time_ms: fraudResult.processingTimeMs,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Score API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function trackUsage(userId: string, apiKeyId: string) {
  const supabase = createServiceRoleClient()

  const now = new Date()
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Upsert usage tracking
  await supabase
    .from("usage_tracking")
    .upsert(
      {
        user_id: userId,
        api_key_id: apiKeyId,
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
        request_count: 1,
        transaction_count: 1,
        updated_at: now.toISOString(),
      },
      {
        onConflict: "user_id,period_start,period_end",
        ignoreDuplicates: false,
      },
    )
    .select()
}
