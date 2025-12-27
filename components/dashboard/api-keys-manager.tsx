"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Copy, Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"

interface ApiKey {
  id: string
  key_prefix: string
  name: string
  is_active: boolean
  created_at: string
  last_used_at: string | null
}

interface ApiKeysManagerProps {
  apiKeys: ApiKey[]
  userId: string
}

export function ApiKeysManager({ apiKeys, userId }: ApiKeysManagerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newApiKey, setNewApiKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateKey = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/dashboard/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      })

      if (!response.ok) throw new Error("Failed to create API key")

      const { api_key } = await response.json()
      setNewApiKey(api_key)
      setNewKeyName("")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error creating API key:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) return

    try {
      const response = await fetch(`/api/dashboard/api-keys/${keyId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete API key")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error deleting API key:", error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            API keys are used to authenticate your requests to the fraud detection API.
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="size-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apiKeys.map((key) => (
          <Card key={key.id}>
            <CardHeader>
              <CardTitle className="text-lg">{key.name || "Unnamed Key"}</CardTitle>
              <CardDescription className="font-mono text-xs">{key.key_prefix}...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className={key.is_active ? "text-primary" : "text-muted-foreground"}>
                  {key.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDistanceToNow(new Date(key.created_at), { addSuffix: true })}</span>
              </div>
              {key.last_used_at && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last used</span>
                  <span>{formatDistanceToNow(new Date(key.last_used_at), { addSuffix: true })}</span>
                </div>
              )}
              <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDeleteKey(key.id)}>
                <Trash2 className="size-4 mr-2" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>Give your API key a name to help you identify it later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="keyName">Key Name</Label>
              <Input
                id="keyName"
                placeholder="Production Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <Button onClick={handleCreateKey} disabled={!newKeyName || isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Key"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!newApiKey} onOpenChange={() => setNewApiKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Save this API key now. You won&apos;t be able to see it again after closing this dialog.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Your API Key</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={newApiKey || ""}
                  readOnly
                  type={showKey ? "text" : "password"}
                  className="font-mono text-sm"
                />
                <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(newApiKey!)}>
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
