import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const emailUser = 'brandon@n8npro.com';
  const hasPassword = !!process.env.GMAIL_APP_PASSWORD;

  console.log('[DEBUG] Email config check:');
  console.log('[DEBUG] Email user:', emailUser);
  console.log('[DEBUG] Has Gmail password:', hasPassword);
  console.log('[DEBUG] Password length:', process.env.GMAIL_APP_PASSWORD?.length || 0);

  if (!hasPassword) {
    return res.status(500).json({
      error: 'Gmail password not configured',
      user: emailUser,
      hasPassword: false
    });
  }

  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Verify configuration
    const verification = await transporter.verify();
    
    // Try sending a test email
    const testResult = await transporter.sendMail({
      from: 'brandon@aiflows.pro',
      to: 'brandon@n8npro.com',
      subject: 'Debug Test Email',
      text: 'This is a debug test from aiflows.pro',
      html: '<p>This is a <b>debug test</b> from aiflows.pro</p>'
    });

    return res.status(200).json({
      success: true,
      emailUser: emailUser,
      verification: verification,
      testEmailSent: true,
      messageId: testResult.messageId,
      accepted: testResult.accepted,
      rejected: testResult.rejected,
      response: testResult.response
    });

  } catch (error) {
    console.error('[DEBUG] Email error:', error);
    return res.status(500).json({
      error: 'Email configuration error',
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response
    });
  }
}