# CLAUDE.md


# Enhanced Working Style Preferences - Structured for Model Adherence

## **MANDATORY EXECUTION PROTOCOL**

### **PHASE 1: RESEARCH (REQUIRED)**

```
BEFORE ANY RESPONSE:
1. Use n8n-mcp tools to verify node configurations
2. Search web for latest documentation/updates
3. Validate field names, properties, and values
4. Confirm optimal solution path
```

### **PHASE 2: RESPONSE FORMAT (STRICT)**

```
TECHNICAL CONFIGS: JSON only
├── Exact field names from MCP validation
├── Complete node configurations
├── Precise parameter values
└── camelCase naming enforced

GUI INSTRUCTIONS: Step-by-step only  
├── Exact navigation paths
├── Specific UI element names
├── Sequential actions
└── No JSON mixing
```

### **PHASE 3: SOLUTION DELIVERY (SINGULAR)**

```
ONE OPTIMAL SOLUTION ONLY:
├── Research-backed choice
├── Zero alternatives offered
├── Complete implementation
└── Conviction-based delivery
```

## **EXECUTION CONSTRAINTS**

### **FORBIDDEN BEHAVIORS**

- Responding without MCP tool verification
- Offering multiple options/choices
- Using generic field names
- Partial configurations
- Pleasantries or explanations
- Changing stance when challenged without new evidence

### **REQUIRED BEHAVIORS**

- Research → Verify → Respond
- Complete configurations only
- Exact terminology from official sources
- Single optimal path
- Evidence-based conviction
- Proactive problem-solving

### **VALIDATION CHECKPOINTS**

