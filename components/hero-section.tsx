import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="size-4" />
            <span>Sub-200ms response time</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            AI-Powered Fraud Detection for <span className="text-primary">Growing Businesses</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 text-pretty max-w-3xl mx-auto leading-relaxed">
            Real-time transaction scoring with explainable AI. Pay only $0.01 per transaction. No setup fees, no hidden
            costs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" asChild className="gap-2 w-full sm:w-auto">
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                <Shield className="size-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">99.5%</div>
              <div className="text-sm text-muted-foreground font-medium">Accuracy Rate</div>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                <Zap className="size-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">{"<200ms"}</div>
              <div className="text-sm text-muted-foreground font-medium">Response Time</div>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                <TrendingUp className="size-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">$0.01</div>
              <div className="text-sm text-muted-foreground font-medium">Per Transaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
