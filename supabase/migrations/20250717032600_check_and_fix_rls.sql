-- Check if RLS is enabled on contact_submissions
DO $$
BEGIN
    -- If RLS is not enabled, enable it
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'contact_submissions' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
    END IF;
END
$$;

-- Ensure the table has proper RLS policies
DROP POLICY IF EXISTS "Enable insert for anon" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable select for anon" ON public.contact_submissions;

-- Create comprehensive policies
CREATE POLICY "Enable insert for anon" 
ON public.contact_submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Enable select for anon" 
ON public.contact_submissions 
FOR SELECT 
TO anon 
USING (true);