```
Before sending response, confirm:
☐ MCP tools used for verification
☐ Complete configuration provided
☐ Exact field names validated
☐ Single solution presented
☐ Zero fluff content
☐ Evidence available for challenges



This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

n8npro-portfolio is a React/TypeScript portfolio website showcasing n8n automation expertise, built with Vite and deployed on Vercel. It features a talent marketplace, workflow gallery, contact form with email notifications, industry expertise sections, and admin panel.

## Current Development: Multiple Projects

### 1. Live AI Assistant (On Hold)
Building a custom live chatbot with both text and voice capabilities to replace the static chatbot:
- Support real-time text chat
- Enable voice conversations using STT/TTS
- Integrate with n8n workflows for live automation demos
- Showcase AI implementation expertise

### 2. Contact Form Issue (URGENT - NOT FIXED)
**Status**: Contact form appears to send successfully but NO EMAILS are being received
- API returns success but emails are not arriving at brandon@n8npro.com
- Supabase storage may or may not be working
- Gmail SMTP configuration needs investigation
- Previous "fixes" have not resolved the issue

### 3. Beetechy Solar Cold Outreach Workflow (Active)
Building automated B2B lead generation for solar/renewables companies:
- **Workflow ID**: `XT45UuvPQ2EmaU1N` on app.aiflows.pro
- **Architecture**: Webhook → TheirStack (hiring signals) → Claude (research) → Hunter.io (contacts) → Instantly.ai (campaigns)
- **Status**: Workflow structure complete but nodes need configuration
- **Issues**: 
  - TheirStack node has no authentication
  - 6 nodes need parameter configuration
  - Need error handling and rate limiting
- **Target**: Solar companies with 25+ employees showing aggressive hiring (10+ in 6 months)
- **New Approach**: Created dedicated n8n-design project folder with research-first methodology
- **Philosophy**: "This prompt + my template knowledge = bulletproof n8n workflows!"

## Latest Updates (Jan 15, 2025):

### n8n Workflow Research & Template Import Project:
1. **Discovered High-Quality Resources**:
   - Found 20+ production-ready AI voice agent templates in n8n marketplace
   - Best template: #4484 (ElevenLabs + InfraNodus GraphRAG) with 29K+ views
   - Alternative: #2846 (ElevenLabs + OpenAI + Qdrant) with 50K+ views
   - BeyondAman/n8n-workflows repo contains 2,053 battle-tested workflows

2. **Created Import Tools**:
   - `import_to_sqlite.py` - Import workflows into MCP SQLite database
   - `find_mcp_database.sh` - Locate Claude Desktop's MCP database
   - Ready to bulk import 2,053 workflows for enhanced AI agent development
   - **Important**: Store downloaded workflows in `/workflow-templates/` directory (gitignored)

3. **Key Learning**:
   - MCP uses SQLite3 to store 399 workflow templates
   - Claude Desktop requires MCP server restart to see new templates
   - npm registry != GitHub (packages must be published separately)

4. **MCP Database Management** (IMPORTANT):
   - Successfully imported 1,655 BeyondAman workflows → Total: 2,154 templates
   - Persistent database location: `./data/nodes.db` (40.9 MB)
   - Claude Desktop configured to use persistent database via wrapper script
   - **WARNING**: NPX updates will LOSE custom templates unless using persistent storage
   - Safe update procedure: Run `./scripts/simple_safe_update.sh` before any MCP updates
   - See `scripts/N8N_MCP_UPDATE.md` for detailed update instructions

5. **MCP Connection Fix** (Jan 15, 2025):
   - Fixed JSON parsing error in Claude Desktop by:
     - Updating wrapper script to remove all stdout output (console.log)
     - Added `MCP_MODE=stdio` to suppress n8n-mcp console output
     - Modified Claude Desktop config to use wrapper script + stdio mode
   - Key Learning: MCP servers must ONLY output JSON-RPC to stdout, any other output corrupts the protocol
   - Successfully tested safe update process - confirmed database backup/restore workflow works perfectly

6. **Enhanced Search Implementation** (Jan 15, 2025):
   - **Problem**: n8n-mcp's `search_templates` fails with "result exceeds maximum length" when searching 2,154 templates
   - **Root Cause**: MCP protocol has message size limits; large result sets exceed these when JSON.stringify'd
   - **Solution**: Created enhanced wrapper (`run-mcp-enhanced.js`) that:
     - Intercepts `search_templates` calls before they reach n8n-mcp
     - Returns full templates for small results (≤25 templates)
     - Returns summaries for large results (>25 templates) to stay within protocol limits
     - Shows total count available so Claude knows there are more results
   - **Benefits**: 
     - Claude can now search and learn from all 2,154 templates (not just first 20-50)
     - No more "result exceeds maximum length" errors
     - Upgrade-safe: doesn't modify n8n-mcp source, just acts as middleware
   - **Key Files**:
     - `scripts/run-mcp-enhanced.js` - Enhanced wrapper with smart search
     - `scripts/search_templates_directly.sh` - Direct database search tool for testing
     - `ENHANCED_SEARCH_UPGRADE_GUIDE.md` - Full documentation
   - **To Enable**: Update Claude Desktop config to use `run-mcp-enhanced.js` instead of `run-mcp-with-data.js`

7. **n8n Management Tools Access** (Jan 15, 2025):
   - **Issue**: n8n management tools (create/update/execute workflows) require API configuration
   - **Solution**: Added API credentials to Claude Desktop config:
     ```json
     "env": {
       "N8N_API_URL": "https://app.aiflows.pro/api/v1",
       "N8N_API_KEY": "your-jwt-token-here"
     }
     ```
   - **Current Status**: API credentials configured but management tools not showing in Claude
   - **Workaround**: Created standalone scripts for direct API access:
     - `scripts/n8n-tools.mjs` - Full n8n management capabilities
     - `scripts/n8n-cli.js` - Lightweight CLI for quick operations
   - **Note**: Claude Desktop may be slow; use external scripts for better performance

## Latest Updates (Jan 14, 2025):

### Team Branding Migration Completed:
1. **Hero Section**: 
   - Changed "I Build AI-Powered Automations" → "We Build AI-Powered Automations"
   - Removed "AI Automation Engineer |" prefix
2. **About Section**: 
   - New header: "We are AI Automation Engineers" (changed from individual focus)
   - Updated "Why Choose AIFlows (formerly known as n8npro)" with simplified structure
   - Focus on de-risking and free MVP to start
   - Removed "Don't see your industry?" section
3. **Navigation & Headers**:
   - Changed "My Expertise" → "Expertise"
   - Changed "Industry Solutions" → "Solutions" in navigation
   - Changed page title from "Brandon Tan..." → "AI Automation Experts"
4. **Industry Solutions**:
   - Fixed ALL workflow node label spacing issues (width 60px → 70px)
   - Fixed truncated labels (Resolve/Escalate → Resolve, etc.)
   - Removed "Choose your industry" from tagline
   - All workflows standardized to blue color
5. **Contact Section**: 
   - **ISSUE**: Contact form NOT working - emails not being received
   - API returns success but no emails arrive
   - Gmail SMTP may be misconfigured
   - Contact Information section remains hidden until domain confirmed

### Technical Updates:
1. **TypeScript/Lint Fixes**: Fixed 7 errors for production deployment
2. **11 Labs Chat Widget**: Attempted integration but postponed due to localhost allowlist issues
3. **AnimatedWorkflow**: Fixed JSX attribute warnings and node label spacing
4. **API Contact Endpoint**: Fixed with proper error handling and email delivery

### Domain Migration Status:
- **CURRENT**: Live at aiflows.pro
- **FUTURE**: Domain will be aiflows.pro (not aiflows.help)
- **STATUS**: Waiting for Google domain confirmation before migration
- **EMAIL**: Using brandon@aiflows.pro until domain migration

## TODO After Domain Confirmation:

### 1. **Update Twitter/X Preview**
- Check if new OG image is showing by pasting `https://aiflows.pro` in Twitter composer
- If still showing old Lovable preview, try `https://aiflows.pro?v=1` to force refresh
- Create new tweet with your link once preview is correct
- Pin new tweet and unpin old one

