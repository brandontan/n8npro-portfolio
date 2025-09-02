import { generateReactComponent } from '../src/lib/v0-api.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const chatbotPrompt = `
Create a modern AI chatbot widget component for React with TypeScript and Tailwind CSS.

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

The component should be production-ready with proper TypeScript types, error handling, and accessibility.
`;

async function generateChatbot() {
  console.log('Generating chatbot component with v0.dev API...');
  
  try {
    const componentCode = await generateReactComponent(chatbotPrompt);
    
    const outputPath = path.join(__dirname, '..', 'src', 'components', 'AIChatbot.tsx');
    await fs.writeFile(outputPath, componentCode);
    
    console.log('✅ Chatbot component generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    
    return componentCode;
  } catch (error) {
    console.error('❌ Error generating chatbot:', error);
    throw error;
  }
}

// Run the generator
generateChatbot().catch(console.error);