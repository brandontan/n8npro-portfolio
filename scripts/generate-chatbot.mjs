import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const API_KEY = process.env.VITE_V0_API_KEY;

if (!API_KEY) {
  console.error('❌ VITE_V0_API_KEY not found in .env file');
  process.exit(1);
}

const chatbotPrompt = `Create a modern AI chatbot widget component for React with TypeScript and Tailwind CSS.

Requirements:
1. Floating button:
   - Circular button fixed at bottom-right corner
   - Uses MessageCircle icon from lucide-react
   - Gradient background (blue-600 to purple-600)
   - Shows on hover scale animation
   - Hides when chat is open

2. Chat window:
   - Fixed position, bottom-right corner
   - 400px width, 600px height
   - Smooth slide-up animation when opening
   - White background (dark:gray-900 in dark mode)
   - Rounded corners with shadow

3. Header:
   - Gradient background (blue-600 to purple-600)
   - "AI Assistant" title with MessageCircle icon
   - Close button (X icon) on the right
   - White text

4. Message area:
   - Scrollable area with messages
   - User messages: right-aligned, blue background, white text
   - Bot messages: left-aligned, gray background
   - Each message shows timestamp (HH:MM format)
   - Smooth auto-scroll to bottom on new messages
   - Typing indicator (three dots animation) when loading

5. Input area:
   - Text input field with placeholder "Type your message..."
   - Send button with Send icon from lucide-react
   - Disabled state when loading
   - Enter key to send (Shift+Enter for new line)

6. Functionality:
   - useState for: isOpen, messages array, inputValue, isLoading
   - Message interface: { id, text, sender: 'user' | 'bot', timestamp }
   - sendMessage function that:
     - Posts to webhook URL (prop: webhookUrl)
     - Sends JSON: { message: inputValue }
     - Handles response and adds bot message
     - Shows error message on failure
   - Welcome message from bot on first load

7. Props:
   - webhookUrl: string (default: 'https://app.aiflows.pro/webhook/chatbot')
   - className: optional string for additional styling

Use existing shadcn/ui components: Button, Input, ScrollArea
Import icons from lucide-react: MessageCircle, Send, X, Loader2
Use cn() utility for className concatenation

The component should be production-ready with proper TypeScript types, error handling, and accessibility.`;

async function generateChatbot() {
  console.log('Generating chatbot component with v0.dev API...');
  console.log('Using API key:', API_KEY.substring(0, 20) + '...');
  
  try {
    const response = await fetch('https://api.v0.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'v0-1.5-md',
        messages: [
          {
            role: 'system',
            content: `You are v0, an AI assistant that generates modern React components using TypeScript, Tailwind CSS, and shadcn/ui components. 
Always use the existing shadcn/ui components from @/components/ui when possible.
Follow the project's established patterns and conventions.
Use TypeScript with proper typing.
Use Tailwind CSS for styling with the project's configured classes.
Return ONLY the complete component code without any markdown code blocks or explanations.`
          },
          {
            role: 'user',
            content: chatbotPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const componentCode = data.choices[0].message.content;
    
    // Clean up the response if it contains markdown code blocks
    const cleanedCode = componentCode
      .replace(/^```tsx?\n?/gm, '')
      .replace(/```$/gm, '')
      .trim();
    
    const outputPath = path.join(__dirname, '..', 'src', 'components', 'AIChatbot.tsx');
    await fs.writeFile(outputPath, cleanedCode);
    
    console.log('✅ Chatbot component generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    
    return cleanedCode;
  } catch (error) {
    console.error('❌ Error generating chatbot:', error);
    throw error;
  }
}

// Run the generator
generateChatbot().catch(console.error);