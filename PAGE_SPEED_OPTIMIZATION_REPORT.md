# Page Speed Optimization Analysis & Recommendations

## Current Performance Analysis

### Bundle Size Issues
- **Critical Issue**: JavaScript bundle is **3.63MB** (1.12MB gzipped) - extremely large
- **CSS Bundle**: 275KB (48KB gzipped) - manageable but could be optimized
- **No Code Splitting**: Everything loads as one massive chunk

### Core Web Vitals Concerns
1. **Largest Contentful Paint (LCP)**: Large JS bundle will delay LCP
2. **First Input Delay (FID)**: Heavy bundle causes main thread blocking
3. **Cumulative Layout Shift (CLS)**: Font loading and image rendering could cause shifts

---

## Priority 1: Critical Issues (Immediate Impact)

### 1. **JavaScript Bundle Splitting & Lazy Loading**

#### Current Problem:
- 3.63MB JavaScript bundle loads everything upfront
- Includes unused TipTap editor, Ghost components, admin panels on main page

#### Solution: Implement Code Splitting

**Update `vite.config.ts`:**
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    open: false,
  },
  plugins: [
    mdx(),
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React/Router chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI components chunk  
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover', 'framer-motion'],
          // Editor chunk (only load when needed)
          editor: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-image', '@tiptap/extension-youtube'],
          // Form/validation chunk
          forms: ['react-hook-form', '@hookform/resolvers', 'zod', 'react-google-recaptcha-v3'],
          // Data/API chunk
          api: ['@tanstack/react-query', '@supabase/supabase-js', 'react-tweet'],
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}));
```

#### Lazy Load Admin Routes
**Update `src/App.tsx`:**
```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const ActivitiesAdmin = lazy(() => import('./pages/ActivitiesAdmin'));
const LocalGhostEditor = lazy(() => import('./pages/LocalGhostEditor'));
const PostManager = lazy(() => import('./pages/PostManager'));

const Loading = () => <div className="flex justify-center items-center h-64">Loading...</div>;

// In Routes:
<Route path="/admin/activities" element={
  <Suspense fallback={<Loading />}>
    <ActivitiesAdmin />
  </Suspense>
} />
<Route path="/editor" element={
  <ProtectedRoute>
    <Suspense fallback={<Loading />}>
      <LocalGhostEditor />
    </Suspense>
  </ProtectedRoute>
} />
```

**Expected Impact**: Reduce initial bundle from 3.63MB to ~800KB-1.2MB

### 2. **Font Loading Optimization**

#### Current Issues:
- Google Fonts loading blocks render (Inter + Dancing Script)
- No font-display: swap
- No preload hints

#### Solution: Optimize Font Loading

**Update `index.html`:**
```html
<!-- Replace current Google Fonts links -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Add font-display: swap and preload -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Dancing+Script:wght@400;500;600;700&display=swap"></noscript>
```

### 3. **Remove Unused Dependencies**

#### Audit Unused Packages:
These appear unused for main site and should be lazy-loaded or removed:
- `@tryghost/content-api`, `@tryghost/koenig-lexical` (only for editor)
- `@measured/puck` (only for admin)
- `grapesjs` packages (only for admin)
- `@uiw/react-md-editor` (unused?)

#### Solution: Move to Dynamic Imports
Only load these when admin routes are accessed.

---

## Priority 2: Image & Media Optimization

### 1. **Hero Video Optimization**

#### Current Issue:
- 3.8MB hero video loads immediately
- No lazy loading or progressive loading

#### Solution: Optimize Video Loading

**Create `/src/components/OptimizedHeroVideo.tsx`:**
```typescript
import { useState, useRef, useEffect } from 'react';

export const OptimizedHeroVideo = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only load video after initial page load
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="video-container">
      {shouldLoad ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="hero-video"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="video-placeholder bg-gradient-to-br from-primary/20 to-accent/20" />
      )}
    </div>
  );
};
```

### 2. **Image Format Modernization**

#### Add WebP Support
**Update `vite.config.ts` to generate WebP:**
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  // ... existing config
  assetsInclude: ['**/*.webp'],
});
```

#### Create WebP versions of key images:
```bash
# Convert PNG to WebP (install imagemagick: brew install imagemagick)
convert /public/apple-touch-icon.png -quality 80 /public/apple-touch-icon.webp
```

---

## Priority 3: Caching & Compression

### 1. **Enhanced Vercel Configuration**

