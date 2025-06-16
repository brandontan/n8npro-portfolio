import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set favicon programmatically
const setFavicon = () => {
  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());

  // Add new SVG favicon link
  const faviconSvg = document.createElement('link');
  faviconSvg.rel = 'icon';
  faviconSvg.type = 'image/svg+xml';
  faviconSvg.href = '/brain-favicon.svg?v=1';
  document.head.appendChild(faviconSvg);
};

// Set favicon when the app loads
setFavicon();

createRoot(document.getElementById("root")!).render(<App />);
