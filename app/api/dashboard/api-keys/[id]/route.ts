import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

// DELETE /api/dashboard/api-keys/:id - Delete an API key
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete the API key
    const { error } = await supabase.from("api_keys").delete().eq("id", id).eq("user_id", user.id)

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to delete API key" }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] API key deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
