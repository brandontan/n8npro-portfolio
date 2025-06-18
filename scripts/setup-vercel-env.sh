#!/bin/bash

echo "Setting up Vercel environment variables for Gmail SMTP..."

# Set Gmail user
echo "brandon8n8npro@gmail.com" | vercel env add GMAIL_USER production

# Set Gmail app password  
echo "bbee mtzt bubx fuhz" | vercel env add GMAIL_APP_PASSWORD production

echo "Environment variables set! Now deploying..."

# Deploy to Vercel
git push

echo "Setup complete! Your contact form now uses direct Gmail SMTP." 