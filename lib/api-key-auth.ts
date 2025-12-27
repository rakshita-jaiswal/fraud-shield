import { createServiceRoleClient } from "@/lib/supabase/service-role"
import { createHash } from "crypto"

export interface ApiKeyValidation {
  isValid: boolean
  userId?: string
  keyId?: string
  error?: string
}

export async function validateApiKey(apiKey: string): Promise<ApiKeyValidation> {
  if (!apiKey || !apiKey.startsWith("sk_")) {
    return { isValid: false, error: "Invalid API key format" }
  }

  try {
    // Hash the API key for lookup
    const keyHash = createHash("sha256").update(apiKey).digest("hex")

    const supabase = createServiceRoleClient()

    // Look up the API key
    const { data: apiKeyData, error } = await supabase
      .from("api_keys")
      .select("id, user_id, is_active")
      .eq("key_hash", keyHash)
      .single()

    if (error || !apiKeyData) {
      return { isValid: false, error: "API key not found" }
    }

    if (!apiKeyData.is_active) {
      return { isValid: false, error: "API key is inactive" }
    }

    // Update last used timestamp
    await supabase.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", apiKeyData.id)

    return {
      isValid: true,
      userId: apiKeyData.user_id,
      keyId: apiKeyData.id,
    }
  } catch (error) {
    console.error("[v0] API key validation error:", error)
    return { isValid: false, error: "Validation failed" }
  }
}