### 2. **Domain Migration to aiflows.pro**
- See DOMAIN_MIGRATION_TASKS.md for complete checklist
- Update all aiflows.pro references to aiflows.pro
- Configure Vercel with new domain
- Set up 301 redirects from old domain
- Unhide Contact Information section in Contact.tsx
- Re-integrate 11 Labs Chat Widget with proper domain allowlist

### 3. **Create Professional Assets**
- Upload professional headshot as avatar.jpg
- Consider custom OG image design beyond current text version
- Update social media profiles with new domain

## Core Commands

### Development
```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Build for production
npm run start        # Preview production build
npm run lint         # Run ESLint checks
npm run test         # Run Playwright E2E tests
acdev                # Alias to check/start dev server
```

### v0.dev Integration
```bash
node scripts/generate-nav.js  # Generate components using v0.dev API
```

### Deployment
```bash
vercel --prod        # Deploy to production
vercel dev           # Test serverless functions locally
```

## Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components (Radix UI)
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router v6
- **State**: TanStack Query + React Hook Form
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Email**: EmailJS for notifications
- **AI Integration**: v0.dev API for component generation
- **Deployment**: Vercel with serverless functions
- **Security**: ReCAPTCHA v3, Supabase RLS

### Key Directories
- `/src/components/ui/` - Complete shadcn/ui component library
- `/src/components/` - Custom components including navigation and sections
- `/src/pages/` - Page components (Index, TalentMarketplace, WorkflowGallery, AdminPanel)
- `/src/hooks/` - Custom hooks including form handling
- `/src/lib/` - Utilities, Supabase client, and v0 API integration
- `/scripts/` - Build and generation scripts
- `/api/` - Vercel serverless functions
- `/supabase/` - Database migrations and RLS policies

