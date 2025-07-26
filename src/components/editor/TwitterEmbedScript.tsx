import { useEffect, useRef } from 'react';

interface TwitterEmbedScriptProps {
  tweetId: string;
}

declare global {
  interface Window {
    twttr: any;
  }
}

export function TwitterEmbedScript({ tweetId }: TwitterEmbedScriptProps) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent rendering if already processed
    if (embedRef.current?.hasAttribute('data-tweet-processed')) {
      return;
    }

    // Load Twitter widget script if not already loaded
    if (!window.twttr) {
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (window.twttr && window.twttr.widgets) {
            createTweet();
          }
        });
      } else {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
          if (window.twttr && window.twttr.widgets) {
            createTweet();
          }
        };
        document.body.appendChild(script);
      }
    } else if (window.twttr && window.twttr.widgets) {
      createTweet();
    }

    function createTweet() {
      if (embedRef.current && !embedRef.current.hasAttribute('data-tweet-processed')) {
        // Mark as processed
        embedRef.current.setAttribute('data-tweet-processed', 'true');
        
        // Clear any existing content
        embedRef.current.innerHTML = '';
        
        // Create tweet embed
        window.twttr.widgets.createTweet(
          tweetId,
          embedRef.current,
          {
            theme: 'dark',
            align: 'center',
            dnt: true,
          }
        ).catch((err: any) => {
          console.error('Failed to create tweet embed:', err);
          // Show fallback link on error
          if (embedRef.current) {
            embedRef.current.innerHTML = `
              <div class="flex justify-center my-4">
                <a href="https://twitter.com/i/status/${tweetId}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 rounded-lg px-4 py-3 hover:bg-blue-900/30 transition-colors">
                  <svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span class="text-blue-300">View on X</span>
                </a>
              </div>
            `;
          }
        });
      }
    }

    return () => {
      // Cleanup: remove tweet iframe if component unmounts
      if (embedRef.current) {
        embedRef.current.innerHTML = '';
        embedRef.current.removeAttribute('data-tweet-processed');
      }
    };
  }, [tweetId]);

  return (
    <div className="twitter-embed-container my-4 flex justify-center">
      <div ref={embedRef} className="twitter-widget-container">
        {/* Loading state */}
        <div className="flex justify-center items-center min-h-[200px] bg-blue-900/10 border border-blue-500/20 rounded-lg">
          <div className="text-center p-6">
            <svg className="h-8 w-8 mx-auto mb-3 text-blue-400 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <p className="text-gray-400 text-sm">Loading tweet...</p>
          </div>
        </div>
      </div>
    </div>
  );
}