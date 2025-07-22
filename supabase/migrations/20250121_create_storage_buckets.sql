-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images', 
  true, -- Public bucket for image access
  5242880, -- 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy to allow public access to images
CREATE POLICY "Public Access" ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'images');

-- Create storage policy to allow authenticated users to upload
CREATE POLICY "Authenticated users can upload images" ON storage.objects 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (bucket_id = 'images');

-- Create storage policy to allow authenticated users to update their images
CREATE POLICY "Authenticated users can update images" ON storage.objects 
  FOR UPDATE 
  TO authenticated 
  USING (bucket_id = 'images');

-- Create storage policy to allow authenticated users to delete their images
CREATE POLICY "Authenticated users can delete images" ON storage.objects 
  FOR DELETE 
  TO authenticated 
  USING (bucket_id = 'images');

-- For development, allow anonymous uploads (remove in production)
CREATE POLICY "Anonymous users can upload images" ON storage.objects 
  FOR INSERT 
  TO anon 
  WITH CHECK (bucket_id = 'images');