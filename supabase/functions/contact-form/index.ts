import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Sanitize input to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 1000); // Limit length
}

// Simple in-memory rate limiting (resets when function cold starts)
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const userRateData = rateLimitMap.get(identifier);
  
  if (!userRateData) {
    rateLimitMap.set(identifier, { count: 1, windowStart: now });
    return true;
  }
  
  // Check if we're still in the same window
  if (now - userRateData.windowStart > RATE_LIMIT_WINDOW) {
    // Reset the window
    rateLimitMap.set(identifier, { count: 1, windowStart: now });
    return true;
  }
  
  // Check if we've exceeded the limit
  if (userRateData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  // Increment the count
  userRateData.count += 1;
  return true;
}

// Configure CORS to only allow requests from your domain
const allowedOrigins = [
  'https://n8npro.com',
  'https://www.n8npro.com',
  // Add localhost for development if needed
  ...(Deno.env.get('ENVIRONMENT') === 'development' ? ['http://localhost:3000'] : [])
];

const getCorsHeaders = (origin: string | null) => {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  
  // Only allow specific origins
  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  
  return headers;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )
  }

  try {
    const { name, email, project_type, project_details } = await req.json()
    
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      )
    }
    
    // Validate required fields
    if (!name || !email || !project_details) {
      throw new Error('Missing required fields: name, email, and project_details are required');
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .insert([
        {
          name: sanitizeInput(name),
          email: sanitizeInput(email),
          project_type: project_type ? sanitizeInput(project_type) : null,
          project_details: sanitizeInput(project_details),
          status: 'pending'
        }
      ])
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 