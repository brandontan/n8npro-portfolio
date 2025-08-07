import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mdx from "@mdx-js/rollup";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
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
    mode === 'development' &&
    componentTagger(),
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
          editor: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-image', '@tiptap/extension-youtube', '@tiptap/extension-bubble-menu', '@tiptap/extension-floating-menu'],
          // Form/validation chunk
          forms: ['react-hook-form', '@hookform/resolvers', 'zod', 'react-google-recaptcha-v3'],
          // Data/API chunk
          api: ['@tanstack/react-query', '@supabase/supabase-js', 'react-tweet'],
          // Admin-only dependencies
          admin: ['@tryghost/content-api', '@tryghost/koenig-lexical', '@measured/puck', 'grapesjs']
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
    chunkSizeWarningLimit: 1000,
  },
}));
