import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createHash, randomBytes } from "crypto"

export const runtime = "nodejs"

// POST /api/dashboard/api-keys - Create a new API key
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const name = body.name || "Unnamed Key"

    // Generate API key
    const apiKey = `sk_live_${randomBytes(32).toString("hex")}`
    const keyHash = createHash("sha256").update(apiKey).digest("hex")
    const keyPrefix = apiKey.substring(0, 12)

    // Insert into database
    const { error } = await supabase.from("api_keys").insert({
      user_id: user.id,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      name,
      is_active: true,
    })

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to create API key" }, { status: 500 })
    }

    return NextResponse.json({ api_key: apiKey }, { status: 201 })
  } catch (error) {
    console.error("[v0] API key creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
