# Supabase Database Setup for Contact Form

## Quick Setup (Free)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Create new project
4. Choose a region close to you
5. Set a strong database password

### 2. Create Database Table
In your Supabase dashboard, go to SQL Editor and run:

```sql
-- Create contact_submissions table
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

-- Create policy to allow inserts (for form submissions)
CREATE POLICY "Allow public inserts" ON contact_submissions
FOR INSERT TO anon
WITH CHECK (true);

-- Create policy to allow reading your own submissions (optional)
CREATE POLICY "Allow reading own submissions" ON contact_submissions
FOR SELECT TO anon
USING (true);
```

### 3. Get Your Credentials
1. Go to Settings → API
2. Copy your:
   - Project URL
   - Anon public key

### 4. Configure Environment Variables
Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Update Supabase Config
Update `src/lib/supabase.ts` with your actual values or make sure your environment variables are set.

## Features Included

✅ **Form Validation**: Required fields with proper types
✅ **Loading States**: Shows spinner while submitting
✅ **Success Messages**: Confirms successful submission
✅ **Error Handling**: Shows error if submission fails
✅ **Form Reset**: Clears form after successful submission
✅ **TypeScript**: Fully typed for better development experience

## Database Schema

The `contact_submissions` table stores:
- `id`: Unique identifier (UUID)
- `name`: Contact's full name
- `email`: Contact's email address
- `project_type`: Type of automation project
- `project_details`: Detailed description of needs
- `created_at`: Timestamp of submission

## Viewing Submissions

You can view form submissions in your Supabase dashboard:
1. Go to Table Editor
2. Select `contact_submissions` table
3. View all submissions with timestamps

## Alternative: Fallback to Email

If you prefer not to set up a database, you can modify the form to use a service like:
- **Formspree** (free tier available)
- **Netlify Forms** (if hosted on Netlify)
- **EmailJS** (client-side email sending)

The current implementation gracefully handles errors, so the form will show an error message if the database isn't configured, prompting users to email directly. 