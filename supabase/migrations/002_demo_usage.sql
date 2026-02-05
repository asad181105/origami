-- Demo usage tracking: 2 minutes (120 seconds) per user
CREATE TABLE IF NOT EXISTS demo_usage (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  seconds_used INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE demo_usage ENABLE ROW LEVEL SECURITY;

-- Users can read their own usage
CREATE POLICY "Users can read own usage" ON demo_usage
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert/update their own row (via service role or anon with RPC)
-- We'll use API routes with service key, so allow service role
-- For client: we need an RPC or API route. API route will use supabase client with user's session.
-- Service role can do anything. Anon + authenticated: we need to allow upsert for own user_id.
CREATE POLICY "Users can upsert own usage" ON demo_usage
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
