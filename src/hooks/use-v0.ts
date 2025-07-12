import { useState } from 'react';
import { generateUIComponent, V0GenerateOptions } from '@/lib/v0-api';
import { useToast } from '@/hooks/use-toast';

export function useV0() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const { toast } = useToast();

  const generate = async (options: V0GenerateOptions) => {
    setIsGenerating(true);
    try {
      const result = await generateUIComponent(options);
      
      // Extract code from markdown if present
      const code = typeof result === 'string' 
        ? result.match(/```(?:tsx?|jsx?)\n([\s\S]*?)\n```/)?.[1] || result
        : '';
      
      setGeneratedCode(code);
      toast({
        title: "Component generated!",
        description: "v0.dev has generated your component successfully.",
      });
      
      return code;
    } catch (error) {
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate component",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedCode) return;
    
    try {
      await navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Copied!",
        description: "Component code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return {
    generate,
    isGenerating,
    generatedCode,
    copyToClipboard,
  };
}