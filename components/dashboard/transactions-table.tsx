"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"

interface Transaction {
  id: string
  amount: number
  currency: string
  fraud_score: number
  risk_level: string
  prediction: string
  shap_values: Record<string, number>
  user_email?: string
  user_country?: string
  payment_method?: string
  created_at: string
}

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Score</th>
                    <th className="pb-3 font-medium">Risk</th>
                    <th className="pb-3 font-medium">Prediction</th>
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border last:border-0">
                      <td className="py-4 font-semibold">
                        {transaction.currency} {transaction.amount.toFixed(2)}
                      </td>
                      <td className="py-4 font-mono text-sm">{transaction.fraud_score.toFixed(4)}</td>
                      <td className="py-4">
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
                      </td>
                      <td className="py-4 capitalize">{transaction.prediction}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Detailed fraud analysis and SHAP values</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="font-semibold">
                    {selectedTransaction.currency} {selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fraud Score</p>
                  <p className="font-mono font-semibold">{selectedTransaction.fraud_score.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                  <Badge
                    variant={
                      selectedTransaction.risk_level === "high"
                        ? "destructive"
                        : selectedTransaction.risk_level === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {selectedTransaction.risk_level}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prediction</p>
                  <p className="capitalize">{selectedTransaction.prediction}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">SHAP Values (Feature Importance)</h4>
                <div className="space-y-2">
                  {Object.entries(selectedTransaction.shap_values || {}).map(([feature, value]) => (
                    <div key={feature} className="flex items-center gap-3">
                      <span className="text-sm font-medium min-w-32 capitalize">{feature.replace(/_/g, " ")}</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${value > 0 ? "bg-destructive" : "bg-primary"}`}
                          style={{ width: `${Math.abs(value) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono w-16 text-right">{value.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTransaction.user_email && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">User Email</p>
                  <p className="text-sm">{selectedTransaction.user_email}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
