import { test, expect } from '@playwright/test';

test('Page loads successfully', async ({ page }) => {
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text());
    }
  });
  
  await page.goto('http://localhost:8080/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check the page source
  const pageSource = await page.content();
  console.log('Page source length:', pageSource.length);
  console.log('Page source preview:', pageSource.substring(0, 500));
  
  // Check if we can find any content on the page
  const bodyText = await page.textContent('body');
  console.log('Page content:', bodyText?.substring(0, 200));
  
  // Wait a bit more for React to render
  await page.waitForTimeout(2000);
  
  // Basic check that the page loaded
  await expect(page.locator('body')).toBeVisible();
});

test('Contact form submits successfully', async ({ page }) => {
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text());
    }
  });
  
  await page.goto('http://localhost:8080/');

  // Wait for the form to be visible with a longer timeout
  await expect(page.getByRole('heading', { name: /Send Me a Message/i })).toBeVisible({ timeout: 60000 });

  // Use more robust selectors for form fields
  await page.getByPlaceholder('Your full name').fill('Test User');
  await page.getByPlaceholder('your.email@company.com').fill('testuser@example.com');
  await page.getByPlaceholder('e.g., CRM automation, inventory management').fill('Test Automation');
  await page.getByPlaceholder('Tell me about your automation needs, current pain points, and expected outcomes...').fill('Testing Playwright E2E form submission.');

  // Submit the form
  await page.getByRole('button', { name: /Send Message/i }).click();

  // Wait a moment for the submission to process
  await page.waitForTimeout(2000);

  // Check for the success message with longer timeout
  await expect(page.getByText(/Message sent successfully/i)).toBeVisible({ timeout: 30000 });

  // Verify the dismiss button is present
  await expect(page.getByRole('button').filter({ has: page.locator('svg') }).nth(-1)).toBeVisible();
});

test('Success message auto-dismisses after 5 seconds', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // Wait for the form to be visible
  await expect(page.getByRole('heading', { name: /Send Me a Message/i })).toBeVisible({ timeout: 60000 });

  // Fill and submit form
  await page.getByPlaceholder('Your full name').fill('Auto Dismiss Test');
  await page.getByPlaceholder('your.email@company.com').fill('autodismiss@example.com');
  await page.getByPlaceholder('Tell me about your automation needs, current pain points, and expected outcomes...').fill('Testing auto-dismiss functionality.');

  await page.getByRole('button', { name: /Send Message/i }).click();

  // Verify success message appears
  await expect(page.getByText(/Message sent successfully/i)).toBeVisible({ timeout: 30000 });

  // Wait for auto-dismiss (5 seconds + buffer)
  await expect(page.getByText(/Message sent successfully/i)).not.toBeVisible({ timeout: 7000 });
}); 