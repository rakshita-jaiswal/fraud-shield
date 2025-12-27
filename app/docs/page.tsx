import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">API Documentation</h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  Complete guide to integrating FraudShield SMB into your application.
                </p>
              </div>

              <div className="space-y-12">
                {/* Getting Started */}
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold">Getting Started</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      To start using the FraudShield API, you'll need to create an account and generate an API key from
                      your dashboard.
                    </p>
                    <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                      <li>Sign up at FraudShield SMB</li>
                      <li>Navigate to the API Keys section in your dashboard</li>
                      <li>Click "Create New Key" and copy your API key</li>
                      <li>Use the key in the Authorization header for all API requests</li>
                    </ol>
                  </div>
                </section>

                {/* Authentication */}
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold">Authentication</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All API requests require authentication using Bearer token in the Authorization header.
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </section>

                {/* Score Transaction Endpoint */}
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold">Score Transaction</h2>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs font-semibold rounded">POST</span>
                      <code className="text-sm">/api/v1/score</code>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Submit a transaction for real-time fraud scoring with SHAP explanations.
                    </p>

                    <h3 className="font-semibold mb-3">Request Body</h3>
                    <div className="bg-muted rounded-lg p-4 mb-6 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`{
  "transaction_id": "txn_abc123",
  "amount": 99.99,
  "currency": "USD",
  "user_id": "user_123",
  "email": "user@example.com",
  "ip_address": "192.168.1.1",
  "device_fingerprint": "fp_xyz789",
  "billing_address": {
    "country": "US",
    "zip": "10001"
  },
  "account_age_days": 30,
  "previous_transactions": 5
}`}</code>
                      </pre>
                    </div>

                    <h3 className="font-semibold mb-3">Response</h3>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`{
  "fraud_score": 0.23,
  "risk_level": "low",
  "prediction": "legitimate",
  "shap_values": {
    "amount": 0.05,
    "account_age_days": -0.15,
    "transaction_velocity": 0.08
  },
  "transaction_id": "txn_abc123",
  "timestamp": "2025-01-15T10:30:00Z"
}`}</code>
                      </pre>
                    </div>
                  </div>
                </section>

                {/* Code Examples */}
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold">Code Examples</h2>

                  {/* Node.js Example */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Node.js</h3>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`const response = await fetch('https://your-domain.com/api/v1/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    transaction_id: 'txn_abc123',
    amount: 99.99,
    currency: 'USD',
    user_id: 'user_123',
    email: 'user@example.com',
    ip_address: '192.168.1.1'
  })
});

const result = await response.json();
console.log('Fraud Score:', result.fraud_score);
console.log('Risk Level:', result.risk_level);`}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Python Example */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Python</h3>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`import requests

url = "https://your-domain.com/api/v1/score"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "transaction_id": "txn_abc123",
    "amount": 99.99,
    "currency": "USD",
    "user_id": "user_123",
    "email": "user@example.com",
    "ip_address": "192.168.1.1"
}

response = requests.post(url, json=data, headers=headers)
result = response.json()
print(f"Fraud Score: {result['fraud_score']}")
print(f"Risk Level: {result['risk_level']}")`}</code>
                      </pre>
                    </div>
                  </div>

                  {/* cURL Example */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">cURL</h3>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`curl -X POST https://your-domain.com/api/v1/score \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "transaction_id": "txn_abc123",
    "amount": 99.99,
    "currency": "USD",
    "user_id": "user_123",
    "email": "user@example.com",
    "ip_address": "192.168.1.1"
  }'`}</code>
                      </pre>
                    </div>
                  </div>
                </section>

                {/* Rate Limits */}
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold">Rate Limits</h2>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-muted-foreground mb-4">
                      All API endpoints are subject to rate limiting to ensure fair usage:
                    </p>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                      <li>100 requests per minute per API key</li>
                      <li>10,000 requests per day per API key</li>
                      <li>Rate limit headers included in all responses</li>
                    </ul>
                  </div>
                </section>

                {/* Error Codes */}
                <section className="space-y-6">
                  <h2 className="text-3xl font-bold">Error Codes</h2>
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-4 font-semibold">Code</th>
                          <th className="text-left p-4 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="p-4 font-mono text-sm">400</td>
                          <td className="p-4 text-muted-foreground">Bad Request - Invalid parameters</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-mono text-sm">401</td>
                          <td className="p-4 text-muted-foreground">Unauthorized - Invalid API key</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-mono text-sm">429</td>
                          <td className="p-4 text-muted-foreground">Too Many Requests - Rate limit exceeded</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-mono text-sm">500</td>
                          <td className="p-4 text-muted-foreground">Internal Server Error</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Need Help */}
                <section className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
                    <p className="text-muted-foreground mb-6">
                      Our team is here to help you integrate FraudShield SMB successfully.
                    </p>
                    <Button asChild size="lg">
                      <a href="mailto:support@fraudshield.example.com">Contact Support</a>
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
