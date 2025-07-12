import { useState } from 'react';
import { useV0 } from '@/hooks/use-v0';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Loader2, Sparkles } from 'lucide-react';

export function V0Generator() {
  const [prompt, setPrompt] = useState('');
  const { generate, isGenerating, generatedCode, copyToClipboard } = useV0();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    await generate({
      prompt,
      model: 'v0-1.5-md',
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          v0.dev Component Generator
        </CardTitle>
        <CardDescription>
          Describe the component you want to build and let v0.dev generate it for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Describe your component... e.g., 'A modern pricing table with 3 tiers, dark mode support, and animated hover effects'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Component
              </>
            )}
          </Button>
        </div>

        {generatedCode && (
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Generated Code</TabsTrigger>
              <TabsTrigger value="preview">Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="space-y-2">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Code
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{generatedCode}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">To use this component:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Copy the generated code</li>
                  <li>Create a new file in src/components/</li>
                  <li>Paste the code and save</li>
                  <li>Import and use in your pages</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}