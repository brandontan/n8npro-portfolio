import { useEffect, useRef } from 'react';
import { Tweet } from 'react-tweet';
import { createRoot } from 'react-dom/client';

interface RenderContentProps {
  content: string;
  className?: string;
}

export function RenderContent({ content, className = '' }: RenderContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all twitter embed placeholders
    const twitterEmbeds = containerRef.current.querySelectorAll('[data-twitter-embed]:not([data-processed])');
    
    if (twitterEmbeds.length === 0) return;

    // Replace placeholders with React Tweet components
    twitterEmbeds.forEach((embed) => {
      const tweetId = embed.getAttribute('data-tweet-id');
      
      if (!tweetId) return;

      // Mark as processed to avoid double rendering
      embed.setAttribute('data-processed', 'true');

      // Create a container for the React component
      const container = document.createElement('div');
      container.className = 'my-4 flex justify-center';
      
      // Replace the placeholder with the container
      embed.replaceWith(container);

      // Render the Tweet component - ensure tweetId is a string
      const root = createRoot(container);
      root.render(<Tweet id={String(tweetId)} />);
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