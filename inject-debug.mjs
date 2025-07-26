import { chromium } from 'playwright';

async function injectDebug() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Injecting debug code into PostManager\n');
  
  try {
    // Navigate to posts
    await page.goto('http://localhost:3000/posts');
    await page.waitForTimeout(2000);
    
    // Skip auth check for now - assume logged in
    
    // Inject debugging code
    await page.evaluate(() => {
      // Override the confirm function to capture the message
      const originalConfirm = window.confirm;
      window.confirm = (message) => {
        console.error('CONFIRM DIALOG:', message);
        
        // Extract the number
        const match = message.match(/(\d+) post\(s\)/);
        if (match) {
          const count = parseInt(match[1]);
          console.error('POST COUNT IN DIALOG:', count);
        }
        
        // Return false to cancel
        return false;
      };
      
      // Try to find React component instance
      const findReactState = () => {
        const elements = document.querySelectorAll('[class*="PostManager"], .bg-gray-800\\/50');
        console.log('Found elements:', elements.length);
        
        // Look for React fiber
        for (const el of elements) {
          const keys = Object.keys(el);
          const reactKey = keys.find(key => key.startsWith('__reactFiber'));
          if (reactKey) {
            console.log('Found React fiber on element');
            let fiber = el[reactKey];
            
            // Walk up the tree
            while (fiber) {
              if (fiber.memoizedState) {
                console.log('Fiber has memoizedState');
                
                // Check if this is our component
                if (fiber.elementType && fiber.elementType.name === 'PostManager') {
                  console.log('Found PostManager component!');
                  return fiber;
                }
              }
              fiber = fiber.return;
            }
          }
        }
        return null;
      };
      
      const component = findReactState();
      if (component) {
        console.log('React component found:', component);
      }
    });
    
    // Count posts
    const postCount = await page.locator('.bg-gray-800\\/50').count();
    console.log(`Posts on page: ${postCount}`);
    
    // Find and click first checkbox
    const firstCheckbox = await page.locator('button').filter({ 
      has: page.locator('svg.h-5.w-5') 
    }).first();
    
    // Click with logging
    await page.evaluate((el) => {
      console.log('About to click checkbox');
      el.click();
    }, await firstCheckbox.elementHandle());
    
    await page.waitForTimeout(1000);
    
    // Check what selectedPosts contains
    const selectedInfo = await page.evaluate(() => {
      // Try to access React DevTools if available
      if (window.$r) {
        console.log('React DevTools available');
        return { devtools: true };
      }
      
      // Check localStorage or any global state
      return {
        localStorage: Object.keys(localStorage),
        hasReactDevTools: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__
      };
    });
    
    console.log('Page info:', selectedInfo);
    
    // Click Delete Selected
    const deleteButton = await page.locator('button:has-text("Delete Selected")').first();
    if (await deleteButton.isVisible()) {
      console.log('\nClicking Delete Selected...');
      await deleteButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Check console for our injected logs
    const logs = await page.evaluate(() => {
      return window.__capturedLogs || [];
    });
    
    console.log('Captured logs:', logs);
    
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\nKeeping browser open for inspection...');
  console.log('Check the browser console for CONFIRM DIALOG message');
  console.log('Press Enter to close...');
  
  await new Promise(resolve => process.stdin.once('data', resolve));
  await browser.close();
}

injectDebug().catch(console.error);