**Update `vercel.json`:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://*.googleapis.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://api.emailjs.com https://www.google.com; frame-src 'self' https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.(jpg|jpeg|png|gif|ico|svg|webp))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000"
        }
      ]
    },
    {
      "source": "/(.*\\.(css|js))",
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/hero-video.mp4",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000"
        }
      ]
    }
  ],
  "functions": {
    "api/contact.js": {
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://aiflows.pro/$1",
      "permanent": true,
      "has": [
        {
          "type": "host",
          "value": "n8npro.com"
        }
      ]
    },
    {
      "source": "/(.*)",
      "destination": "https://aiflows.pro/$1", 
      "permanent": true,
      "has": [
        {
          "type": "host",
          "value": "www.n8npro.com"
        }
      ]
    }
  ]
}
```

---

## Priority 4: CSS & Render Optimization

### 1. **Critical CSS Inline**

#### Extract critical CSS for above-the-fold content:
**Create `/src/styles/critical.css`:**
```css
/* Critical styles for hero section and navigation */
.hero-section {
  /* Hero styles here */
}
.minimal-nav {
  /* Navigation styles here */
}
```

#### Inline critical CSS in `index.html`:
```html
<style>
  /* Critical CSS content here */
</style>
```

### 2. **Remove Unused CSS**

#### Current Issue:
- Large Tailwind build (275KB)
- Unused shadcn components included

#### Solution: PurgeCSS Integration
**Update `tailwind.config.ts`:**
```typescript
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  // Add purge options
  safelist: [
    // Keep dynamic classes
    'animate-pulse',
    'animate-spin',
    // Add other dynamic classes
  ],
  // ... rest of config
} satisfies Config;
```

---

## Priority 5: Third-Party Script Optimization

### 1. **Optimize Google Analytics/ReCAPTCHA**

#### Current Issue:
- Scripts load synchronously
- No defer/async optimization

#### Solution: Delayed Script Loading
**Create `/src/components/ScriptLoader.tsx`:**
```typescript
import { useEffect } from 'react';

export const ScriptLoader = () => {
  useEffect(() => {
    // Load non-critical scripts after user interaction
    const loadScripts = () => {
      // Load ReCAPTCHA only when needed
      if (!document.querySelector('script[src*="recaptcha"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        document.head.appendChild(script);
      }
    };

    // Delay script loading
    const events = ['scroll', 'mousemove', 'keydown', 'click', 'touchstart'];
    const initScripts = () => {
      loadScripts();
      events.forEach(event => document.removeEventListener(event, initScripts));
    };

    events.forEach(event => document.addEventListener(event, initScripts, { passive: true }));

    // Fallback: load after 3 seconds
    setTimeout(initScripts, 3000);

    return () => {
      events.forEach(event => document.removeEventListener(event, initScripts));
    };
  }, []);

  return null;
};
```

---

## Expected Performance Improvements

### Before Optimization:
- **Bundle Size**: 3.63MB JS + 275KB CSS
- **LCP**: ~4-6 seconds
- **FCP**: ~2-3 seconds  
- **PageSpeed Score**: ~30-50

### After Full Optimization:
- **Bundle Size**: ~800KB main + lazy chunks
- **LCP**: ~1.5-2.5 seconds
- **FCP**: ~0.8-1.2 seconds
- **PageSpeed Score**: 85-95+

---

## Implementation Priority

### Phase 1 (Immediate - 80% impact):
1. ✅ Implement code splitting in `vite.config.ts`
2. ✅ Lazy load admin routes 
3. ✅ Optimize font loading
4. ✅ Update caching headers

### Phase 2 (Week 1 - 15% impact):
1. ✅ Optimize hero video loading
2. ✅ Remove unused dependencies
3. ✅ Implement script loader

### Phase 3 (Week 2 - 5% impact):
1. ✅ Generate WebP images
2. ✅ Critical CSS extraction
3. ✅ Advanced CSS purging

---

## Monitoring & Validation

### Tools for Testing:
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **WebPageTest**: https://www.webpagetest.org/
3. **Chrome DevTools**: Lighthouse audit
4. **Bundle Analyzer**: `npm run build -- --mode analyze`

### Key Metrics to Track:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s  
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Success Criteria:
- ✅ PageSpeed Score: 90+
- ✅ Initial bundle: < 1MB
- ✅ LCP: < 2.5s
- ✅ FCP: < 1.5s