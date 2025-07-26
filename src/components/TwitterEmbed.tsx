import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { NodeViewProps } from '@tiptap/react';
import { useEffect, useRef } from 'react';

// Twitter/X embed component
const TwitterComponent = ({ node }: NodeViewProps) => {
  const { url, tweetId } = node.attrs;
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load Twitter widgets script if not already loaded
    if (!scriptLoaded.current && !window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        // Render the tweet after script loads
        if (window.twttr && containerRef.current) {
          window.twttr.widgets.load(containerRef.current);
        }
      };
      document.head.appendChild(script);
    } else if (window.twttr && containerRef.current) {
      // If script is already loaded, just render the tweet
      window.twttr.widgets.load(containerRef.current);
    }
  }, [url, tweetId]);

  return (
    <NodeViewWrapper className="twitter-embed-wrapper my-6">
      <div ref={containerRef} className="twitter-embed-container">
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={url}>Loading tweet...</a>
        </blockquote>
      </div>
    </NodeViewWrapper>
  );
};

// Twitter embed extension
export const TwitterEmbed = Node.create({
  name: 'twitterEmbed',
  
  group: 'block',
  
  atom: true,
  
  addAttributes() {
    return {
      url: {
        default: null,
      },
      tweetId: {
        default: null,
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-twitter-embed]',
        getAttrs: (dom: HTMLElement) => {
          const url = dom.getAttribute('data-url');
          const tweetId = dom.getAttribute('data-tweet-id');
          return { url, tweetId };
        },
      },
    ];
  },
  
  renderHTML({ node }) {
    const { url, tweetId } = node.attrs;
    
    return [
      'div',
      {
        'data-twitter-embed': '',
        'data-url': url,
        'data-tweet-id': tweetId,
        class: 'twitter-embed-wrapper my-6',
      },
      [
        'blockquote',
        {
          class: 'twitter-tweet',
          'data-theme': 'dark',
        },
        [
          'a',
          {
            href: url,
            target: '_blank',
          },
          'Loading tweet...',
        ],
      ],
    ];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(TwitterComponent);
  },
  
  addCommands() {
    return {
      setTwitterEmbed: (options: { url: string }) => ({ commands }: any) => {
        // Extract tweet ID from URL
        const tweetId = options.url.match(/status\/(\d+)/)?.[1];
        
        if (!tweetId) {
          return false;
        }
        
        return commands.insertContent({
          type: this.name,
          attrs: {
            url: options.url,
            tweetId,
          },
        });
      },
    };
  },
});

// Add Twitter type to window
declare global {
  interface Window {
    twttr: any;
  }
}