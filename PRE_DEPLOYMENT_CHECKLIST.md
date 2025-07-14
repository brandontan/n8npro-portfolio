# Pre-Deployment Checklist for AIFlows.help

## 🔍 Code Quality & Build
- [ ] Run lint check: `npm run lint`
- [ ] Run type check: `npm run typecheck` (if available)
- [ ] Run tests: `npm run test`
- [ ] Build locally: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Check console for errors in dev tools

## 📱 Mobile Responsiveness
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1440px)
- [ ] Check touch interactions work properly
- [ ] Verify hamburger menu (if any) works
- [ ] Test horizontal scrolling (should not exist)

## 🖼️ Images & Assets
- [ ] Verify all images load (no 404s)
- [ ] Check image alt tags for accessibility
- [ ] Confirm images are optimized (WebP/proper sizing)
- [ ] Test lazy loading behavior
- [ ] Verify favicon displays correctly

## 🔗 Links & Navigation
- [ ] Test all internal navigation links
- [ ] Verify smooth scroll behavior
- [ ] Check external links open in new tab
- [ ] Test CTA buttons functionality
- [ ] Verify contact form submission
- [ ] Check social media links (if any)

## 📧 Contact Form & Email
- [ ] Test contact form validation
- [ ] Submit test contact form
- [ ] Verify EmailJS integration works
- [ ] Check ReCAPTCHA v3 functionality
- [ ] Confirm email notifications arrive
- [ ] Test form error states

## 🔍 SEO & Meta Tags
- [ ] Verify page title and description
- [ ] Check OG meta tags for social sharing
- [ ] Test Twitter card meta tags
- [ ] Verify canonical URL
- [ ] Check robots.txt exists
- [ ] Verify sitemap.xml exists
- [ ] Test llms.txt file exists and is accessible

## 🚀 Performance
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Check bundle size is reasonable
- [ ] Verify code splitting works
- [ ] Test loading speed on slow 3G
- [ ] Check for render-blocking resources

## 🔒 Security
- [ ] Verify environment variables are secure
- [ ] Check HTTPS redirect works
- [ ] Test security headers in vercel.json
- [ ] Verify no sensitive data in code
- [ ] Check API keys are properly hidden
- [ ] Test CORS configuration

## 🌐 Domain & Deployment
- [ ] Verify domain DNS configuration
- [ ] Check SSL certificate is valid
- [ ] Test www to non-www redirect (or vice versa)
- [ ] Verify Vercel deployment settings
- [ ] Check environment variables in Vercel
- [ ] Test preview deployment first

## 📊 Analytics & Monitoring
- [ ] Set up Google Analytics (if needed)
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up uptime monitoring
- [ ] Configure performance monitoring

## 🎯 Content & Copy
- [ ] Proofread all text content
- [ ] Verify no Lorem Ipsum remains
- [ ] Check for consistent branding
- [ ] Verify copyright year is current
- [ ] Review legal pages (privacy, terms)

## 🔄 Post-Deployment
- [ ] Test live site thoroughly
- [ ] Submit to Google Search Console
- [ ] Test social media preview cards
- [ ] Monitor for 404 errors
- [ ] Check analytics are tracking
- [ ] Set up automated backups

## Domain Migration Specific (n8npro.com → aiflows.help)
- [ ] Set up 301 redirects from old domain
- [ ] Update all internal references to new domain
- [ ] Update email configuration for new domain
- [ ] Notify Google of domain change
- [ ] Update social media profiles
- [ ] Update any external service configurations