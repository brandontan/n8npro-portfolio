# 🚨 DEPLOYMENT SECURITY CHECKLIST

## CRITICAL: Fix These Before Deployment

### 1. Remove Exposed API Keys from Git History
The following files contain exposed Linear API keys and MUST be removed from git history:

```bash
# Files with exposed Linear API keys:
proj_mgt/linear-scripts/quick-update.js
proj_mgt/linear-scripts/setup-n8npro-project.js
proj_mgt/linear-scripts/n8npro-linear-setup.js
proj_mgt/linear-scripts/.linear-team.json
proj_mgt/linear-scripts/aiflows-linear-assistant.js
proj_mgt/linear-scripts/log-work.js
proj_mgt/linear-scripts/linear-assistant.js
proj_mgt/linear-scripts/create-work-notes.js
```

### 2. Steps to Clean Git History:

```bash
# Option 1: Remove entire proj_mgt directory from history
git filter-branch --tree-filter 'rm -rf proj_mgt' HEAD

# Option 2: Use BFG Repo-Cleaner (recommended)
# Install: brew install bfg
bfg --delete-folders proj_mgt
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# After cleaning, force push
git push --force
```

### 3. Environment Variables for Vercel

Make sure these are set in Vercel dashboard:

```env
# Required for production
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=brandon@aiflows.pro
GMAIL_APP_PASSWORD=your_gmail_app_password
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Optional
VITE_GHOST_URL=your_ghost_url
VITE_GHOST_CONTENT_KEY=your_ghost_content_key
VITE_V0_API_KEY=your_v0_api_key
```

### 4. Pre-Deployment Commands:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Run build to check for errors
npm run build

# 3. Test production build locally
npm run preview

# 4. Check for any console.log with sensitive data
grep -r "console.log" src/ | grep -E "(key|password|token|secret)"
```

### 5. Post-Deployment:

1. **Rotate all exposed Linear API keys** immediately
2. Monitor Vercel logs for any errors
3. Test contact form functionality
4. Verify all images load correctly

## ✅ Safe to Deploy:

- Main application code uses environment variables correctly
- .env file is gitignored
- No sensitive data in /src directory
- Supabase RLS policies are in place

## ⚠️ DO NOT DEPLOY UNTIL:

1. Linear API keys are removed from git history
2. Vercel environment variables are configured
3. You've rotated the exposed Linear API keys

---

**IMPORTANT**: After cleaning git history, all collaborators must re-clone the repository to avoid reintroducing the removed files.