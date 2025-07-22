import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface GhostContentProps {
  html: string;
}

export default function GhostContent({ html }: GhostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Handle Ghost toggle cards
    const toggleCards = contentRef.current.querySelectorAll('.kg-toggle-card');
    
    toggleCards.forEach((card) => {
      const heading = card.querySelector('.kg-toggle-heading');
      const content = card.querySelector('.kg-toggle-content');
      
      if (heading && content) {
        // Add styles
        card.classList.add('border', 'border-gray-700', 'rounded-lg', 'mb-4', 'overflow-hidden');
        heading.classList.add('cursor-pointer', 'p-4', 'flex', 'items-center', 'justify-between', 'hover:bg-gray-800/50', 'transition-colors');
        content.classList.add('px-4', 'pb-4', 'hidden');
        
        // Add chevron icon
        const chevron = document.createElement('div');
        chevron.innerHTML = '<svg class="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>';
        chevron.classList.add('text-gray-400');
        heading.appendChild(chevron);
        
        // Add click handler
        heading.addEventListener('click', () => {
          const isOpen = !content.classList.contains('hidden');
          content.classList.toggle('hidden');
          chevron.querySelector('svg')?.classList.toggle('rotate-180');
        });
      }
    });

    // Handle other Ghost card types
    const bookmarkCards = contentRef.current.querySelectorAll('.kg-bookmark-card');
    bookmarkCards.forEach((card) => {
      card.classList.add('border', 'border-gray-700', 'rounded-lg', 'p-4', 'mb-4', 'hover:border-gray-600', 'transition-colors');
    });

    // Style Ghost buttons
    const buttons = contentRef.current.querySelectorAll('.kg-btn');
    buttons.forEach((btn) => {
      btn.classList.add('bg-transparent', 'border', 'border-gray-600', 'text-gray-300', 'hover:border-gray-400', 'hover:text-white', 'transition-colors');
      btn.classList.remove('kg-btn-accent');
    });

  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="prose prose-gray dark:prose-invert max-w-none ghost-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}