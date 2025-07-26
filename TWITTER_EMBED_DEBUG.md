# Twitter Embed Double Display Issue - Debug Guide

## Current Problem
When adding a Twitter/X embed in the editor, it shows TWICE:
1. Once from the editor's NodeView component
2. Once from RenderContent component

## What We Tried (Failed)
- Added `data-processed` markers - didn't work
- Added `data-tweet-processed` attributes - didn't work
- Improved script loading - didn't fix the core issue

## Root Cause Analysis

### How It Currently Works:
1. **In Editor Mode**:
   - TwitterExtension creates a NodeView
   - NodeView renders TwitterEmbedScript component
   - TwitterEmbedScript loads Twitter widget and creates tweet

2. **In Preview Mode**:
   - Editor calls `getHTML()` which returns placeholder divs
   - PreviewContent passes HTML to RenderContent
   - RenderContent finds placeholders and creates tweets AGAIN

3. **Result**: TWO tweets because both systems are rendering

## Potential Solutions

### Solution 1: Conditional Rendering in NodeView
Make TwitterNodeView check if it's in preview mode and NOT render:
```typescript
const TwitterNodeView = ({ node, editor }: { node: any, editor: any }) => {
  // Check if we're in preview mode somehow
  const isPreview = /* need to determine this */;
  
  if (isPreview) {
    return null; // Don't render in preview
  }
  
  return <TwitterEmbedScript tweetId={node.attrs.tweetId} />;
};
```

### Solution 2: Skip Already-Rendered Tweets in RenderContent
Make RenderContent detect if a tweet is already rendered:
```typescript
// In RenderContent
const twitterEmbeds = containerRef.current.querySelectorAll('[data-twitter-embed]');
twitterEmbeds.forEach((embed) => {
  // Check if there's already an iframe nearby
  const existingTweet = embed.parentElement?.querySelector('iframe[id*="twitter-widget"]');
  if (existingTweet) return; // Skip this one
  
  // Otherwise render the tweet
});
```

### Solution 3: Different Rendering Strategies
- Editor: Show TwitterEmbedScript (interactive)
- Preview: Show static preview or use RenderContent
- Saved: Use RenderContent only

### Solution 4: Hide Editor Content in Preview
When switching to preview mode, completely hide the editor div and only show RenderContent.

## Quick Test Script
```javascript
// In browser console when issue occurs:
const tweets = document.querySelectorAll('iframe[id*="twitter-widget"]');
console.log('Number of tweet iframes:', tweets.length);
tweets.forEach((tweet, i) => {
  console.log(`Tweet ${i+1}:`, tweet.parentElement);
});
```

## Next Steps for Claude
1. First, verify the issue is still happening
2. Check browser console for any errors
3. Inspect the DOM to see where both tweets are coming from
4. Implement one of the solutions above
5. Test thoroughly in both edit and preview modes