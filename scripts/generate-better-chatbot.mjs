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

const chatbotPrompt = `Create a modern glassmorphic AI chatbot widget for React with TypeScript and Tailwind CSS.

CRITICAL DESIGN REQUIREMENTS:
- The chat window must have a glassmorphic design with backdrop-blur
- Use semi-transparent backgrounds throughout (bg-white/10, bg-black/20, etc.)
- ALL text should be white or white with opacity
- NO blue colors anywhere - use white for all borders and focus states
- The design should blend seamlessly with a purple gradient background

Requirements:

1. Floating button:
   - Circular button fixed at bottom-right corner (bottom-4 right-4)
   - Uses MessageCircle icon from lucide-react
   - Gradient background (from-purple-500 to-purple-700)
   - White icon
   - Hover scale animation (hover:scale-110)
   - Shadow effect
   - Hides when chat is open

2. Chat window:
   - Fixed position, bottom-right corner (bottom-4 right-4)
   - 400px width, 600px height
   - Glassmorphic design: bg-white/10 backdrop-blur-xl
   - Border: border-white/20
   - Rounded corners (rounded-lg)
   - Shadow (shadow-2xl)
   - Smooth slide-up animation when opening

3. Header:
   - Gradient background (from-purple-500 to-purple-700)
   - "AI Assistant" title with MessageCircle icon
   - Close button (X icon) on the right
   - All text and icons in white
   - Rounded top corners

4. Message area:
   - Background: bg-black/20 for subtle contrast
   - Scrollable area with padding
   - User messages: right-aligned, bg-purple-600/80, white text
   - Bot messages: left-aligned, bg-white/20 with border-white/10, white text
   - Timestamps in white/50 opacity (HH:MM format)
   - Smooth auto-scroll to bottom on new messages

5. Typing indicator:
   - Three bouncing dots when loading
   - Background: bg-white/20 with border-white/10
   - Dots: bg-white/60

6. Input area:
   - Background: bg-black/10 with border-t border-white/20
   - Input field: 
     * bg-white/10 background
     * border border-white/20 (NOT blue)
     * White text (text-white)
     * White placeholder with opacity (placeholder:text-white/50)
     * FOCUS STATE: focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none
     * Use native HTML input element, NOT Input component
   - Send button: Purple gradient matching the header
   - Both input and button should be properly aligned

7. Functionality:
   - useState for: isOpen, messages array, inputValue, isLoading
   - Message interface: { id: string, text: string, sender: 'user' | 'bot', timestamp: Date }
   - sendMessage function that posts to webhook URL
   - Welcome message from bot on first load
   - Enter key to send messages
   - Proper error handling

8. Props:
   - webhookUrl: string (default: 'https://app.aiflows.pro/webhook/chatbot')
   - className: optional string

IMPORTANT STYLING NOTES:
- Use native HTML input element instead of Input component from shadcn/ui
- Ensure ALL focus states use white colors (focus:border-white/40, focus:ring-white/40)
- No blue colors should appear anywhere in the component
- The entire design should be cohesive with purple/white color scheme

Use Button and ScrollArea from @/components/ui/, but use native input element.
Import icons from lucide-react.
Use cn() utility for className concatenation.`;

async function generateChatbot() {
  console.log('Generating improved chatbot component with v0.dev API...');
  
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
Return ONLY the complete component code without any markdown code blocks, explanations, or thinking process.
The code should be production-ready and properly formatted.`
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
    
    const outputPath = path.join(__dirname, '..', 'src', 'components', 'GlassmorphicChatbot.tsx');
    await fs.writeFile(outputPath, cleanedCode);
    
    console.log('✅ Glassmorphic chatbot component generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    
    return cleanedCode;
  } catch (error) {
    console.error('❌ Error generating chatbot:', error);
    throw error;
  }
}

// Run the generator
generateChatbot().catch(console.error);