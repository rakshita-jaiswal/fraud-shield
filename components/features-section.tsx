import { Brain, Zap, BarChart3, Lock, Code, DollarSign } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Explainable AI",
    description:
      "SHAP values provide clear insights into every fraud decision. Understand exactly why a transaction was flagged.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-200ms response times ensure your checkout flow stays smooth while staying protected.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Scoring",
    description: "Get instant fraud scores (0-1) and risk levels (low/medium/high) for every transaction.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC 2 compliance, and data privacy guarantees built in.",
  },
  {
    icon: Code,
    title: "Developer First",
    description: "Simple REST API with comprehensive docs. Integrate in minutes with any tech stack.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Pay only $0.01 per transaction. No setup fees, no monthly minimums, no surprises.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Everything you need to fight fraud</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Built for startups and SMBs who need enterprise-grade fraud detection without the enterprise price tag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
