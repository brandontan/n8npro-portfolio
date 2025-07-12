import { useState } from 'react';
import { generateReactComponent } from '@/lib/v0-api';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function V0NavigationRedesign() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateBetterNav = async () => {
    setIsGenerating(true);
    console.log('Starting v0 generation...');
    
    // Test if API key is available
    if (!import.meta.env.VITE_V0_API_KEY) {
      console.error('V0 API key is missing!');
      toast({
        title: "Configuration Error",
        description: "V0 API key is not configured",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }
    
    try {
      const prompt = `PROBLEM: The current floating dots navigation on the right side creates visual clutter because it conflicts with an existing chatbot widget that's also positioned on the right side of the screen.

Please redesign the FloatingDotsNav component with these constraints:

1. AVOID THE RIGHT SIDE - The chatbot occupies the bottom-right area
2. Consider alternative positions:
   - Left side vertical dots
   - Top horizontal minimal bar that appears on scroll
   - Bottom center dots (horizontal)
   - A creative solution that doesn't add clutter

3. The site has a beautiful macOS liquid glass design with:
   - glass-card class: rgba(255,255,255,0.05) backdrop blur
   - Dark theme with fluid animations
   - Primary color: hsl(217 91% 60%)
   - Liquid blobs and morphing shapes

4. Requirements:
   - Must work for sections: hero, about, skills, projects, contact
   - Active section tracking
   - Smooth scroll on click
   - Mobile friendly
   - Should enhance, not clutter the design
   - Consider hiding when not needed

Create an elegant navigation solution that respects the existing UI elements and maintains the clean aesthetic.`;

      console.log('Calling generateReactComponent...');
      const result = await generateReactComponent(prompt);
      console.log('v0 result:', result);
      
      // Extract code and save
      const codeMatch = (result as string).match(/```(?:tsx?|jsx?)\n([\s\S]*?)\n```/);
      const cleanCode = codeMatch ? codeMatch[1] : result as string;
      
      const blob = new Blob([cleanCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'FloatingDotsNavRedesigned.tsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Redesigned Navigation Generated!",
        description: "FloatingDotsNavRedesigned.tsx has been downloaded.",
      });
    } catch (error) {
      console.error('v0 generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="glass-card rounded-xl p-4 space-y-2 max-w-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className="font-medium text-sm">Navigation Redesign</h4>
        </div>
        
        <p className="text-xs text-muted-foreground">
          The dots conflict with chatbot. Let v0 redesign it!
        </p>
        
        <Button
          onClick={generateBetterNav}
          disabled={isGenerating}
          size="sm"
          className="w-full"
        >
          {isGenerating ? "v0 is thinking..." : "Redesign Navigation"}
        </Button>
      </div>
    </div>
  );
}