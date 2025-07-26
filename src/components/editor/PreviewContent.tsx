import { useMemo } from 'react';
import { generateHTML } from '@tiptap/react';
import { Tweet } from 'react-tweet';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { AlignableYoutube } from '../AlignableYoutube';
import { TwitterExtension } from './TwitterExtension';

interface PreviewContentProps {
  content: any;
}

export function PreviewContent({ content }: PreviewContentProps) {
  const extensions = [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link,
    Image,
    Highlight,
    Underline,
    TaskList,
    TaskItem,
    AlignableYoutube,
    TwitterExtension,
  ];

  const output = useMemo(() => {
    if (!content) return '';
    
    // Parse the content to find Twitter embeds
    const html = generateHTML(content, extensions);
    
    // Create a temporary div to parse the HTML
    const div = document.createElement('div');
    div.innerHTML = html;
    
    // Find all Twitter embed placeholders
    const twitterNodes = div.querySelectorAll('[data-twitter-embed]');
    const tweets: { id: string; element: Element }[] = [];
    
    twitterNodes.forEach((node) => {
      const tweetId = node.getAttribute('data-tweet-id');
      if (tweetId) {
        tweets.push({ id: tweetId, element: node });
      }
    });
    
    return { html: div.innerHTML, tweets };
  }, [content]);

  if (!output) return null;

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div 
        dangerouslySetInnerHTML={{ __html: output.html }}
        className="min-h-[400px] [&_iframe]:rounded-lg [&_iframe]:overflow-hidden [&_iframe]:my-4 [&_.youtube-wrapper]:my-4"
      />
      {/* Render tweets separately */}
      {output.tweets.map((tweet) => (
        <div key={tweet.id} className="my-4 flex justify-center">
          <Tweet id={tweet.id} />
        </div>
      ))}
    </div>
  );
}