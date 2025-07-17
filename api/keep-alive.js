import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Simple query to keep database active
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase keep-alive error:', error);
      return res.status(500).json({ 
        error: 'Failed to ping Supabase',
        details: error.message 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Supabase is active',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}