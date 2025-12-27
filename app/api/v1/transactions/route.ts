import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/api-key-auth"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

export const runtime = "nodejs"

// GET /api/v1/transactions - List transactions for the authenticated user
export async function GET(request: NextRequest) {
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

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "50"), 100)
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const riskLevel = searchParams.get("risk_level")

    const supabase = createServiceRoleClient()

    // Build query
    let query = supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("user_id", validation.userId!)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (riskLevel && ["low", "medium", "high"].includes(riskLevel)) {
      query = query.eq("risk_level", riskLevel)
    }

    const { data: transactions, error, count } = await query

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
    }

    return NextResponse.json(
      {
        transactions,
        pagination: {
          limit,
          offset,
          total: count || 0,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Transactions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
