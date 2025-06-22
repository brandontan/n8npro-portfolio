import { createTransport } from 'nodemailer';

// Create transporter for Gmail SMTP
const createTransporter = () => {
  console.log('GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
  console.log('GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD?.length);
  
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
    console.log('No reCAPTCHA token provided - skipping verification');
    return true; // Allow submission without token for graceful degradation
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.log('No reCAPTCHA secret key configured - skipping verification');
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
      console.log('reCAPTCHA verification successful, score:', result.score);
      return true;
    } else {
      console.log('reCAPTCHA verification failed:', result);
      return false;
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

const sendContactFormEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: 'brandon@n8npro.com',
      to: 'brandon@n8npro.com',
      subject: `Sales Lead from n8npro.com`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Project Type:</strong> ${formData.project_type}</p>
        <p><strong>Project Details:</strong> ${formData.project_details}</p>
        <hr>
        <p><em>Sent from n8npro.com contact form</em></p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, project_type, project_details, message, recaptchaToken } = req.body;

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

    // Send email
    const result = await sendContactFormEmail(emailData);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
} 