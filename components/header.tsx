import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="size-6 text-primary" />
          <span className="text-lg font-semibold">FraudShield SMB</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
