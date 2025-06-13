-- Create contact_submissions table for storing contact form data
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  project_details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact form submissions
CREATE POLICY "Allow public contact form submissions" ON contact_submissions
FOR INSERT TO anon
WITH CHECK (true);

-- Create policy to allow reading submissions (for admin purposes)
CREATE POLICY "Allow reading contact submissions" ON contact_submissions
FOR SELECT TO authenticated
USING (true);

-- Add helpful comment
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the portfolio website';

