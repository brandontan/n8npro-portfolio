import { useEffect, useRef } from 'react';

interface RenderContentProps {
  content: string;
  className?: string;
}

declare global {
  interface Window {
    twttr: any;
  }
}

export function RenderContent({ content, className = '' }: RenderContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all twitter embed placeholders
    const twitterEmbeds = containerRef.current.querySelectorAll('[data-twitter-embed]:not([data-processed])');
    
    if (twitterEmbeds.length === 0) return;

    // Load Twitter widget script if needed
    const loadTwitterScript = () => {
      return new Promise<void>((resolve) => {
        if (window.twttr && window.twttr.widgets) {
          resolve();
          return;
        }

        // Check if script is already loading
        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (existingScript) {
          existingScript.addEventListener('load', () => {
            if (window.twttr && window.twttr.widgets) {
              resolve();
            }
          });
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
          if (window.twttr && window.twttr.widgets) {
            resolve();
          }
        };
        document.body.appendChild(script);
      });
    };

    // Replace placeholders with actual tweets
    loadTwitterScript().then(() => {
      twitterEmbeds.forEach((embed) => {
        const tweetId = embed.getAttribute('data-tweet-id');
        if (!tweetId) return;

        // Mark as processed to avoid double rendering
        embed.setAttribute('data-processed', 'true');

        // Create a container for the tweet
        const tweetContainer = document.createElement('div');
        tweetContainer.className = 'twitter-embed-container my-4 flex justify-center';
        
        // Replace the placeholder with the container
        embed.replaceWith(tweetContainer);

        // Create the tweet
        window.twttr.widgets.createTweet(
          tweetId,
          tweetContainer,
          {
            theme: 'dark',
            align: 'center',
            dnt: true,
          }
        ).catch((err: any) => {
          console.error('Failed to create tweet embed:', err);
          // Show fallback link on error
          tweetContainer.innerHTML = `
            <a href="https://twitter.com/i/status/${tweetId}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 rounded-lg px-4 py-3 hover:bg-blue-900/30 transition-colors">
              <svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span class="text-blue-300">View on X</span>
            </a>
          `;
        });
      });
    });
  }, [content]);

  return (
    <div 
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}