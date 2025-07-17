import { createTransport } from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;

// HTML escape function to prevent XSS
const escapeHtml = (str) => {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  return String(str).replace(/[&<>"'\/]/g, s => htmlEscapes[s]);
};

// Rate limiting function
const checkRateLimit = (identifier) => {
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
};

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.windowStart > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

// Initialize Supabase client with service role for backend
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
);

// Create transporter for Gmail SMTP
const createTransporter = () => {
  // Removed console.log statements for production security
  
  return createTransport({
    service: 'gmail',
    auth: {
      user: 'brandon@n8npro.com',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Verify reCAPTCHA token
const verifyRecaptcha = async (token) => {
  if (!token) {
    // No reCAPTCHA token provided - skipping verification
    return true; // Allow submission without token for graceful degradation
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    // No reCAPTCHA secret key configured - skipping verification
    return true; // Allow submission if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const result = await response.json();
    
    if (result.success && result.score >= 0.5) {
      // reCAPTCHA verification successful
      return true;
    } else {
      // reCAPTCHA verification failed
      return false;
    }
  } catch (error) {
    // reCAPTCHA verification error - returning false
    return false;
  }
};

const sendContactFormEmail = async (formData) => {
  try {
    console.log('[EMAIL] Creating transporter...');
    const transporter = createTransporter();
    
    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('[EMAIL] Transporter verified successfully');
    } catch (verifyError) {
      console.error('[EMAIL] Transporter verification failed:', verifyError.message);
    }
    
    const mailOptions = {
      from: 'brandon@n8npro.com',
      to: 'brandon@n8npro.com',
      subject: `Sales Lead from aiflows.pro`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(formData.project_type)}</p>
        <p><strong>Project Details:</strong> ${escapeHtml(formData.project_details)}</p>
        <hr>
        <p><em>Sent from aiflows.pro contact form</em></p>
      `
    };

    console.log('[EMAIL] Sending email to:', mailOptions.to);
    console.log('[EMAIL] From:', mailOptions.from);
    
    const result = await transporter.sendMail(mailOptions);
    console.log('[EMAIL] Email sent successfully:', result);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('[EMAIL] Error sending email:', error);
    console.error('[EMAIL] Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, project_type, project_details, message, recaptchaToken } = req.body;

    // Get client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.'
      });
    }

    // Validate required fields
    if (!name || !email || !project_details) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, project_details'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Verify reCAPTCHA if token provided
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return res.status(400).json({
        error: 'Bot protection verification failed. Please try again.'
      });
    }

    // Prepare email data
    const emailData = {
      name: name.trim(),
      email: email.trim(),
      project_type: project_type || 'Not specified',
      project_details: project_details.trim()
    };

    // Store in Supabase
    console.log('[SUPABASE] Attempting to store submission...');
    console.log('[SUPABASE] URL:', process.env.VITE_SUPABASE_URL);
    console.log('[SUPABASE] Has Anon Key:', !!process.env.VITE_SUPABASE_ANON_KEY);
    
    try {
      const submissionData = {
        name: emailData.name,
        email: emailData.email,
        project_type: emailData.project_type,
        project_details: emailData.project_details,
        message: message || emailData.project_details,
        recaptcha_token: recaptchaToken
      };
      
      console.log('[SUPABASE] Inserting data:', submissionData);
      
      const { data, error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([submissionData])
        .select()
        .single();

      if (supabaseError) {
        console.error('[SUPABASE] Insert error:', supabaseError);
        console.error('[SUPABASE] Error details:', {
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
          code: supabaseError.code
        });
        // Continue with email even if Supabase fails
      } else {
        console.log('[SUPABASE] Successfully stored:', data);
      }
    } catch (dbError) {
      console.error('[SUPABASE] Database error:', dbError);
      // Continue with email even if database fails
    }

    // Check if email configuration exists
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.log('Contact form submission (email disabled):', emailData);
      // Return success even without email for now
      return res.status(200).json({
        success: true,
        message: 'Thank you for your submission! We\'ll get back to you soon.',
        messageId: 'pending-' + Date.now()
      });
    }

    // Send email
    const result = await sendContactFormEmail(emailData);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      messageId: result.messageId
    });

  } catch (error) {
    // Contact form error
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
} 