import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to protect your business?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 text-pretty">
            Join hundreds of businesses using FraudShield SMB to fight fraud and protect revenue. Get started in
            minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
            >
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
