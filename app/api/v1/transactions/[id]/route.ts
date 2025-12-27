import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/api-key-auth"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

export const runtime = "nodejs"

// GET /api/v1/transactions/:id - Get a specific transaction
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

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

    const supabase = createServiceRoleClient()

    // Fetch transaction
    const { data: transaction, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .eq("user_id", validation.userId!)
      .single()

    if (error || !transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ transaction }, { status: 200 })
  } catch (error) {
    console.error("[v0] Transaction detail API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
