-- Check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'contact_submissions';

-- Check existing policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'contact_submissions';

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous contact form submissions" 
ON public.contact_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create policy to allow anonymous selects (for testing)
CREATE POLICY "Allow anonymous to read own submissions" 
ON public.contact_submissions
FOR SELECT 
TO anon
USING (true);