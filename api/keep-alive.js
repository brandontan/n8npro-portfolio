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
    // Just test the connection with a simple RPC call
    // This doesn't require any table permissions
    const { data, error } = await supabase.rpc('now');

    if (error) {
      // If RPC doesn't work, just make a basic auth check
      const response = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': process.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
        }
      });

      if (!response.ok) {
        return res.status(500).json({ 
          error: 'Failed to ping Supabase',
          status: response.status
        });
      }
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