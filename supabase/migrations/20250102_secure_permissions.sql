-- Revoke excessive permissions from anonymous users
REVOKE ALL ON public.contact_submissions FROM anon;
REVOKE ALL ON public.newsletter_subscribers FROM anon;
REVOKE ALL ON public.project_estimates FROM anon;
REVOKE ALL ON public.blog_posts FROM anon;
REVOKE ALL ON public.case_studies FROM anon;

-- Grant only necessary permissions to anonymous users
-- Contact submissions: only INSERT
GRANT INSERT ON public.contact_submissions TO anon;

-- Newsletter subscribers: only INSERT
GRANT INSERT ON public.newsletter_subscribers TO anon;

-- Project estimates: only INSERT
GRANT INSERT ON public.project_estimates TO anon;

-- Blog posts: only SELECT for published posts (handled by RLS)
GRANT SELECT ON public.blog_posts TO anon;

-- Case studies: only SELECT for published content (handled by RLS)
GRANT SELECT ON public.case_studies TO anon;

-- Ensure RLS is still enabled (safety check)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Update RLS policies to be more restrictive
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.project_estimates;

-- Create more restrictive insert policies with validation
CREATE POLICY "Allow anonymous insert with validation"
    ON public.contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (
        name IS NOT NULL AND 
        email IS NOT NULL AND 
        project_details IS NOT NULL AND
        LENGTH(name) <= 100 AND
        LENGTH(email) <= 100 AND
        LENGTH(project_details) <= 5000
    );

CREATE POLICY "Allow anonymous newsletter signup with validation"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon
    WITH CHECK (
        email IS NOT NULL AND
        LENGTH(email) <= 100
    );

CREATE POLICY "Allow anonymous project estimate with validation"
    ON public.project_estimates
    FOR INSERT
    TO anon
    WITH CHECK (
        name IS NOT NULL AND
        email IS NOT NULL AND
        project_type IS NOT NULL AND
        budget IS NOT NULL AND
        timeline IS NOT NULL AND
        LENGTH(name) <= 100 AND
        LENGTH(email) <= 100
    );

-- Ensure read policies remain for published content only
-- These should already exist from previous migrations