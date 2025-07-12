import { generateReactComponent } from '../lib/v0-api';

async function generateProfessionalNavbar() {
  const description = `
Create a professional navigation bar component with the following requirements:

1. Design:
   - macOS liquid glass design with glassmorphism effects
   - Use the existing glass-card classes from the project's CSS
   - Backdrop blur effect with semi-transparent background
   - Subtle border and shadow for depth
   - Sticky positioning at the top of the page

2. Structure:
   - Logo/Brand name on the left (placeholder for law firm or accounting firm)
   - Main navigation menu in the center
   - Call-to-action button on the right (e.g., "Schedule Consultation")
   - Mobile responsive with hamburger menu

3. Professional Services Dropdown:
   - Services dropdown menu with categories suitable for law firms and accounting firms
   - Smooth hover animations
   - Categories like:
     * For Law Firms: Corporate Law, Litigation, Real Estate, Family Law, IP Law
     * For Accounting: Tax Services, Audit, Bookkeeping, Financial Advisory, Business Consulting

4. Styling:
   - Use the project's existing Tailwind classes
   - Apply glass-card, glass-button effects from the CSS
   - Professional color scheme using the CSS variables (--primary, --accent, etc.)
   - Smooth transitions and hover effects
   - Use shadcn/ui components where applicable (navigation-menu, dropdown-menu)

5. Features:
   - Active link highlighting
   - Smooth scroll to sections (if applicable)
   - Accessibility compliant with proper ARIA labels
   - TypeScript with proper typing

The component should be named ProfessionalNavbar and export as default.
Import necessary shadcn/ui components from @/components/ui.
Use modern React patterns with hooks where needed.
`;

  try {
    console.log('Generating professional navbar component...');
    const result = await generateReactComponent(description);
    
    console.log('Generated component:');
    console.log(result);
    
    // Save the generated component
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const componentPath = path.join(process.cwd(), 'src/components/ProfessionalNavbar.tsx');
    await fs.writeFile(componentPath, result);
    
    console.log(`\nComponent saved to: ${componentPath}`);
  } catch (error) {
    console.error('Error generating navbar:', error);
  }
}

// Run the generation
generateProfessionalNavbar();