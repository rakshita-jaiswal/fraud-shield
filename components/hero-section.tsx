import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="size-4" />
            <span>Sub-200ms response time</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            AI-Powered Fraud Detection for <span className="text-primary">Growing Businesses</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Real-time transaction scoring with explainable AI. Pay only $0.01 per transaction. No setup fees, no hidden
            costs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="gap-2">
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
              <Shield className="size-6 text-primary" />
              <div className="text-2xl font-bold">99.5%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
              <Zap className="size-6 text-primary" />
              <div className="text-2xl font-bold">{"<200ms"}</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
              <TrendingUp className="size-6 text-primary" />
              <div className="text-2xl font-bold">$0.01</div>
              <div className="text-sm text-muted-foreground">Per Transaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
