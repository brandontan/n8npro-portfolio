import { test, expect } from '@playwright/test';

// Test configuration
const ADMIN_EMAIL = process.env.VITE_ADMIN_EMAIL || 'test@example.com';
const BASE_URL = 'http://localhost:3000';

test.describe('Post Manager Bugs', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the editor page which requires auth
    await page.goto(`${BASE_URL}/editor`);
    
    // If redirected to login, authenticate
    if (page.url().includes('/editor') && await page.locator('input[type="email"]').isVisible()) {
      await page.fill('input[type="email"]', ADMIN_EMAIL);
      await page.click('button:has-text("Send Magic Link")');
      
      // For testing, we'll need to manually authenticate or mock the auth
      // For now, we'll skip auth and go directly to testing
      test.skip();
    }
  });

  test('Format tag bug - Case Study shows as Tutorial', async ({ page }) => {
    // Navigate to editor
    await page.goto(`${BASE_URL}/editor`);
    
    // Create a post with Case Study format
    await page.fill('input[placeholder="Enter your title..."]', 'Test Case Study Post');
    
    // Select Case Study format
    await page.click('button:has-text("Tutorial")'); // Click the format dropdown
    await page.click('text=Case Study');
    
    // Add some content
    await page.click('.ProseMirror');
    await page.keyboard.type('This is a test case study content.');
    
    // Save the post
    await page.click('button:has-text("Save Draft")');
    
    // Wait for save to complete
    await page.waitForTimeout(2000);
    
    // Navigate to posts page
    await page.goto(`${BASE_URL}/posts`);
    
    // Check if the post shows Case Study format
    const postElement = page.locator('text=Test Case Study Post').first();
    await expect(postElement).toBeVisible();
    
    // Check the format badge
    const formatBadge = postElement.locator('..').locator('text=Case Study');
    await expect(formatBadge).toBeVisible();
    
    // Log what we actually see
    const actualFormat = await postElement.locator('..').locator('.badge').first().textContent();
    console.log('Expected: Case Study, Actual:', actualFormat);
  });

  test('Bulk delete bug - Selecting 2 posts shows wrong count', async ({ page }) => {
    // First create multiple test posts
    for (let i = 1; i <= 5; i++) {
      await page.goto(`${BASE_URL}/editor`);
      await page.fill('input[placeholder="Enter your title..."]', `Test Post ${i}`);
      await page.click('.ProseMirror');
      await page.keyboard.type(`Content for test post ${i}`);
      await page.click('button:has-text("Save Draft")');
      await page.waitForTimeout(1000);
    }
    
    // Navigate to posts page
    await page.goto(`${BASE_URL}/posts`);
    
    // Wait for posts to load
    await page.waitForSelector('text=Test Post 1');
    
    // Enable console logging
    page.on('console', msg => {
      console.log('Browser console:', msg.text());
    });
    
    // Select 2 posts
    const checkboxes = page.locator('button:has(.h-5.w-5)').filter({ hasText: '' });
    await checkboxes.nth(0).click();
    await checkboxes.nth(1).click();
    
    // Check the selected count
    const selectedCount = await page.locator('text=selected').textContent();
    console.log('Selected count shown:', selectedCount);
    
    // Click delete button
    await page.click('button:has-text("Delete Selected")');
    
    // Wait for confirm dialog and check the message
    page.on('dialog', async dialog => {
      const message = dialog.message();
      console.log('Confirm dialog message:', message);
      
      // Check if it mentions the correct number
      expect(message).toContain('2 post(s)');
      
      // Cancel to prevent actual deletion
      await dialog.dismiss();
    });
  });
});

// Standalone test to check console logs
test('Debug Post Manager State', async ({ page }) => {
  await page.goto(`${BASE_URL}/posts`);
  
  // Add console event listener
  page.on('console', msg => {
    if (msg.text().includes('selectedPosts') || msg.text().includes('formatTag')) {
      console.log('Debug log:', msg.text());
    }
  });
  
  // Wait for the component to mount and log initial state
  await page.waitForTimeout(2000);
  
  // Try selecting posts if any exist
  const checkboxes = page.locator('button:has(.h-5.w-5)').filter({ hasText: '' });
  const count = await checkboxes.count();
  
  if (count > 0) {
    console.log(`Found ${count} posts`);
    await checkboxes.first().click();
    await page.waitForTimeout(500);
    
    if (count > 1) {
      await checkboxes.nth(1).click();
      await page.waitForTimeout(500);
    }
  }
});