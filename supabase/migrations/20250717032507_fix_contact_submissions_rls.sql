-- Fix RLS policies for contact_submissions table

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous to read own submissions" ON public.contact_submissions;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous contact form submissions" 
ON public.contact_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Optional: Allow service role to read all submissions
CREATE POLICY "Service role can read all submissions" 
ON public.contact_submissions
FOR SELECT 
TO service_role
USING (true);