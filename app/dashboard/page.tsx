import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user's transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Calculate stats
  const totalTransactions = transactions?.length || 0
  const highRiskCount = transactions?.filter((t) => t.risk_level === "high").length || 0
  const fraudulentCount = transactions?.filter((t) => t.prediction === "fraudulent").length || 0
  const avgScore =
    transactions && transactions.length > 0
      ? transactions.reduce((acc, t) => acc + t.fraud_score, 0) / transactions.length
      : 0

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Monitor your fraud detection activity</p>
          </div>

          <StatsCards
            totalTransactions={totalTransactions}
            highRiskCount={highRiskCount}
            fraudulentCount={fraudulentCount}
            avgScore={avgScore}
          />

          <RecentTransactions transactions={transactions || []} />
        </div>
      </main>
    </div>
  )
}
