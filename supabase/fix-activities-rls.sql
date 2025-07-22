-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Published activities are viewable by everyone" ON activities;
DROP POLICY IF EXISTS "Anyone can create activities" ON activities;
DROP POLICY IF EXISTS "Authenticated users can update activities" ON activities;
DROP POLICY IF EXISTS "Authenticated users can delete activities" ON activities;

-- Ensure RLS is enabled
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create new policies
-- Allow public read access to all activities (for development)
CREATE POLICY "Activities are viewable by everyone" 
  ON activities FOR SELECT 
  USING (true);

-- Allow anyone to create activities (for development)
CREATE POLICY "Anyone can create activities" 
  ON activities FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to update activities (for development)
CREATE POLICY "Anyone can update activities" 
  ON activities FOR UPDATE 
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete activities (for development)
CREATE POLICY "Anyone can delete activities" 
  ON activities FOR DELETE 
  TO anon, authenticated
  USING (true);