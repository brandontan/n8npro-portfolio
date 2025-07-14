# Fix Contact Form - Internal Server Error

## Issue
The contact form is showing "Internal server error" because the required environment variables are not configured in Vercel.

## Required Environment Variables

Add these to your Vercel project settings:

1. **Go to Vercel Dashboard**
   - Navigate to your project: https://vercel.com/brandontans-projects/n8npro-portfolio
   - Click "Settings" → "Environment Variables"

2. **Add these variables:**

   ```
   GMAIL_APP_PASSWORD=your-gmail-app-password-here
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key-here
   ```

3. **Optional Supabase variables (if using):**
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## How to Get These Values

### Gmail App Password:
1. Go to https://myaccount.google.com/security
2. Enable 2-factor authentication if not already enabled
3. Search for "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### ReCAPTCHA Secret Key:
1. Go to https://www.google.com/recaptcha/admin
2. Register your site (aiflows.pro)
3. Choose reCAPTCHA v3
4. Copy the Secret Key

## Quick Fix (Temporary)

To disable the contact form errors temporarily, you can:

1. Update the API to return a success message even without email:

```javascript
// In api/contact.js, replace the email sending part with:
if (!process.env.GMAIL_APP_PASSWORD) {
  return res.status(200).json({
    success: true,
    message: 'Form received (email disabled)',
    messageId: 'demo-' + Date.now()
  });
}
```

## Redeploy After Adding Variables

After adding environment variables:

```bash
vercel --prod
```

The contact form will start working once the environment variables are configured!