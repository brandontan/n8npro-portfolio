import { test, expect } from '@playwright/test';

test.describe('TipTap Editor Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/editor');
    await page.waitForSelector('.ProseMirror');
  });

  test('H1 heading formatting works', async ({ page }) => {
    // Type some text
    await page.locator('.ProseMirror').click();
    await page.keyboard.type('This should be a heading');
    
    // Select all text
    await page.keyboard.press('Control+A');
    
    // Click H1 button
    await page.click('button[title="Heading 1"]');
    
    // Verify H1 is applied
    const h1Element = await page.locator('.ProseMirror h1');
    await expect(h1Element).toBeVisible();
    await expect(h1Element).toHaveText('This should be a heading');
  });

  test('Bold formatting works', async ({ page }) => {
    await page.locator('.ProseMirror').click();
    // Clear any existing content first
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    
    await page.keyboard.type('This text will be bold');
    
    // Triple click to select all
    await page.locator('.ProseMirror').click({ clickCount: 3 });
    await page.click('button[title="Bold (Ctrl+B)"]');
    
    // Verify bold is applied
    const strongElement = await page.locator('.ProseMirror strong');
    await expect(strongElement).toBeVisible();
    await expect(strongElement).toHaveText('This text will be bold');
  });

  test('Image upload button exists and is clickable', async ({ page }) => {
    const imageButton = page.locator('button[title="Add Image"]');
    await expect(imageButton).toBeVisible();
    
    // Click should trigger file input (hidden)
    await imageButton.click();
    const fileInput = page.locator('input[type="file"][accept="image/*"]');
    await expect(fileInput).toBeAttached();
  });

  test('YouTube embed works', async ({ page }) => {
    // Mock the prompt dialog
    await page.evaluate(() => {
      window.prompt = () => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
    
    await page.click('button[title="Add YouTube Video"]');
    
    // Verify YouTube iframe is inserted
    await page.waitForTimeout(500);
    const content = await page.locator('.ProseMirror').innerHTML();
    expect(content).toContain('iframe');
  });

  test('Preview mode toggles correctly', async ({ page }) => {
    // Add some content
    await page.locator('.ProseMirror').click();
    await page.keyboard.type('Test content for preview');
    
    // Click preview button
    const previewButton = page.locator('button:has-text("Preview Post")');
    await expect(previewButton).toBeVisible();
    await previewButton.click();
    
    // Verify editor is hidden and preview is shown
    await expect(page.locator('.ProseMirror')).not.toBeVisible();
    await expect(page.locator('button:has-text("Back to Editor")')).toBeVisible();
    
    // Verify content is displayed in preview
    const previewContent = page.locator('.prose');
    await expect(previewContent).toContainText('Test content for preview');
  });

  test('Save post validation works', async ({ page }) => {
    // Try to save without title
    await page.click('button:has-text("Save Post")');
    
    // Should show error toast - wait for it with a more flexible selector
    await page.waitForSelector('[data-sonner-toast], .sonner-toast, [role="status"]', { timeout: 2000 });
    const toastText = await page.locator('[data-sonner-toast], .sonner-toast, [role="status"]').first().textContent();
    expect(toastText).toContain('Please enter a title');
    
    // Dismiss toast
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Add title but no content
    await page.fill('input[placeholder="Post title"]', 'Test Post');
    await page.click('button:has-text("Save Post")');
    
    // Should show content error
    await page.waitForSelector('[data-sonner-toast], .sonner-toast, [role="status"]', { timeout: 2000 });
    const toastText2 = await page.locator('[data-sonner-toast], .sonner-toast, [role="status"]').first().textContent();
    expect(toastText2).toContain('Please add some content');
  });

  test('All formatting buttons are visible and clickable', async ({ page }) => {
    const buttons = [
      { title: 'Bold (Ctrl+B)', text: 'Bold text' },
      { title: 'Italic (Ctrl+I)', text: 'Italic text' },
      { title: 'Underline (Ctrl+U)', text: 'Underlined text' },
      { title: 'Strikethrough', text: 'Strikethrough text' },
      { title: 'Highlight', text: 'Highlighted text' },
      { title: 'Inline Code', text: 'Code text' },
    ];
    
    for (const button of buttons) {
      // Type text
      await page.locator('.ProseMirror').click();
      await page.keyboard.type(button.text);
      
      // Select and format
      await page.keyboard.press('Control+A');
      await page.click(`button[title="${button.title}"]`);
      
      // Clear for next test
      await page.keyboard.press('Delete');
    }
  });

  test('List formatting works', async ({ page }) => {
    await page.locator('.ProseMirror').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    
    // Click bullet list button first, then type
    await page.click('button[title="Bullet List"]');
    await page.keyboard.type('Item 1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Item 2');
    
    // Verify bullet list structure
    const bulletList = await page.locator('.ProseMirror ul');
    await expect(bulletList).toBeVisible();
    const listItems = await page.locator('.ProseMirror ul li').count();
    expect(listItems).toBe(2);
  });

  test('Task list works', async ({ page }) => {
    await page.locator('.ProseMirror').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    
    await page.click('button[title="Task List"]');
    await page.keyboard.type('Task 1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Task 2');
    
    // Verify checkboxes exist
    const checkboxes = await page.locator('.ProseMirror input[type="checkbox"]').count();
    expect(checkboxes).toBe(2);
  });

  test('Code block formatting works', async ({ page }) => {
    await page.locator('.ProseMirror').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    
    await page.click('button[title="Code Block"]');
    await page.keyboard.type('const hello = "world";');
    
    // Verify code block exists - check for pre tag
    const codeBlock = await page.locator('.ProseMirror pre');
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('const hello = "world";');
  });
});

// Visual regression test
test.describe('Visual Regression', () => {
  test('editor screenshot matches baseline', async ({ page }) => {
    await page.goto('http://localhost:3000/editor');
    await page.waitForSelector('.ProseMirror');
    
    // Add some content for consistent screenshot
    await page.locator('.ProseMirror').click();
    await page.keyboard.type('# Heading 1\n\nSome **bold** and *italic* text.\n\n- List item 1\n- List item 2');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('tiptap-editor.png', {
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 800 }
    });
  });
});