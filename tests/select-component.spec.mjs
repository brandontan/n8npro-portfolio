import { test, expect } from '@playwright/test';

test.describe('TalentMarketplace Select Components', () => {
  test('should load without SelectItem errors', async ({ page }) => {
    // Navigate to the talent marketplace page
    await page.goto('http://localhost:8080/talent');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page loads without console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Wait a bit for any potential errors to appear
    await page.waitForTimeout(2000);
    
    // Verify no SelectItem errors
    const selectErrors = consoleErrors.filter(error => 
      error.includes('Select.Item') || error.includes('empty string')
    );
    
    expect(selectErrors).toHaveLength(0);
    
    // Verify the page content loads
    await expect(page.locator('h1')).toContainText('Discover Top n8n Talent');
    
    // Test that Select components are functional (Radix UI Select components)
    const budgetSelect = page.locator('[role="combobox"]').first();
    await expect(budgetSelect).toBeVisible();
  });
  
  test('should filter talent correctly', async ({ page }) => {
    await page.goto('http://localhost:8080/talent');
    await page.waitForLoadState('networkidle');
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Sarah');
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    // Verify filtered results (use first instance)
    await expect(page.locator('text=Sarah Chen').first()).toBeVisible();
  });
}); 