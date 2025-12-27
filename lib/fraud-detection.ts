// Fraud detection ML model simulator
// In production, this would call your actual ML model service

interface TransactionInput {
  amount: number
  currency?: string
  userEmail?: string
  userIp?: string
  userCountry?: string
  deviceFingerprint?: string
  paymentMethod?: string
  merchantCategory?: string
}

interface FraudResult {
  fraudScore: number // 0.0 to 1.0
  riskLevel: "low" | "medium" | "high"
  prediction: "legitimate" | "fraudulent"
  shapValues: Record<string, number>
  processingTimeMs: number
}

export async function detectFraud(input: TransactionInput): Promise<FraudResult> {
  const startTime = Date.now()

  // Simulate ML model processing (in production, call your actual model)
  await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))

  // Calculate fraud score based on heuristics (this simulates ML model output)
  let fraudScore = 0.1 // Base score

  // High amount increases risk
  if (input.amount > 1000) fraudScore += 0.2
  if (input.amount > 5000) fraudScore += 0.3

  // Certain countries have higher risk
  const highRiskCountries = ["NG", "RU", "CN"]
  if (input.userCountry && highRiskCountries.includes(input.userCountry)) {
    fraudScore += 0.25
  }

  // Payment method risk
  if (input.paymentMethod === "crypto") fraudScore += 0.2

  // Add some randomness to simulate real model behavior
  fraudScore += Math.random() * 0.15

  // Cap at 1.0
  fraudScore = Math.min(fraudScore, 1.0)

  // Determine risk level
  let riskLevel: "low" | "medium" | "high"
  if (fraudScore < 0.3) riskLevel = "low"
  else if (fraudScore < 0.7) riskLevel = "medium"
  else riskLevel = "high"

  // Prediction
  const prediction = fraudScore >= 0.5 ? "fraudulent" : "legitimate"

  // SHAP values (feature importance)
  const shapValues = {
    amount: input.amount > 1000 ? 0.3 : -0.1,
    user_country: input.userCountry && highRiskCountries.includes(input.userCountry) ? 0.25 : -0.05,
    payment_method: input.paymentMethod === "crypto" ? 0.2 : -0.08,
    device_fingerprint: input.deviceFingerprint ? -0.15 : 0.1,
    user_email_age: -0.12,
    transaction_velocity: 0.08,
  }

  const processingTimeMs = Date.now() - startTime

  return {
    fraudScore: Number(fraudScore.toFixed(4)),
    riskLevel,
    prediction,
    shapValues,
    processingTimeMs,
  }
}
