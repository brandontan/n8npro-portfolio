-- Drop existing policies
DROP POLICY IF EXISTS "Public can submit contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can submit project estimates" ON public.project_estimates;
DROP POLICY IF EXISTS "Public can read published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published case studies" ON public.case_studies;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON public.contact_submissions TO anon;
GRANT ALL ON public.newsletter_subscribers TO anon;
GRANT ALL ON public.project_estimates TO anon;
GRANT ALL ON public.blog_posts TO anon;
GRANT ALL ON public.case_studies TO anon;

-- Create new policies
CREATE POLICY "Enable insert for anonymous users"
    ON public.contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Enable insert for anonymous users"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Enable insert for anonymous users"
    ON public.project_estimates
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Enable read access for anonymous users"
    ON public.blog_posts
    FOR SELECT
    TO anon
    USING (status = 'published');

CREATE POLICY "Enable read access for anonymous users"
    ON public.case_studies
    FOR SELECT
    TO anon
    USING (status = 'published'); 