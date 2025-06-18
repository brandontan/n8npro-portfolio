# Gmail SMTP Setup Instructions

## Step 1: Add Environment Variables to Vercel

Run these commands one by one:

```bash
vercel env add GMAIL_USER
# When prompted, enter: brandon8n8npro@gmail.com

vercel env add GMAIL_APP_PASSWORD
# When prompted, enter: bbee mtzt bubx fuhz
```

## Step 2: Deploy the Changes

```bash
git add .
git commit -m "Add direct Gmail SMTP email sending"
git push
```

## Step 3: Test the Contact Form

The new email system will:
- Send directly to Gmail (no EmailJS)
- Display all form data correctly
- Set reply-to as the form submitter's email
- Arrive in your Gmail inbox immediately
- Be pulled by fetchmail to Poste.io every 5 minutes

## Expected Email Format:

```
Subject: New Contact Form Submission from [Name]
From: brandon8n8npro@gmail.com
Reply-To: [submitter's email]

New Contact Form Submission
Name: [actual name]
Email: [actual email]
Project Type: [actual project type]  
Project Details: [actual details]

Sent from n8npro.com contact form
``` 