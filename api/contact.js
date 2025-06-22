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

const sendContactFormEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: 'brandon@n8npro.com',
      to: 'brandon@n8npro.com',
      subject: `New Contact Form Submission: ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Project Type:</strong> ${formData.project_type}</p>
        <p><strong>Project Details:</strong> ${formData.project_details}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
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
    const { name, email, project_type, project_details, message } = req.body;

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

    // Prepare email data
    const emailData = {
      name: name.trim(),
      email: email.trim(),
      project_type: project_type || 'Not specified',
      project_details: project_details.trim(),
      message: message || 'No additional message'
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