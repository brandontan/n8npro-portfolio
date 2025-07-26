import { useState, useEffect } from 'react';

interface XEmbedProps {
  url: string;
}

export default function XEmbed({ url }: XEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Try to load Twitter's widget
    const loadTwitterWidget = () => {
      if (window.twttr) {
        // Twitter widgets already loaded
        setTimeout(() => {
          const container = document.getElementById(`tweet-${url}`);
          if (container && window.twttr.widgets) {
            window.twttr.widgets.createTweet(
              url.match(/status\/(\d+)/)?.[1] || '',
              container,
              {
                theme: 'dark',
                align: 'center'
              }
            ).then(() => {
              setLoading(false);
            }).catch(() => {
              setError(true);
              setLoading(false);
            });
          }
        }, 100);
      } else {
        // Load Twitter widgets
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => loadTwitterWidget();
        script.onerror = () => {
          setError(true);
          setLoading(false);
        };
        document.head.appendChild(script);
      }
    };
    
    loadTwitterWidget();
  }, [url]);
  
  if (error) {
    return (
      <div className="my-6 max-w-xl mx-auto">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
          <svg className="h-8 w-8 mx-auto mb-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <p className="text-gray-300 mb-2">View on X</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline break-all"
          >
            {url}
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-6 max-w-xl mx-auto">
      <div id={`tweet-${url}`} className="flex justify-center">
        {loading && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-400 text-sm mt-4">Loading X post...</p>
          </div>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    twttr: any;
  }
}