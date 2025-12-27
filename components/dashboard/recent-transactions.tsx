import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface Transaction {
  id: string
  amount: number
  currency: string
  fraud_score: number
  risk_level: string
  prediction: string
  created_at: string
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold">
                      {transaction.currency} {transaction.amount.toFixed(2)}
                    </span>
                    <Badge
                      variant={
                        transaction.risk_level === "high"
                          ? "destructive"
                          : transaction.risk_level === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {transaction.risk_level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold">{transaction.fraud_score.toFixed(4)}</div>
                  <p className="text-xs text-muted-foreground capitalize">{transaction.prediction}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
