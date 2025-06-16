// Cyborg Head Favicon - Maximum Size & Prominence
console.log('🔧 Cyborg Head Favicon loaded');

function setFavicon() {
  console.log('🚀 Setting maximum size cyborg head favicon...');
  
  // Remove ALL existing favicon links aggressively
  const existingLinks = document.querySelectorAll('link[rel*="icon"], link[rel*="shortcut"]');
  console.log('🗑️ Removing existing favicon links:', existingLinks.length);
  existingLinks.forEach(link => link.remove());
  
  // Add cache-busting parameter with random number for aggressive refresh
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  
  // Force reload by adding multiple cache-busting parameters
  const cacheBuster = `?v=${timestamp}&r=${random}&force=true`;
  
  // Add new cyborg favicon with aggressive cache busting
  const faviconSvg = document.createElement('link');
  faviconSvg.rel = 'icon';
  faviconSvg.type = 'image/svg+xml';
  faviconSvg.href = `/cyborg-favicon.svg${cacheBuster}`;
  document.head.appendChild(faviconSvg);
  
  // Also add ICO fallback with aggressive cache busting
  const faviconIco = document.createElement('link');
  faviconIco.rel = 'icon';
  faviconIco.type = 'image/x-icon';
  faviconIco.href = `/favicon.ico${cacheBuster}`;
  faviconIco.sizes = 'any';
  document.head.appendChild(faviconIco);
  
  // Force a page title change to trigger favicon refresh
  const originalTitle = document.title;
  document.title = 'Refreshing...';
  setTimeout(() => {
    document.title = originalTitle;
  }, 100);
  
  console.log('✅ Maximum size cyborg head favicon set successfully with aggressive cache refresh!');
}

// Set favicon immediately
setFavicon();

// Set again when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setFavicon);
} else {
  setFavicon();
}

// Set again after delays to override any other favicon changes
setTimeout(setFavicon, 1000);
setTimeout(setFavicon, 3000);

// Force refresh on page focus (when user returns to tab)
window.addEventListener('focus', setFavicon); 