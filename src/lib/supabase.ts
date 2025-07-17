import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only log in development mode
if (import.meta.env.DEV) {
  console.log('Initializing Supabase client...')
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Anon Key exists:', !!supabaseAnonKey)
}

// Mock client creator
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      limit: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [{ id: 'mock-id' }], error: null })
    })
  })
})

// Create a mock client if environment variables are missing (for testing)
let supabase: SupabaseClient | ReturnType<typeof createMockClient>

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - using mock client for testing')
  
  // Create a mock client that properly simulates the real Supabase API
  supabase = createMockClient()
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

  // Skip connection test to avoid errors with paused instances
  if (import.meta.env.DEV) {
    console.log('Supabase client created (connection test skipped)')
  }
}

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