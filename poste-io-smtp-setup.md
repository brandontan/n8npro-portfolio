# Poste.io SMTP Setup Guide

## Overview
This guide configures your contact form to send emails directly through your Poste.io instance running on your homelab, bypassing port 25 restrictions by using secure SMTP ports.

## Environment Variables

Add these environment variables to your Vercel deployment:

### Required Variables
```bash
# Poste.io SMTP Configuration
POSTE_SMTP_HOST=mail.yourdomain.com          # Your Poste.io domain
POSTE_SMTP_PORT=587                          # Port 587 for STARTTLS (recommended)
POSTE_SMTP_USER=contact@yourdomain.com       # Your Poste.io email address
POSTE_SMTP_PASS=your-email-password          # Your Poste.io email password

# Email Recipients
POSTE_TO_EMAIL=brandon8n8npro@gmail.com      # Where to send contact form emails
POSTE_FROM_NAME=N8N Pro Contact Form        # Display name for sender

# Optional Security Settings
POSTE_REJECT_UNAUTHORIZED=true               # Set to 'false' for self-signed certificates
```

### Alternative Port Configuration
If port 587 doesn't work, try port 465 with SSL:
```bash
POSTE_SMTP_PORT=465                          # Port 465 for SSL
# Note: When using port 465, the API will automatically set secure=true
```

## Vercel Environment Setup

### Method 1: Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable listed above

### Method 2: Vercel CLI
```bash
# Set environment variables via CLI
vercel env add POSTE_SMTP_HOST
vercel env add POSTE_SMTP_PORT
vercel env add POSTE_SMTP_USER
vercel env add POSTE_SMTP_PASS
vercel env add POSTE_TO_EMAIL
vercel env add POSTE_FROM_NAME

# Redeploy to apply changes
vercel --prod
```

## Poste.io Configuration

### 1. Ensure SMTP is Enabled
- Log into your Poste.io admin panel
- Go to System Settings > SMTP
- Ensure SMTP is enabled on ports 587 and/or 465

### 2. Create/Verify Email Account
- Create an email account for sending (e.g., `contact@yourdomain.com`)
- Note the password for the `POSTE_SMTP_PASS` variable

### 3. Firewall Configuration
Ensure these ports are open on your homelab:
- **Port 587** (STARTTLS) - Recommended
- **Port 465** (SSL) - Alternative
- **NOT Port 25** (blocked by most ISPs)

## Cloudflare Tunnel Configuration

Since you're using Cloudflare, ensure your tunnel exposes the SMTP ports:

### Option 1: Direct Port Exposure
```yaml
# In your cloudflared config
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  - hostname: mail.yourdomain.com
    service: https://localhost:443  # Web interface
  - hostname: smtp.yourdomain.com
    service: tcp://localhost:587    # SMTP port
  - service: http_status:404
```

### Option 2: Use Existing Domain
If `mail.yourdomain.com` already works for web access, SMTP should work on the same domain.

## Testing the Configuration

### 1. Test SMTP Connection
Create a test script to verify SMTP connectivity:

```javascript
// test-poste-smtp.js
import nodemailer from 'nodemailer';

const testSMTP = async () => {
  const transporter = nodemailer.createTransporter({
    host: 'mail.yourdomain.com',
    port: 587,
    secure: false,
    auth: {
      user: 'contact@yourdomain.com',
      pass: 'your-password'
    }
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
  }
};

testSMTP();
```

### 2. Test Email Sending
```bash
# Test the API endpoint
curl -X POST https://your-vercel-app.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "project_type": "Test",
    "project_details": "Testing Poste.io SMTP configuration"
  }'
```

## Troubleshooting

### Common Issues

#### 1. Connection Refused (ECONNREFUSED)
- **Cause**: Cannot reach your Poste.io server
- **Solutions**:
  - Verify `POSTE_SMTP_HOST` is correct
  - Check if Cloudflare tunnel is running
  - Ensure firewall allows the SMTP port

#### 2. Authentication Failed (EAUTH)
- **Cause**: Wrong credentials
- **Solutions**:
  - Verify `POSTE_SMTP_USER` and `POSTE_SMTP_PASS`
  - Check if the email account exists in Poste.io
  - Try creating a new email account

#### 3. Network Error (ESOCKET)
- **Cause**: Network connectivity issues
- **Solutions**:
  - Check internet connectivity
  - Verify DNS resolution for your domain
  - Try using IP address instead of domain name

#### 4. Certificate Issues
- **Cause**: Self-signed SSL certificates
- **Solution**: Set `POSTE_REJECT_UNAUTHORIZED=false`

### Debug Mode
Set `NODE_ENV=development` to see detailed error messages in the API response.

## Security Considerations

1. **Use App Passwords**: If available, create app-specific passwords in Poste.io
2. **Restrict Access**: Configure Poste.io to only allow SMTP from your Vercel deployment IPs
3. **Monitor Logs**: Check Poste.io logs for suspicious activity
4. **Rate Limiting**: The API includes basic validation to prevent abuse

## Alternative Solutions

If direct SMTP doesn't work:

### 1. Email Relay Service
- Use services like SendGrid, Mailgun, or Amazon SES
- Configure them to forward to your Poste.io instance

### 2. Webhook to Your Server
- Create a webhook endpoint on your homelab
- Have Vercel POST form data to your webhook
- Send email from your homelab directly

### 3. Cloudflare Email Workers
- Use Cloudflare Workers to handle email sending
- Workers can access your Poste.io instance directly

## Next Steps

1. Set up the environment variables in Vercel
2. Test the SMTP connection
3. Deploy and test the contact form
4. Monitor email delivery and logs
5. Set up email monitoring/alerting if needed

---

**Note**: This configuration assumes your Poste.io instance is properly secured and accessible via your Cloudflare tunnel. Adjust the configuration based on your specific setup. 