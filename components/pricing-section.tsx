import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const features = [
  "Real-time fraud scoring",
  "SHAP explainability",
  "REST API access",
  "Dashboard & analytics",
  "Email support",
  "SOC 2 compliant",
  "No monthly minimums",
  "No setup fees",
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Pay only for what you use. No hidden fees, no surprises.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative p-8 rounded-2xl border-2 border-primary bg-card shadow-lg">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                Pay As You Go
              </span>
            </div>

            <div className="text-center mb-8 pt-4">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold">$0.01</span>
                <span className="text-muted-foreground">per transaction</span>
              </div>
              <p className="text-sm text-muted-foreground">First 10,000 transactions free</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="w-full" asChild>
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
