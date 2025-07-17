# Security Audit Report - n8npro-portfolio

**Date**: January 17, 2025  
**Severity**: HIGH - Multiple exposed API keys and credentials found

## Executive Summary

A security scan revealed multiple exposed API keys, tokens, and hardcoded credentials in the codebase. These vulnerabilities pose significant security risks and should be addressed immediately.

## Critical Findings

### 1. **EXPOSED API KEYS** (CRITICAL)

#### n8n API Key
- **Location**: Multiple script files
- **Files**: 
  - `/scripts/check-workflow-executions.js` (line 4)
  - `/scripts/create-simple-working-workflow.js` (line 4)
  - `/scripts/deploy-production-campaign.js` (line 4)
  - `/scripts/test_n8n_api.js` (line 9)
- **Exposed Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZGYzNjBiYS01NWNlLTRmYWItYjA2NS00NzhmZGViM2I2ODgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzUyNTgyODE0fQ.v3jDsCzCxJOqaeXXuh0CN8kXh2E2dnSIvRz-HCDMeUE`
- **Risk**: Full access to n8n API at app.aiflows.pro

#### TheirStack Bearer Token
- **Location**: Multiple workflow scripts
- **Files**:
  - `/scripts/create-simple-working-workflow.js` (line 26)
  - `/scripts/test-complete-workflow-logic.js` (line 12)
  - `/scripts/deploy-production-campaign.js` (line 31)
- **Exposed Token**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicmFuZG9uLnRhbkBiZWV0ZWNoeS5jb20iLCJwZXJtaXNzaW9ucyI6InVzZXIiLCJjcmVhdGVkX2F0IjoiMjAyNS0wNy0xMlQwNzo0MDoxNC41OTYxNjcrMDA6MDAifQ.oii-EQRacfYZgXeoyM9TGdMoTNnwtnAqTmVuNeHl9NY`
- **Risk**: Unauthorized access to TheirStack API

#### Hunter.io API Key
- **Location**: Workflow configuration scripts
- **Files**:
  - `/scripts/test-complete-workflow-logic.js` (line 113)
  - `/scripts/deploy-production-campaign.js` (line 210)
- **Exposed Key**: `b697942b3be016c3e27b0fc0a11ecc22d59a097d`
- **Risk**: Unauthorized email finding and verification

### 2. **HARDCODED EMAIL ADDRESSES** (MEDIUM)
- **Location**: `/api/contact.js` (lines 72, 131, 132)
- **Email**: `brandon@n8npro.com`
- **Risk**: Email exposure for spam/phishing attacks

### 3. **SENSITIVE DATA IN UNTRACKED FILES** (HIGH)
- **Untracked Files**:
  - `test-email-locally.js` - Contains email testing logic
  - `api/test-email-config.js` - May contain sensitive config
  - `ADD_TO_VERCEL_ENV.md` - Contains deployment instructions
- **Risk**: These files may be accidentally committed with sensitive data

### 4. **ENVIRONMENT VARIABLES** (LOW - Properly Handled)
- ✅ `.env` files are properly gitignored
- ✅ Client-side code uses `import.meta.env.VITE_*` pattern correctly
- ✅ No environment variable values exposed in committed code

## Recommendations

### Immediate Actions (Complete Today)

1. **Revoke All Exposed API Keys**
   - n8n API key at app.aiflows.pro
   - TheirStack bearer token
   - Hunter.io API key
   - Generate new keys after revocation

2. **Remove Hardcoded Credentials**
   ```bash
   # Update these files to use environment variables:
   - /scripts/check-workflow-executions.js
   - /scripts/create-simple-working-workflow.js
   - /scripts/deploy-production-campaign.js
   - /scripts/test_n8n_api.js
   - /scripts/test-complete-workflow-logic.js
   ```

3. **Add to .gitignore**
   ```
   # Add these patterns to .gitignore:
   test-email-locally.js
   api/test-*.js
   **/test-*.js
   ADD_TO_VERCEL_ENV.md
   ```

4. **Clean Git History**
   ```bash
   # Remove sensitive data from git history
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch scripts/*' \
     --prune-empty --tag-name-filter cat -- --all
   ```

### Long-term Security Improvements

1. **Use Environment Variables**
   ```javascript
   // Instead of:
   const N8N_API_KEY = 'hardcoded-key';
   
   // Use:
   const N8N_API_KEY = process.env.N8N_API_KEY;
   ```

2. **Implement Secret Management**
   - Use Vercel environment variables for all secrets
   - Consider using a secret management service

3. **Add Pre-commit Hooks**
   - Install git-secrets or similar tools
   - Scan for API keys before commits

4. **Regular Security Audits**
   - Schedule monthly security scans
   - Use automated tools like GitGuardian

## Positive Security Practices Found

1. ✅ Proper .gitignore configuration for .env files
2. ✅ Using environment variables for Supabase and EmailJS
3. ✅ ReCAPTCHA implementation for bot protection
4. ✅ Rate limiting in contact form API

## Action Items

- [ ] Revoke exposed n8n API key
- [ ] Revoke exposed TheirStack token
- [ ] Revoke exposed Hunter.io API key
- [ ] Update all scripts to use environment variables
- [ ] Add untracked test files to .gitignore
- [ ] Clean git history of exposed secrets
- [ ] Deploy updated code to production
- [ ] Verify new keys are working

## Security Contact

If you need assistance with remediation:
- Review each exposed key's usage before revocation
- Generate new keys from respective services
- Update Vercel environment variables
- Test functionality after key rotation