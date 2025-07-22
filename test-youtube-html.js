// Test script to verify YouTube HTML generation
const html = `
<div data-youtube-video="" class="youtube-wrapper" style="display: flex; justify-content: center;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="640" height="480" class="rounded-lg overflow-hidden my-4 mx-auto" frameborder="0" allowfullscreen="true"></iframe>
</div>
`;

console.log("Expected HTML output for centered YouTube video:");
console.log(html);
console.log("\nThis HTML should render an iframe in preview mode.");