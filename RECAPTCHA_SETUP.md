# reCAPTCHA v3 Setup Guide

This guide will help you set up Google reCAPTCHA v3 for anti-bot protection on your contact form.

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" to add a new site
3. Choose "reCAPTCHA v3"
4. Add your domain:
   - For development: `localhost`
   - For production: `n8npro-portfolio.vercel.app`
5. Accept the terms and click "Submit"
6. Copy both the **Site Key** and **Secret Key**

## Step 2: Configure Environment Variables

### Local Development (.env)
Add these to your `.env` file:
```
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

### Vercel Production
Add these environment variables in your Vercel dashboard:
1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add:
   - `VITE_RECAPTCHA_SITE_KEY` = your site key
   - `RECAPTCHA_SECRET_KEY` = your secret key

## Step 3: Test the Implementation

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Check the browser console for reCAPTCHA messages
4. Verify emails are being sent with bot protection

## How It Works

- **reCAPTCHA v3** runs invisibly in the background
- It scores user behavior (0.0 = bot, 1.0 = human)
- Forms with scores ≥ 0.5 are accepted
- If reCAPTCHA fails or isn't configured, the form still works (graceful degradation)

## Troubleshooting

### Form not submitting
- Check browser console for reCAPTCHA errors
- Verify environment variables are set correctly
- Ensure domain is added to reCAPTCHA admin console

### reCAPTCHA not loading
- Check if `VITE_RECAPTCHA_SITE_KEY` is set
- Verify the site key is correct
- Check network tab for script loading errors

### API errors
- Verify `RECAPTCHA_SECRET_KEY` is set in Vercel
- Check Vercel function logs for verification errors
- Ensure the secret key matches your site key

## Security Notes

- Never expose the secret key in client-side code
- The site key is safe to use in the frontend
- reCAPTCHA v3 provides protection without user interaction
- Scores are logged for monitoring bot activity 