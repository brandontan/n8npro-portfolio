import { useState } from 'react';
import { generateReactComponent } from '@/lib/v0-api';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';

export function GenerateWithV0() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateNavigation = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Create an ULTRA-MINIMALIST navigation for n8npro.com that's almost invisible but highly functional.

DESIGN PHILOSOPHY:
- The site has a sophisticated macOS liquid glass aesthetic
- AVOID big bars, heavy elements, or anything that draws too much attention
- Think Apple-level minimalism - the navigation should whisper, not shout

REQUIREMENTS:
1. Navigation for sections: hero, about, skills, projects, contact
2. Active section tracking with smooth transitions
3. Mobile responsive

SUGGESTED APPROACH:
- Consider a thin line of tiny dots that appears at the top on scroll
- Or floating text labels that fade in/out based on scroll position
- Or a subtle progress indicator that shows current section
- Maybe just section names that appear/disappear elegantly
- Could be a single minimal indicator showing current section name

STYLING:
- Use the existing glass-card effect but make it extremely subtle
- Primary color: hsl(217 91% 60%) but use sparingly
- Lots of transparency, blur effects, smooth fades
- Should feel like it's part of the background, not sitting on top

CRITICAL: 
- NO big black bars
- NO heavy visual elements
- Should be so minimal users might not notice it at first
- But functional enough that they can navigate when needed
- Think of it as navigation that respects the beautiful design already there`;

      const result = await generateReactComponent(prompt);
      setGeneratedCode(result as string);
      
      // Extract just the code if it's wrapped in markdown
      const codeMatch = (result as string).match(/```(?:tsx?|jsx?)\n([\s\S]*?)\n```/);
      const cleanCode = codeMatch ? codeMatch[1] : result as string;
      
      // Save to a file
      const blob = new Blob([cleanCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'FloatingDotsNav.tsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Navigation Generated!",
        description: "FloatingDotsNav.tsx has been downloaded. Move it to src/components/",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = async () => {
    if (!generatedCode) return;
    
    const codeMatch = generatedCode.match(/```(?:tsx?|jsx?)\n([\s\S]*?)\n```/);
    const cleanCode = codeMatch ? codeMatch[1] : generatedCode;
    
    await navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass-card rounded-xl p-4 space-y-4 max-w-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">v0.dev Navigation Redesign</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Ultra-minimalist navigation that respects your design
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={generateNavigation}
            disabled={isGenerating}
            className="flex-1"
          >
            {isGenerating ? "Generating..." : "Generate Navigation"}
          </Button>
          
          {generatedCode && (
            <Button
              onClick={copyCode}
              variant="outline"
              size="icon"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          )}
        </div>
        
        {generatedCode && (
          <div className="text-xs text-muted-foreground">
            ✅ Generated! File downloaded. Move to src/components/
          </div>
        )}
      </div>
    </div>
  );
}