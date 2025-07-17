import { createTransport } from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = {
    timestamp: new Date().toISOString(),
    steps: []
  };

  try {
    // Step 1: Check environment variables
    results.steps.push({
      step: 'Environment Check',
      supabaseUrl: process.env.VITE_SUPABASE_URL || 'NOT SET',
      hasSupabaseKey: !!process.env.VITE_SUPABASE_ANON_KEY,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      gmailPasswordLength: process.env.GMAIL_APP_PASSWORD?.length || 0
    });

    // Step 2: Test Supabase connection
    if (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY
      );

      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([{
            name: 'Test Flow',
            email: 'test@example.com',
            project_type: 'Debug Test',
            project_details: 'Testing complete flow',
            message: 'Test message from test-contact-flow endpoint'
          }])
          .select()
          .single();

        results.steps.push({
          step: 'Supabase Insert',
          success: !error,
          data: data,
          error: error
        });
      } catch (supabaseError) {
        results.steps.push({
          step: 'Supabase Insert',
          success: false,
          error: supabaseError.message
        });
      }
    } else {
      results.steps.push({
        step: 'Supabase Insert',
        skipped: true,
        reason: 'Missing Supabase configuration'
      });
    }

    // Step 3: Test email sending
    if (process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = createTransport({
          service: 'gmail',
          auth: {
            user: 'brandon@n8npro.com',
            pass: process.env.GMAIL_APP_PASSWORD
          }
        });

        // Verify transporter
        await transporter.verify();
        results.steps.push({
          step: 'Gmail Verification',
          success: true
        });

        // Send test email
        const emailResult = await transporter.sendMail({
          from: 'brandon@aiflows.pro',
          to: 'brandon@n8npro.com',
          subject: 'Test Contact Flow - ' + new Date().toLocaleString(),
          text: 'This is a test from the contact flow debug endpoint',
          html: '<h2>Contact Flow Test</h2><p>This email was sent from the test-contact-flow endpoint.</p>'
        });

        results.steps.push({
          step: 'Email Send',
          success: true,
          messageId: emailResult.messageId,
          accepted: emailResult.accepted,
          response: emailResult.response
        });
      } catch (emailError) {
        results.steps.push({
          step: 'Email Send',
          success: false,
          error: emailError.message,
          code: emailError.code
        });
      }
    } else {
      results.steps.push({
        step: 'Email Send',
        skipped: true,
        reason: 'Missing Gmail password'
      });
    }

    // Step 4: Summary
    results.summary = {
      supabaseWorking: results.steps.find(s => s.step === 'Supabase Insert')?.success || false,
      emailWorking: results.steps.find(s => s.step === 'Email Send')?.success || false,
      overallSuccess: results.steps.every(s => s.success !== false)
    };

    return res.status(200).json(results);

  } catch (error) {
    results.error = {
      message: error.message,
      stack: error.stack
    };
    return res.status(500).json(results);
  }
}