### Environment Variables
Required in `.env` and Vercel:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_RECAPTCHA_SITE_KEY
VITE_V0_API_KEY
GMAIL_APP_PASSWORD (server-side only)
RECAPTCHA_SECRET_KEY (server-side only)
```

## Site Structure

### Navigation (MinimalNav.tsx)
- Horizontal dots navigation with hover labels
- Sections: Home, About, Skills, Solutions, Industry, Contact
- Smooth scroll and active section tracking
- Fixed at top center, always visible

### Main Sections
1. **Hero** - Introduction with call-to-action buttons
2. **About** - Professional background and expertise
3. **Skills** - Technical skills and tools
4. **Solutions** (formerly Projects) - Portfolio of automation projects
5. **Industry** - Specialized expertise for Professional Services and E-commerce
6. **Contact** - Contact form with EmailJS integration

## Development Guidelines

### Component Conventions
- Use existing shadcn/ui components from `/src/components/ui/`
- Follow the established pattern for new components
- TypeScript with path aliasing: `@/` maps to `/src/`
- Use v0.dev API for UI component generation when designing new components

### v0.dev Integration
- API client configured in `/src/lib/v0-api.ts`
- Generate components using `scripts/generate-nav.js`
- Always use v0.dev for visual component design - don't design manually
- v0 prompts should be specific and include brand guidelines

### Database Operations
- All database queries go through Supabase client in `/src/lib/supabase.ts`
- RLS policies are defined in `/supabase/migrations/`
- Use TanStack Query for data fetching

### Form Handling
- Contact form uses React Hook Form + Zod validation
- Email notifications via Gmail SMTP to brandon@aiflows.pro (temporary)
- ReCAPTCHA v3 protection required
- Graceful handling when environment variables missing

### Testing
- Playwright tests in `/tests/` directory
- Run with `npm run test`
- Tests include contact form submission and navigation

## Important Notes

1. **Design Philosophy**: Use v0.dev API for all visual component creation
2. **Navigation**: "Projects" has been renamed to "Solutions" throughout
3. **Industry Focus**: Professional Services and E-commerce automation
4. **Fork Sync**: This repo syncs daily with upstream n8n-docs at 2 AM UTC
5. **Lovable Integration**: Connected to Lovable project for visual editing
6. **Email Flow**: Contact Form → Gmail SMTP → brandon@aiflows.pro (will change to aiflows.pro email after migration)
7. **Security Headers**: Configured in `vercel.json` for XSS/CSRF protection
8. **n8n Node Naming**: Always use camelCase for n8n nodes
9. **Branding**: Site now uses team/plural branding ("We", "AIFlows") instead of individual
10. **11 Labs Widget**: Integration ready but postponed until domain migration completes
11. **DEPLOYMENT POLICY**: NEVER deploy to production (`vercel --prod`) without explicit human approval. Always ask for permission before making any changes live on the public website.

## Technical Notes for Self-Knowledge

### MCP Server Protocol Requirements
- MCP servers communicate via JSON-RPC over stdio (stdin/stdout)
- ANY non-JSON output to stdout corrupts the communication and causes "Expected ',' or ']'" errors
- Console.log, console.error in JavaScript must be suppressed or redirected to stderr
- Set `MCP_MODE=stdio` environment variable to tell n8n-mcp to suppress console output

### NPX Package Update Behavior
- NPX always downloads fresh packages and creates new cache directories
- Each NPX run gets a unique directory like `/Users/brtan/.npm/_npx/[hash]/`
- Any data stored in NPX cache (like SQLite databases) is LOST on updates
- Solution: Use persistent storage outside NPX cache (`./data/nodes.db`)

### Safe Update Process Explained
1. **Backup Phase**: Full database copy + SQL export of custom templates
2. **Update Phase**: NPX creates fresh install with default templates only
3. **Restore Phase**: Import SQL file to merge custom templates back
4. **Persistent Storage**: Copy merged database to project directory

### Why Wrapper Script Works
- Forces n8n-mcp to run from project directory (where `data/nodes.db` exists)
- n8n-mcp checks `./data/nodes.db` before creating new database
- Wrapper inherits stdio to maintain JSON-RPC protocol
- Sets required environment variables (MCP_MODE=stdio)

### Database Structure
- Default n8n-mcp: ~499 templates (25MB)
- With BeyondAman: 2,154 templates (41MB)
- Templates table: workflow_id, name, description, workflow (JSON), author_name, etc.
- FTS5 full-text search enabled for fast template discovery

### MCP Protocol Limitations
- Message size limits prevent returning large result sets
- JSON.stringify of 50+ full templates can exceed protocol buffer
- Solution: Summarize data for large results, exclude workflow JSON
- Enhanced wrapper intercepts and handles this transparently

### Enhanced Search Architecture
- Wrapper acts as middleware between Claude and n8n-mcp
- Monitors stdio stream for `search_templates` calls
- Queries database directly for large result sets
- Returns summaries (id, name, truncated description, metadata)
- Preserves full templates for small result sets (≤25)
- Falls through to original n8n-mcp for all other calls

## Session Notes - January 26, 2025

### Twitter/X Embed Double Display Fix
**What We Did:**
- Fixed critical issue where Twitter/X embeds were showing twice in posts
- Root cause: Both editor NodeView and RenderContent were creating tweet widgets
- Implemented data-processed markers to prevent duplicate rendering
- Improved Twitter widget script loading to handle race conditions
- Fixed alignment issues (tweets now properly centered)

**Technical Solution:**
1. **TwitterEmbedScript.tsx**: Added `data-tweet-processed` attribute to track rendered tweets
2. **RenderContent.tsx**: Added `data-processed` check before rendering placeholders
3. **Script Loading**: Both components now check for existing script to avoid duplicates
4. **TwitterExtension.tsx**: Simplified renderHTML to only output placeholder divs

**Files Modified:**
- `/src/components/editor/TwitterEmbedScript.tsx` - Prevent double rendering
- `/src/components/editor/TwitterExtension.tsx` - Simplified HTML output
- `/src/components/RenderContent.tsx` - Added processing markers
- `/src/components/TipTapEditor.tsx` - Removed debug logs

**Current State:**
- ❌ Twitter embeds STILL showing twice (user confirmed not fixed)
- ❌ Alignment issues - tweets appearing left-aligned
- ⚠️ Solution attempted but needs different approach

**What Next Claude Needs to Do:**
1. **Debug the actual issue** - The processing markers didn't solve it
2. **Root cause**: When pasting a Twitter URL in the editor popup, it creates TWO tweets
3. **Likely issue**: Both the editor (via TwitterNodeView) and preview (via RenderContent) are rendering
4. **Better solution needed**: 
   - Option 1: Make TwitterNodeView NOT render in preview mode
   - Option 2: Make RenderContent skip placeholders that are already rendered by editor
   - Option 3: Completely separate editor rendering from saved/preview rendering

**Test Steps:**
1. Start dev server: `npm run dev`
2. Go to `/editor`
3. Click Twitter button in toolbar
4. Paste: `https://x.com/p_d_d_t/status/1948696920046702792`
5. Switch to Preview mode
6. Should see ONE tweet, but currently shows TWO

