-- Create activities table for storing blog posts/articles
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  preview TEXT,
  featured_image TEXT,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_activities_slug ON activities(slug);

-- Create index on published for filtering
CREATE INDEX idx_activities_published ON activities(published);

-- Create index on date for sorting
CREATE INDEX idx_activities_date ON activities(date DESC);

-- Enable Row Level Security
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published activities
CREATE POLICY "Published activities are viewable by everyone" 
  ON activities FOR SELECT 
  USING (published = true);

-- Create policy to allow anyone to create activities (temporary for development)
-- TODO: Change this to authenticated users only in production
CREATE POLICY "Anyone can create activities" 
  ON activities FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Create policy to allow authenticated users to update their own activities
CREATE POLICY "Authenticated users can update activities" 
  ON activities FOR UPDATE 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete their own activities
CREATE POLICY "Authenticated users can delete activities" 
  ON activities FOR DELETE 
  TO authenticated 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_activities_updated_at 
  BEFORE UPDATE ON activities 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();