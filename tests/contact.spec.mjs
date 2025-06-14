import { test, expect } from '@playwright/test';

test('Contact form submits successfully', async ({ page }) => {
  await page.goto('http://localhost:8082/');

  // Wait for the form to be visible with a longer timeout
  await expect(page.getByRole('heading', { name: /Send Me a Message/i })).toBeVisible({ timeout: 60000 });

  // Use more robust selectors for form fields
  await page.getByPlaceholder('Your full name').fill('Test User');
  await page.getByPlaceholder('your.email@company.com').fill('testuser@example.com');
  await page.getByPlaceholder('e.g., CRM automation, inventory management').fill('Test Automation');
  await page.getByPlaceholder('Tell me about your automation needs, current pain points, and expected outcomes...').fill('Testing Playwright E2E form submission.');

  // Submit the form
  await page.getByRole('button', { name: /Send Message/i }).click();

  // Check for the success message with longer timeout
  await expect(page.getByText(/Message sent successfully/i)).toBeVisible({ timeout: 30000 });

  // Verify the dismiss button is present
  await expect(page.getByRole('button').filter({ has: page.locator('svg') }).nth(-1)).toBeVisible();

  // Test manual dismiss functionality
  await page.getByRole('button').filter({ has: page.locator('svg') }).nth(-1).click();
  await expect(page.getByText(/Message sent successfully/i)).not.toBeVisible();
});

test('Success message auto-dismisses after 5 seconds', async ({ page }) => {
  await page.goto('http://localhost:8082/');

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