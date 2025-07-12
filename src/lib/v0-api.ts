import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

// Create v0 client using OpenAI-compatible interface
const v0 = createOpenAI({
  baseURL: 'https://api.v0.dev/v1',
  apiKey: import.meta.env.VITE_V0_API_KEY || process.env.VITE_V0_API_KEY,
});

console.log('v0 API configured with key:', import.meta.env.VITE_V0_API_KEY ? 'Present' : 'Missing');

export interface V0GenerateOptions {
  prompt: string;
  model?: 'v0-1.5-md' | 'v0-1.0-md';
  stream?: boolean;
  systemPrompt?: string;
}

/**
 * Generate UI components using v0.dev API
 */
export async function generateUIComponent(options: V0GenerateOptions) {
  const { prompt, model = 'v0-1.5-md', stream = false, systemPrompt } = options;

  console.log('generateUIComponent called with model:', model);

  const messages = [
    ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
    { role: 'user' as const, content: prompt }
  ];

  try {
    if (stream) {
      return streamText({
        model: v0(model),
        messages,
      });
    }

    console.log('Calling generateText...');
    const { text } = await generateText({
      model: v0(model),
      messages,
    });
    console.log('Text generated successfully');

    return text;
  } catch (error) {
    console.error('generateUIComponent error details:', error);
    throw error;
  }
}

/**
 * Generate a complete React component with v0
 */
export async function generateReactComponent(description: string) {
  console.log('generateReactComponent called with description length:', description.length);
  
  const systemPrompt = `You are v0, an AI assistant that generates modern React components using TypeScript, Tailwind CSS, and shadcn/ui components. 
Always use the existing shadcn/ui components from @/components/ui when possible.
Follow the project's established patterns and conventions.
Use TypeScript with proper typing.
Use Tailwind CSS for styling with the project's configured classes.`;

  try {
    const result = await generateUIComponent({
      prompt: description,
      systemPrompt,
      model: 'v0-1.5-md',
    });
    console.log('generateReactComponent result received');
    return result;
  } catch (error) {
    console.error('generateReactComponent error:', error);
    throw error;
  }
}

/**
 * Generate a Next.js page component
 */
export async function generateNextPage(description: string) {
  const systemPrompt = `Generate a Next.js page component with:
- TypeScript
- Proper imports from @/components/ui
- SEO metadata
- Responsive design with Tailwind CSS
- Loading and error states where appropriate`;

  return generateUIComponent({
    prompt: `Create a Next.js page component: ${description}`,
    systemPrompt,
    model: 'v0-1.5-md',
  });
}

/**
 * Fix or improve existing code using v0
 */
export async function improveCode(code: string, instructions: string) {
  return generateUIComponent({
    prompt: `Here's my current code:

\`\`\`tsx
${code}
\`\`\`

${instructions}`,
    model: 'v0-1.5-md',
  });
}

/**
 * Generate UI from an image
 */
export async function generateFromImage(imageBase64: string, description?: string) {
  const prompt = description 
    ? `Create a React component based on this image: ${description}`
    : 'Create a React component that matches this design';

  return generateUIComponent({
    prompt: `${prompt}\n\n[Image: data:image/png;base64,${imageBase64}]`,
    model: 'v0-1.5-md',
  });
}