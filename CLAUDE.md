# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

n8npro-portfolio is a React/TypeScript portfolio website showcasing n8n automation expertise, built with Vite and deployed on Vercel. It features a talent marketplace, workflow gallery, contact form with email notifications, industry expertise sections, and admin panel.

## Current Development: Live AI Assistant

We are building a custom live chatbot with both text and voice capabilities to replace the static chatbot. This will:
- Support real-time text chat
- Enable voice conversations using STT/TTS
- Integrate with n8n workflows for live automation demos
- Showcase AI implementation expertise

## TODO Tomorrow (Jan 13, 2025):

### 1. **Update Twitter/X Preview**
- Check if new OG image is showing by pasting `https://n8npro.com` in Twitter composer
- If still showing old Lovable preview, try `https://n8npro.com?v=1` to force refresh
- Create new tweet with your link once preview is correct
- Pin new tweet and unpin old one

### 2. **Domain Migration to aiflows.pro**
- See DOMAIN_MIGRATION_TASKS.md for complete checklist
- Update all n8npro.com references to aiflows.pro
- Configure Vercel with new domain
- Set up 301 redirects from old domain

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
- Email notifications via EmailJS to brandon@n8npro.com
- ReCAPTCHA v3 protection required

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
6. **Email Flow**: Contact Form → EmailJS → brandon@n8npro.com → Cloudflare Email Routing
7. **Security Headers**: Configured in `vercel.json` for XSS/CSRF protection
8. **n8n Node Naming**: Always use camelCase for n8n nodes