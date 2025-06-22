# Vercel Serverless Function Deployment Guide

## 🚀 What We Built

- **Serverless Email Function**: `/api/contact.js` - handles form submissions and sends emails to brandon@n8npro.com
- **Frontend Integration**: Updated form hook to use `/api/contact` endpoint
- **Security**: Gmail app password stored as environment variable

## 📋 Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Set Environment Variable
```bash
vercel env add GMAIL_APP_PASSWORD
# Enter your Gmail app password when prompted
```

### 4. Deploy
```bash
vercel --prod
```

## 🔧 Environment Variables

The serverless function needs:
- `GMAIL_APP_PASSWORD`: Your Gmail app password (not regular password)

## 📧 How It Works

1. User submits form on your website
2. Form data sent to `/api/contact` (Vercel serverless function)
3. Function validates data and sends email via Gmail SMTP
4. Email delivered to brandon@n8npro.com
5. Success/error response sent back to frontend

## 💰 Cost

- **FREE** on Vercel's hobby plan
- 100GB-hours/month, 10,000 requests/day included
- Perfect for contact forms

## 🔒 Security

- Gmail password never exposed to frontend
- Input validation and sanitization
- CORS protection built-in
- Rate limiting via Vercel

## 🧪 Testing

Test locally with:
```bash
vercel dev
```

Then submit a form on localhost:3000

## 📝 Notes

- No server to maintain
- Auto-scales with traffic
- Built-in monitoring and logs
- Easy rollbacks and deployments 