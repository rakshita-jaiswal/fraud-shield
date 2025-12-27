import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ApiKeysManager } from "@/components/dashboard/api-keys-manager"

export default async function ApiKeysPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user's API keys
  const { data: apiKeys } = await supabase
    .from("api_keys")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">API Keys</h1>
            <p className="text-muted-foreground">Manage your API keys for accessing the fraud detection API</p>
          </div>

          <ApiKeysManager apiKeys={apiKeys || []} userId={user.id} />
        </div>
      </main>
    </div>
  )
}
