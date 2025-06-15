import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set favicon programmatically
const setFavicon = () => {
  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());
  
  // Add new favicon links
  const faviconIco = document.createElement('link');
  faviconIco.rel = 'icon';
  faviconIco.type = 'image/x-icon';
  faviconIco.href = '/favicon.ico';
  document.head.appendChild(faviconIco);
  
  const faviconSvg = document.createElement('link');
  faviconSvg.rel = 'icon';
  faviconSvg.type = 'image/svg+xml';
  faviconSvg.href = '/favicon.svg';
  document.head.appendChild(faviconSvg);
  
  const appleTouchIcon = document.createElement('link');
  appleTouchIcon.rel = 'apple-touch-icon';
  appleTouchIcon.href = '/apple-touch-icon.png';
  document.head.appendChild(appleTouchIcon);
};

// Set favicon when the app loads
setFavicon();

createRoot(document.getElementById("root")!).render(<App />);