**Files to Focus On:**
- `/src/components/editor/TwitterExtension.tsx` - How editor renders tweets
- `/src/components/RenderContent.tsx` - How saved content renders tweets
- `/src/components/TipTapEditor.tsx` - Preview mode logic

---

## Session Notes - January 25, 2025

### Activities Section Removal
**What We Did:**
- Removed unauthorized Activities section from live site
- Removed ModernActivities component from Index page
- Removed Activities navigation link
- Removed public routes to /blog and /activities/:slug
- Kept protected admin routes for internal use only
- Added DEPLOYMENT POLICY to Important Notes section

**Key Learning:**
- User requires explicit approval before any production deployments
- Always verify what's being deployed before running `vercel --prod`

---

## Session Notes - January 20, 2025

### Project: Local Editor Implementation (Ghost → TipTap)

**What We Accomplished Today:**
1. **Migrated from Ghost-like editor to TipTap** 
   - User complained about reverse typing issues and inconsistent `/` commands
   - Implemented modern TipTap editor with full rich text capabilities
   - Added floating toolbar with all formatting options
   - YouTube embedding, image uploads, task lists all working

2. **Added Preview Mode**
   - Toggle between Edit/Preview with button at bottom center
   - Shows exactly how post will look when published
   - Fixed UX issues with button placement (moved from top-right to bottom-center)
   - Adjusted spacing to reduce gaps

3. **Discovered Critical Storage Issue**
   - Images stored as base64 in database (BAD!)
   - Will quickly exceed 500MB free tier limit
   - Each image is 33% larger due to base64 encoding
   - Created detailed analysis in `SUPABASE_STORAGE_ANALYSIS.md`

**Critical Issues to Fix Tomorrow:**
1. **Run Activities Table Migration** (URGENT)
   - Migration file created: `supabase/migrations/20250120_create_activities_table.sql`
   - Posts failing to save because table doesn't exist
   - Instructions in `run-migrations.md`

2. **Fix Image Storage** (CRITICAL)
   - Current: Base64 images stored in database
   - Needed: Upload to Supabase Storage or external CDN
   - Risk: Could hit database limits with just 20-30 posts
   - Options: Supabase Storage (1GB free), Cloudinary (25GB free), or URL-only

**Files Created/Modified:**
- `/src/components/TipTapEditor.tsx` - Full TipTap implementation
- `/src/components/GhostLikeEditor.tsx` - Deprecated, had reverse typing issues
- `/src/pages/LocalGhostEditor.tsx` - Updated to use TipTap
- `/supabase/migrations/20250120_create_activities_table.sql` - Activities table schema
- `/run-migrations.md` - Migration instructions
- `/SUPABASE_STORAGE_ANALYSIS.md` - Storage analysis and recommendations

