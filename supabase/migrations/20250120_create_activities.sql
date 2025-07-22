-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('client-success', 'workflow', 'insight', 'technical', 'case-study')),
  tags TEXT[],
  preview TEXT,
  featured_image TEXT,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_activities_published_date ON activities(published, date DESC);
CREATE INDEX idx_activities_slug ON activities(slug);

-- RLS policies
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Public can read published activities
CREATE POLICY "Public can view published activities" ON activities
  FOR SELECT USING (published = true);

-- Authenticated users can manage activities (for admin)
CREATE POLICY "Authenticated users can manage activities" ON activities
  FOR ALL USING (auth.role() = 'authenticated');