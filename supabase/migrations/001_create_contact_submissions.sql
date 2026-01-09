-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  requirement TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (form submissions) from anyone
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads (admin access is protected by API password)
-- The API route handles authentication, so we allow reads with anon key
CREATE POLICY "Allow admin reads" ON contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

