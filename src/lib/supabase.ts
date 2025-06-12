import { createClient } from '@supabase/supabase-js'

// These would normally be environment variables, but for demo purposes I'll include placeholder values
// You'll need to replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-ref.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface ContactFormData {
  id?: string
  name: string
  email: string
  project_type: string
  project_details: string
  created_at?: string
} 