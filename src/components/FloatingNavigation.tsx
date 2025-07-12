import { useEffect, useState } from 'react';
import { generateReactComponent } from '@/lib/v0-api';

// Temporary component to generate navigation with v0
export function GenerateFloatingNav() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const generateNav = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Create a floating glass navigation dots component for a portfolio site with these requirements:

Design Requirements:
- Vertical dots navigation positioned fixed on the right side of screen
- Each dot represents a section: Hero, About, Skills, Projects, Contact
- Use glassmorphism effect matching these existing classes:
  - glass-card: background rgba(255,255,255,0.05), backdrop-filter blur(20px) saturate(180%), border 1px solid rgba(255,255,255,0.1)
  - Smooth transitions and hover effects
- Active section indicator with larger dot or different opacity
- Dots should expand on hover to show section name
- Dark theme compatible

Technical Requirements:
- React component with TypeScript
- Use IntersectionObserver to track active section
- Smooth scroll to sections on click
- Responsive: hide on mobile, show on tablet/desktop
- Tailwind CSS classes only
- Include these section IDs: hero, about, skills, projects, contact

Make it minimal, elegant, and match the liquid glass aesthetic of the site.`;

      const result = await generateReactComponent(prompt);
      setGeneratedCode(result as string);
      console.log('Generated Navigation:', result);
    } catch (error) {
      console.error('Error generating navigation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 p-4 glass-card rounded-lg">
      <button
        onClick={generateNav}
        disabled={isGenerating}
        className="glass-button px-4 py-2 rounded text-white"
      >
        {isGenerating ? 'Generating Navigation...' : 'Generate Floating Nav with v0'}
      </button>
      {generatedCode && (
        <div className="mt-4 max-w-xl">
          <p className="text-sm text-muted-foreground mb-2">Generated! Check console for code.</p>
          <pre className="text-xs overflow-auto max-h-40 p-2 glass-card rounded">
            <code>{generatedCode.substring(0, 500)}...</code>
          </pre>
        </div>
      )}
    </div>
  );
}