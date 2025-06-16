import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set favicon programmatically
const setFavicon = () => {
  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());

  // Add timestamp for aggressive cache busting
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);

  // Add new SVG favicon link with timestamp and random
  const faviconSvg = document.createElement('link');
  faviconSvg.rel = 'icon';
  faviconSvg.type = 'image/svg+xml';
  faviconSvg.href = `/icon.svg?t=${timestamp}&r=${random}`;
  document.head.appendChild(faviconSvg);
  
  // Force page title update
  document.title = 'n8n AI Automation Expert';
};

// Set favicon when the app loads
setFavicon();

createRoot(document.getElementById("root")!).render(<App />);
