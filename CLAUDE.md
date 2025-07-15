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

## Current Development: Live AI Assistant

We are building a custom live chatbot with both text and voice capabilities to replace the static chatbot. This will:
- Support real-time text chat
- Enable voice conversations using STT/TTS
- Integrate with n8n workflows for live automation demos
- Showcase AI implementation expertise

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
   - Contact form fully functional with brandon@n8npro.com
   - Added graceful handling for missing environment variables
   - Gmail SMTP integration working
   - Contact Information section remains hidden until domain confirmed

### Technical Updates:
1. **TypeScript/Lint Fixes**: Fixed 7 errors for production deployment
2. **11 Labs Chat Widget**: Attempted integration but postponed due to localhost allowlist issues
3. **AnimatedWorkflow**: Fixed JSX attribute warnings and node label spacing
4. **API Contact Endpoint**: Fixed with proper error handling and email delivery

### Domain Migration Status:
- **CURRENT**: Live at n8npro.com
- **FUTURE**: Domain will be aiflows.pro (not aiflows.help)
- **STATUS**: Waiting for Google domain confirmation before migration
- **EMAIL**: Using brandon@n8npro.com until domain migration

## TODO After Domain Confirmation:

### 1. **Update Twitter/X Preview**
- Check if new OG image is showing by pasting `https://aiflows.pro` in Twitter composer
- If still showing old Lovable preview, try `https://aiflows.pro?v=1` to force refresh
- Create new tweet with your link once preview is correct
- Pin new tweet and unpin old one

### 2. **Domain Migration to aiflows.pro**
- See DOMAIN_MIGRATION_TASKS.md for complete checklist
- Update all n8npro.com references to aiflows.pro
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
- Email notifications via Gmail SMTP to brandon@n8npro.com (temporary)
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
6. **Email Flow**: Contact Form → Gmail SMTP → brandon@n8npro.com (will change to aiflows.pro email after migration)
7. **Security Headers**: Configured in `vercel.json` for XSS/CSRF protection
8. **n8n Node Naming**: Always use camelCase for n8n nodes
9. **Branding**: Site now uses team/plural branding ("We", "AIFlows") instead of individual
10. **11 Labs Widget**: Integration ready but postponed until domain migration completes

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