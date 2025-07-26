# Manual Test Instructions for Bulk Delete Bug

## Steps:

1. Open browser console (F12)
2. Go to http://localhost:3000/posts
3. Watch the console for these logs:
   - 🟢 "Initializing selectedPosts as empty array"
   - 📊 "selectedPosts updated: []"
   
4. Click ONE checkbox and watch for:
   - 🔵 "togglePostSelection called with: [ID]"
   - 🔵 "Previous state: []"
   - 🔵 "Adding, new state: [ID]"
   - 📊 "selectedPosts updated: [ID]"

5. Click "Delete Selected" and watch for:
   - 🔴 "Delete button clicked"
   - 🔴 "selectedPosts at click time: [?]"
   - 🔴 "selectedPosts.length: ?"
   - ⚠️ "handleBulkDelete called with: [?]"

## What to Look For:

The key is to see WHERE selectedPosts changes from 1 item to 7 items:
- Does it happen right after clicking the checkbox?
- Does it happen when clicking Delete?
- Is there any unexpected state update?

Please share the full console output!