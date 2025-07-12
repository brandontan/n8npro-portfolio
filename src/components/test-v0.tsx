import { generateReactComponent } from '@/lib/v0-api';
import { useEffect, useState } from 'react';

export async function testV0() {
  const prompt = `Create a professional navigation bar component for n8npro.com with these specific requirements:

Design System:
- Use the existing macOS liquid glass design with glass-card and glass-button classes
- Dark theme with backdrop-filter: blur(20px) saturate(180%)
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Fixed/sticky positioning at top

Structure:
- Logo/Brand on left (n8npro)
- Center navigation with dropdowns:
  - Professional Services (dropdown: Legal Automation, Accounting Automation, Case Studies)
  - Workflow Solutions (dropdown: Client Intake, Document Generation, Billing & Time Tracking)
  - About
- Right side: "Get Free Audit" CTA button with glass-button styling

Mobile:
- Hamburger menu with smooth slide-in from right
- Full height mobile menu with glass effect
- Smooth transitions

Use Tailwind CSS classes and integrate with existing shadcn/ui components. Make it professional and trustworthy for law firms and accounting firms.`;

  try {
    const result = await generateReactComponent(prompt);
    console.log('Generated Navigation Component:');
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error generating component:', error);
    throw error;
  }
}

// Test component to display the result
export function V0Test() {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await testV0();
      setCode(result as string);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <button 
        onClick={handleGenerate}
        className="glass-button px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Navigation with v0'}
      </button>
      {code && (
        <pre className="mt-4 p-4 glass-card rounded overflow-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}