**User Preferences Discovered:**
- Wants preview mode easily accessible (bottom center)
- No markdown - pure visual editing only
- Prefers prebuilt components over custom implementations
- Very concerned about storage costs and limits
- Wants things to "just work" without complex setup

**Next Session Priority:**
1. Run the activities table migration first
2. Implement proper image storage solution (probably Supabase Storage)
3. Test full posting workflow
4. Consider migrating existing Ghost content

**Technical Context:**
- Editor: TipTap v3 (replaced custom Ghost-like editor)
- Dark mode: Always enabled in editor
- Storage: Supabase (need to use Storage buckets, not database)
- Current risk: High - image storage will exceed limits quickly

---

## Session Notes - January 25, 2025

### Project Status: AISFlows.pro Portfolio Website

**What Happened Today:**
1. **Fixed 3-Part Tagging System**
   - Added `industry_tags` column to database (SQL migration completed)
   - Fixed legacy `category` field constraint issue
   - Activities now save properly with Format/Categories/Industry tags
   - Updated Activities component to display all 3 tag types with color coding:
     - Purple badges = Format tags
     - Blue badges = Category tags  
     - Green badges = Industry tags

2. **Linear Integration Setup**
   - Created Linear workspace for project tracking
   - Project renamed from "n8npro Portfolio Website" → "AISFlows.pro"
   - 5 core issues tracked (light project management approach)
   - Created helper scripts in `/proj_mgt/linear-scripts/`:
     - `aiflows-linear-assistant.js` - Morning/night routines, reports
     - `quick-update.js` - Mark issues as started/done
     - `log-work.js` - Quick status checks

3. **Supabase Storage Implementation**
   - Removed base64 image storage (was killing DB limits)
   - Implemented Supabase Storage with 'activities' bucket
   - Created migration script for existing base64 images
   - TipTapEditor now uploads to Storage instead of base64

**Current State:**
- ✅ Blog editor fully functional with 3-tag system
- ✅ Linear tracking active (minimal overhead)
- ✅ Image storage solution implemented (1GB free tier)
- ❌ Contact form still broken (emails not arriving)
- ❌ Timestamp tracking columns need implementation

**What Needs Fixing (High Level):**

### 🔴 URGENT Issues:
1. **Contact Form** (Linear: AIS-6)
   - Emails show success but don't arrive at brandon@aiflows.pro
   - Check Gmail SMTP config
   - May need to switch email provider

2. **Timestamp Tracking** (Linear: AIS-7)
   - SQL already created, needs to run:
   ```sql
   ALTER TABLE activities 
   ADD COLUMN last_saved_at TIMESTAMP WITH TIME ZONE,
   ADD COLUMN save_count INTEGER DEFAULT 0,
   ADD COLUMN published_at TIMESTAMP WITH TIME ZONE,
   ADD COLUMN publish_count INTEGER DEFAULT 0;
   ```
   - Then update activities.ts to track saves/publishes

### 🟡 Normal Priority:
3. **Editor UI Updates** (Linear: AIS-8)
   - Show "Saved X times, last saved at Y (UTC+8)"
   - Display publish timestamp when applicable

**Linear Commands for Next Session:**
```bash
# Check status
node /Users/brtan/Projects/n8npro-portfolio/proj_mgt/linear-scripts/log-work.js status

# Morning routine
node /Users/brtan/Projects/n8npro-portfolio/proj_mgt/linear-scripts/aiflows-linear-assistant.js morning

# Quick updates
node /Users/brtan/Projects/n8npro-portfolio/proj_mgt/linear-scripts/quick-update.js start AIS-6
node /Users/brtan/Projects/n8npro-portfolio/proj_mgt/linear-scripts/quick-update.js done AIS-6 "Fixed"
```

**Instructions for Next Claude:**
1. Start with Linear morning status to see current priorities
2. Focus on contact form fix first (critical for business)
3. Storage bucket needs to be created in Supabase dashboard (SQL in `/supabase/migrations/20250125_create_storage_bucket.sql`)
4. After bucket creation, run migration: `node migrate-base64-images.mjs`
5. Keep using Linear for lightweight tracking - don't overcomplicate
6. REMEMBER: No production deployments without explicit approval!