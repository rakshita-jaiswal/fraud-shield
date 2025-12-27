-- Create users table for authentication and account management
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create api_keys table for API authentication
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  key_prefix TEXT NOT NULL, -- Store first 8 chars for identification (e.g., "sk_test_")
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);

-- Create transactions table for fraud scoring records
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_id TEXT, -- Customer's own transaction ID
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  user_email TEXT,
  user_ip TEXT,
  user_country TEXT,
  device_fingerprint TEXT,
  payment_method TEXT,
  merchant_category TEXT,
  
  -- Fraud scoring results
  fraud_score DECIMAL(5, 4) NOT NULL, -- 0.0000 to 1.0000
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  prediction TEXT NOT NULL CHECK (prediction IN ('legitimate', 'fraudulent')),
  
  -- SHAP explanation (stored as JSONB for queryability)
  shap_values JSONB,
  
  -- Model metadata
  model_version TEXT DEFAULT 'v1.0',
  processing_time_ms INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Index for fast queries
  CONSTRAINT transactions_user_id_idx UNIQUE (id, user_id)
);

-- Create usage_tracking table for billing and rate limiting
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
  
  -- Usage metrics
  request_count INTEGER DEFAULT 0,
  transaction_count INTEGER DEFAULT 0,
  
  -- Time period
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one record per user per period
  CONSTRAINT usage_tracking_user_period UNIQUE (user_id, period_start, period_end)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_risk_level ON transactions(risk_level);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON usage_tracking(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for api_keys table
CREATE POLICY "Users can view own API keys" ON api_keys
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own API keys" ON api_keys
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own API keys" ON api_keys
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own API keys" ON api_keys
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for transactions table
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service role can insert transactions" ON transactions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for usage_tracking table
CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Service role can manage usage" ON usage_tracking
  FOR ALL USING (true);
