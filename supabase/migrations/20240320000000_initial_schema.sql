-- Create tables
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    project_details TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    status TEXT DEFAULT 'active' NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_estimates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    complexity TEXT NOT NULL,
    timeline TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    additional_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    status TEXT DEFAULT 'draft' NOT NULL
);

CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    client_name TEXT,
    project_duration TEXT,
    technologies TEXT[],
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    status TEXT DEFAULT 'draft' NOT NULL
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
    ('project-images', 'project-images', true),
    ('blog-images', 'blog-images', true),
    ('case-study-images', 'case-study-images', true),
    ('profile-images', 'profile-images', true);

-- Set up Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can submit contact form"
    ON public.contact_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Public can subscribe to newsletter"
    ON public.newsletter_subscribers
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Public can submit project estimates"
    ON public.project_estimates
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Public can read published blog posts"
    ON public.blog_posts
    FOR SELECT
    TO public
    USING (status = 'published');

CREATE POLICY "Public can read published case studies"
    ON public.case_studies
    FOR SELECT
    TO public
    USING (status = 'published');

-- Create functions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.case_studies
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at(); 