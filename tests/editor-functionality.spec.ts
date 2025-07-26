import { test, expect } from '@playwright/test';

test.describe('Editor Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Start at the posts page
    await page.goto('http://localhost:3000/posts');
  });

  test('should create a new post with all tag types', async ({ page }) => {
    // Navigate to editor
    await page.click('button:has-text("Create New Post")');
    
    // Wait for new tab and switch to it
    const newPage = await page.waitForEvent('popup');
    await newPage.waitForLoadState();
    
    // Fill in title
    await newPage.fill('input[placeholder="Post title"]', 'Test Post with Tags');
    
    // Select Format tag
    await newPage.click('button:has-text("Format:")');
    await newPage.click('button:has-text("How-to Guide")');
    
    // Select Industry tags
    await newPage.click('button:has-text("Industry:")');
    await newPage.click('label:has-text("E-commerce")');
    await newPage.click('label:has-text("Healthcare")');
    await newPage.click('body'); // Click outside to close dropdown
    
    // Select Category tags
    await newPage.click('button:has-text("Categories:")');
    await newPage.click('label:has-text("Automation")');
    await newPage.click('label:has-text("API Integration")');
    await newPage.click('body'); // Click outside to close dropdown
    
    // Add content
    await newPage.click('.ProseMirror');
    await newPage.type('.ProseMirror', 'This is a test post content.');
    
    // Save as draft
    await newPage.click('button:has-text("Save Draft")');
    
    // Verify save count appears
    await expect(newPage.locator('text=/Saved 1 time/')).toBeVisible({ timeout: 5000 });
    
    // Test preview mode
    await newPage.click('button:has-text("Preview Post")');
    
    // Verify tags appear in preview
    await expect(newPage.locator('text="How-to Guide"')).toBeVisible();
    await expect(newPage.locator('text="E-commerce"')).toBeVisible();
    await expect(newPage.locator('text="Healthcare"')).toBeVisible();
    await expect(newPage.locator('text="Automation"')).toBeVisible();
    await expect(newPage.locator('text="API Integration"')).toBeVisible();
    
    // Exit preview
    await newPage.click('button:has-text("Edit Post")');
    
    // Save again to increment count
    await newPage.click('button:has-text("Save Draft")');
    await expect(newPage.locator('text=/Saved 2 times/')).toBeVisible({ timeout: 5000 });
  });

  test('should edit existing post and preserve data', async ({ page }) => {
    // First find a draft post to edit
    const draftPost = page.locator('.bg-gray-900').filter({ has: page.locator('text="Draft"') }).first();
    
    // Click edit button on the first draft
    await draftPost.locator('button[title*="Edit"]').click();
    
    // Wait for new tab and switch to it
    const editPage = await page.waitForEvent('popup');
    await editPage.waitForLoadState();
    
    // Wait for content to load
    await editPage.waitForSelector('input[placeholder="Post title"]');
    
    // Verify title is loaded
    const titleInput = editPage.locator('input[placeholder="Post title"]');
    const titleValue = await titleInput.inputValue();
    expect(titleValue).not.toBe('');
    
    // Verify content is loaded
    const content = await editPage.locator('.ProseMirror').textContent();
    expect(content).not.toBe('');
    
    // Update title
    await titleInput.fill(titleValue + ' - Updated');
    
    // Save the update
    await editPage.click('button:has-text("Save Draft")');
    
    // Verify save count incremented
    await expect(editPage.locator('text=/Saved \d+ times/')).toBeVisible({ timeout: 5000 });
  });

  test('should show correct timestamps in post list', async ({ page }) => {
    // Check that drafts are sorted first
    const firstPost = page.locator('.bg-gray-900').first();
    
    // Verify draft badge exists on first post
    await expect(firstPost.locator('text="Draft"')).toBeVisible();
    
    // Verify timestamp format for drafts
    await expect(firstPost.locator('text=/Saved \d+ times, last on/')).toBeVisible();
    
    // Find a published post (if any)
    const publishedPost = page.locator('.bg-gray-900').filter({ 
      has: page.locator('text=/Published on/') 
    }).first();
    
    if (await publishedPost.count() > 0) {
      // Verify published posts don't show save count
      await expect(publishedPost.locator('text=/Saved \d+ times/')).not.toBeVisible();
      // Verify they only show publish date
      await expect(publishedPost.locator('text=/Published on.*\(SGT\)/')).toBeVisible();
    }
  });

  test('should display tags in correct order: Format | Industry | Categories', async ({ page }) => {
    // Navigate to editor
    await page.click('button:has-text("Create New Post")');
    const newPage = await page.waitForEvent('popup');
    await newPage.waitForLoadState();
    
    // Get all tag dropdowns
    const tagDropdowns = newPage.locator('.flex.flex-wrap.gap-4.mb-6 > div');
    
    // Verify order
    const firstDropdown = await tagDropdowns.nth(0).textContent();
    expect(firstDropdown).toContain('Format:');
    
    const secondDropdown = await tagDropdowns.nth(1).textContent();
    expect(secondDropdown).toContain('Industry:');
    
    const thirdDropdown = await tagDropdowns.nth(2).textContent();
    expect(thirdDropdown).toContain('Categories:');
  });
});