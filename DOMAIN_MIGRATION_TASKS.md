# Domain Migration Tasks: n8npro.com → aiflows.pro

## Pre-Migration Tasks

### 1. **Fix Current Domain Issues (n8npro.com)**
- [ ] Create actual OG image (1200x630px) at `/public/og-image.png`
  - Include: Your name, "AI Automation Expert", website URL
  - Professional design with automation/workflow visuals
- [ ] Deploy current changes to production
- [ ] Clear Twitter's cache:
  - Go to https://cards-dev.twitter.com/validator
  - Enter URL: https://n8npro.com
  - Click "Preview card" to force re-fetch
- [ ] Verify Twitter shows correct preview

## Domain Migration Tasks

### 2. **Update Domain References**
All files that need updating from n8npro.com → aiflows.pro:

#### **Frontend Files**
- [ ] `/index.html`
  - Canonical URL
  - Structured data URLs (2 places)
  - OpenGraph URL
  - OpenGraph image URL
  - Twitter image URL
  - Email in structured data

#### **Public Files**
- [ ] `/public/sitemap.xml` - All URL entries (7 locations)
- [ ] `/public/robots.txt` - Sitemap reference
- [ ] `/public/llm.txt` - Email address
- [ ] `/public/og-image.png` - Update placeholder text

#### **Documentation**
- [ ] `/README.md` - Email flow documentation (4 references)
- [ ] `/CLAUDE.md` - Update project name if desired

#### **Backend/Functions**
- [ ] `/supabase/functions/contact-form/index.ts` - CORS origins (2 places)

#### **Source Code**
- [ ] `/src/components/Chatbot.tsx` - Email reference in bot responses
- [ ] `/src/components/Testimonials.tsx` - Any email references
- [ ] Any other components with hardcoded email

### 3. **Email Domain Considerations**
- [ ] Decide: Keep brandon@n8npro.com or switch to brandon@aiflows.pro?
- [ ] If switching email:
  - Update EmailJS template
  - Update Cloudflare email routing
  - Update all email references in code
  - Update contact form recipient

### 4. **Deployment Configuration**
- [ ] Update Vercel domain settings:
  - Add aiflows.pro as custom domain
  - Set up SSL certificate
  - Configure DNS records
- [ ] Update environment variables if needed
- [ ] Set up redirects from n8npro.com → aiflows.pro (301 permanent)

### 5. **Post-Migration Tasks**
- [ ] Test all forms and functionality on new domain
- [ ] Clear social media caches again with new domain:
  - Twitter Card Validator
  - Facebook Sharing Debugger
  - LinkedIn Post Inspector
- [ ] Update any external links:
  - Social media profiles
  - Email signatures
  - Business cards
  - Other websites linking to you
- [ ] Monitor 404 errors and fix any missed references
- [ ] Update Google Search Console with new domain
- [ ] Submit new sitemap to search engines

## Quick Command for Bulk Replace
```bash
# Dry run first to see what will change:
find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.md" | grep -v node_modules | grep -v .git | xargs grep -l "n8npro.com"

# Then use your editor's find/replace or sed to update all instances
```

## Important Notes
- Keep n8npro.com active during transition
- Set up 301 redirects to preserve SEO
- Update meta descriptions to reflect new brand positioning with "AI Flows"
- Consider updating tagline from "n8n automation" to "AI workflow automation"