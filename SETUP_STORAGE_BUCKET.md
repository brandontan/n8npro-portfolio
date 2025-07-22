# Setting Up Supabase Storage Bucket for Images

You have two options to create the storage bucket:

## Option 1: Using Supabase Dashboard (Easier)

1. **Go to your Supabase project**: https://app.supabase.com
2. **Navigate to Storage** (in the left sidebar)
3. **Click "New bucket"**
4. **Configure the bucket**:
   - Name: `images`
   - Public bucket: ✅ Yes (toggle ON)
   - File size limit: 5MB
   - Allowed MIME types: 
     - image/jpeg
     - image/png
     - image/gif
     - image/webp
5. **Click "Create bucket"**

## Option 2: Using SQL Migration

1. Go to the **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase/migrations/20250121_create_storage_buckets.sql`
3. Click **Run**

## Verify the Setup

1. Go to **Storage** in your Supabase dashboard
2. You should see an `images` bucket
3. Click on it and verify:
   - It shows as "Public"
   - File size limit is set
   - MIME types are configured

## Test the Upload

1. Go back to your editor at http://localhost:3000/editor
2. Click the image button
3. Select an image file
4. It should upload successfully without the base64 fallback

## Troubleshooting

If you still get errors:

1. **Check bucket name**: Make sure it's exactly `images` (not `image` or `Images`)
2. **Check permissions**: The bucket must be set to public
3. **Check file size**: Images must be under 5MB
4. **Check file type**: Only JPEG, PNG, GIF, and WebP are allowed

## Security Note

The current setup allows anonymous uploads for development. In production, you should:
1. Remove the "Anonymous users can upload images" policy
2. Require authentication for uploads
3. Add rate limiting