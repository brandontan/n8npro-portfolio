import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log environment variables (without exposing the full key)
console.log('Initializing Supabase client...')
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key exists:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

// Test the connection
supabase.from('contact_submissions').select('count').limit(1)
  .then(() => console.log('Supabase client initialized successfully'))
  .catch(error => {
    console.error('Failed to initialize Supabase client:', error)
    throw error
  })

export { supabase }

// Database types
export interface ContactFormData {
  id?: string
  name: string
  email: string
  project_type: string
  project_details: string
  message: string
  created_at?: string
} 