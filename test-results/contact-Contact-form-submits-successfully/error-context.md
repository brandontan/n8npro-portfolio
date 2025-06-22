# Page snapshot

```yaml
- text: "[plugin:vite:import-analysis] Failed to resolve import \"@emailjs/browser\" from \"src/main.tsx\". Does the file exist? /Users/brtan/Projects/n8npro-portfolio/src/main.tsx:5:36 4 | import App from './App.tsx'; 5 | import './index.css'; 6 | import { init as initEmailJS } from '@emailjs/browser'; | ^ 7 | // Initialize EmailJS with your public key 8 | initEmailJS(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''); at TransformPluginContext._formatError (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49258:41) at TransformPluginContext.error (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49253:16) at normalizeUrl (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64291:23) at async file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64423:39 at async Promise.all (index 5) at async TransformPluginContext.transform (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64350:7) at async PluginContainer.transform (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49099:18) at async loadAndTransform (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:51977:27) at async viteTransformMiddleware (file:///Users/brtan/Projects/n8npro-portfolio/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:62105:24 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```