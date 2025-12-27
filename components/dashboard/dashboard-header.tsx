"use client"

import Link from "next/link"
import { Shield, LogOut, Key, LayoutDashboard, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="size-6 text-primary" />
          <span className="text-lg font-semibold">FraudShield SMB</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/transactions"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/dashboard/transactions" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ListFilter className="size-4" />
            Transactions
          </Link>
          <Link
            href="/dashboard/api-keys"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/dashboard/api-keys" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Key className="size-4" />
            API Keys
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {user.user_metadata?.full_name || user.email}
          </span>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
