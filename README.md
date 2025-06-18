# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/fef6350f-4ff2-4fe6-9f16-f61f1e88ae2d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fef6350f-4ff2-4fe6-9f16-f61f1e88ae2d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Fork Synchronization

This repository is a fork of [n8n-docs](https://github.com/n8n-io/n8n-docs) and **automatically syncs daily at 2 AM UTC** to stay up-to-date with the upstream repository.

### Automated Sync Process

- **Daily Schedule**: The fork automatically syncs with upstream changes every day
- **Workflow Preservation**: Local workflows and configurations are preserved during sync
- **Manual Trigger**: If needed, the sync can be triggered manually via GitHub Actions

### Emergency Manual Sync

For urgent updates that can't wait for the daily sync:

1. Go to the [Actions tab](../../actions)
2. Select "Sync with Upstream n8n-docs" workflow
3. Click "Run workflow" and optionally enable "Force sync even if no changes"

Contributors can rely on the automated sync to keep the fork current without manual intervention.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fef6350f-4ff2-4fe6-9f16-f61f1e88ae2d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Email Notifications Setup

The contact form sends email notifications to `brandon@n8npro.com` via EmailJS. Your email infrastructure handles the routing:

**Email Flow:** Contact Form → EmailJS → brandon@n8npro.com → Cloudflare Email Routing → Gmail → fetchmail → Poste.io

### EmailJS Configuration

1. Create an account on [EmailJS](https://www.emailjs.com/)
2. Create a new email service and connect your email provider (Gmail recommended)
3. Create an email template with the following variables:
   - `to_email`: Recipient email address (will be set to brandon@n8npro.com)
   - `from_name`: Name of the person submitting the form
   - `from_email`: Email of the person submitting the form
   - `project_type`: Type of project requested
   - `project_details`: Detailed description of the project

4. Add the following environment variables to your `.env` file:
   ```
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # EmailJS Configuration
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

5. For Vercel deployment, add these environment variables:
   ```bash
   vercel env add VITE_EMAILJS_SERVICE_ID production
   vercel env add VITE_EMAILJS_TEMPLATE_ID production
   vercel env add VITE_EMAILJS_PUBLIC_KEY production
   ```

### Backend Email Infrastructure

Your backend handles email routing automatically:
- **Cloudflare Email Routing**: Routes `*@n8npro.com` to Gmail
- **fetchmail**: Pulls emails from Gmail every 5 minutes
- **Poste.io**: Receives emails in your QNAP inbox

No additional SMTP configuration needed!
