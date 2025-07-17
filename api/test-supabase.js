import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  console.log('[TEST] Supabase URL:', supabaseUrl);
  console.log('[TEST] Has Anon Key:', !!supabaseKey);

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      error: 'Missing Supabase configuration',
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test 1: Basic connection
    const { data: testData, error: testError } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(1);

    if (testError) {
      return res.status(500).json({
        error: 'Supabase query failed',
        details: testError,
        url: supabaseUrl.replace(/https:\/\/([^.]+)\..*/, 'https://$1.supabase.co')
      });
    }

    // Test 2: Check table permissions
    const testInsert = {
      name: 'Test User',
      email: 'test@test.com',
      project_type: 'Test',
      project_details: 'API Test',
      message: 'Testing Supabase connection'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert([testInsert])
      .select()
      .single();

    if (insertError) {
      return res.status(200).json({
        connection: 'OK',
        select: 'OK',
        insert: 'FAILED',
        insertError: insertError,
        suggestion: 'Check RLS policies or table permissions'
      });
    }

    // Clean up test data
    if (insertData?.id) {
      await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', insertData.id);
    }

    return res.status(200).json({
      success: true,
      connection: 'OK',
      select: 'OK',
      insert: 'OK',
      message: 'Supabase is fully functional'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected error',
      message: error.message,
      stack: error.stack
    });
  }
}