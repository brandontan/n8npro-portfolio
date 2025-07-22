import { useState, useEffect, useRef } from 'react';
import { createActivity } from '@/lib/activities';
import { toast } from 'sonner';
import { Bold, Italic, Quote, Code, Image, List, ToggleLeft, Minus, Link, Hash, FileText, Calendar, Youtube, Twitter, Bookmark, Map, Table, AlertCircle, CheckSquare, FileCode, Globe, Music, Film, Package, Zap, Heart, Star, Flag, ArrowRight, Copy, Download, Upload, Database, Terminal, Palette, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

// Ghost-like rich text editor using contentEditable with formatting support
export default function GhostLikeEditor() {
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showFormatting, setShowFormatting] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize placeholder
  useEffect(() => {
    if (editorRef.current && isEmpty && !editorRef.current.textContent) {
      editorRef.current.innerHTML = '<p class="text-gray-400">Begin writing your post...</p>';
    }
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showFormatting && !e.target?.closest('.formatting-menu')) {
        setShowFormatting(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showFormatting]);

  // Apply formatting
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    setShowFormatting(false);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        insertBlock('image', dataUrl);
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Insert block
  const insertBlock = (type: string, data?: string) => {
    let html = '';
    const timestamp = new Date().toLocaleTimeString();
    
    switch (type) {
      case 'heading1':
        html = '<h1 class="text-4xl font-bold my-4 text-gray-900 dark:text-gray-100">Heading 1</h1><p><br></p>';
        break;
      case 'heading2':
        html = '<h2 class="text-3xl font-bold my-4 text-gray-900 dark:text-gray-100">Heading 2</h2><p><br></p>';
        break;
      case 'heading3':
        html = '<h3 class="text-2xl font-bold my-4 text-gray-900 dark:text-gray-100">Heading 3</h3><p><br></p>';
        break;
      case 'quote':
        html = '<blockquote class="border-l-4 border-purple-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">Enter quote...</blockquote><p><br></p>';
        break;
      case 'code':
        html = '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm text-gray-900 dark:text-gray-100"><code>// Enter code...</code></pre><p><br></p>';
        break;
      case 'divider':
        html = '<hr class="my-8 border-gray-300 dark:border-gray-700" /><p><br></p>';
        break;
      case 'image':
        if (data) {
          html = `<figure class="my-6"><img src="${data}" alt="Image" class="w-full rounded-lg" /><figcaption contenteditable="true" class="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Click to add caption...</figcaption></figure><p><br></p>`;
        }
        break;
      case 'toggle':
        html = '<details class="my-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4"><summary class="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">Toggle heading</summary><p class="mt-2 text-gray-700 dark:text-gray-300">Hidden content...</p></details><p><br></p>';
        break;
      case 'list':
        html = '<ul class="list-disc list-inside my-4 space-y-2 text-gray-900 dark:text-gray-100"><li>First item</li><li>Second item</li></ul><p><br></p>';
        break;
      case 'numbered-list':
        html = '<ol class="list-decimal list-inside my-4 space-y-2 text-gray-900 dark:text-gray-100"><li>First item</li><li>Second item</li></ol><p><br></p>';
        break;
      case 'callout':
        html = `<div class="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"><p class="text-blue-900 dark:text-blue-200 font-medium">💡 Callout</p><p class="text-blue-800 dark:text-blue-300 mt-1">Add your callout text here...</p></div><p><br></p>`;
        break;
      case 'timestamp':
        html = `<span class="text-gray-500 dark:text-gray-400 text-sm">${timestamp}</span> `;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          const text = prompt('Enter link text:') || url;
          html = `<a href="${url}" class="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">${text}</a> `;
        }
        break;
      case 'youtube':
        const youtubeUrl = prompt('Enter YouTube URL:');
        if (youtubeUrl) {
          const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
          if (videoId) {
            html = `<div class="my-6" contenteditable="false"><div class="relative rounded-lg overflow-hidden" style="padding-bottom: 56.25%; background: #000;"><iframe src="https://www.youtube.com/embed/${videoId}" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div><p><br></p>`;
          }
        }
        break;
      case 'twitter':
        const tweetUrl = prompt('Enter Tweet URL:');
        if (tweetUrl) {
          html = `<div class="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"><p class="text-sm text-gray-600 dark:text-gray-400">Tweet: ${tweetUrl}</p></div><p><br></p>`;
        }
        break;
      case 'bookmark':
        const bookmarkUrl = prompt('Enter URL to bookmark:');
        if (bookmarkUrl) {
          html = `<div class="my-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"><a href="${bookmarkUrl}" class="flex items-center gap-3"><div class="flex-shrink-0"><Globe class="h-8 w-8 text-gray-400" /></div><div class="flex-1"><p class="font-semibold text-gray-900 dark:text-gray-100">${bookmarkUrl}</p><p class="text-sm text-gray-600 dark:text-gray-400">Click to visit</p></div></a></div><p><br></p>`;
        }
        break;
      case 'button':
        const btnText = prompt('Button text:') || 'Click me';
        const btnUrl = prompt('Button URL:') || '#';
        html = `<div class="my-6"><a href="${btnUrl}" class="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">${btnText}</a></div><p><br></p>`;
        break;
      case 'html':
        const customHtml = prompt('Enter custom HTML:');
        if (customHtml) {
          html = `<div class="my-6">${customHtml}</div><p><br></p>`;
        }
        break;
      case 'table':
        html = `<table class="my-6 w-full border-collapse"><thead><tr class="border-b border-gray-300 dark:border-gray-700"><th class="text-left p-2 font-semibold text-gray-900 dark:text-gray-100">Header 1</th><th class="text-left p-2 font-semibold text-gray-900 dark:text-gray-100">Header 2</th><th class="text-left p-2 font-semibold text-gray-900 dark:text-gray-100">Header 3</th></tr></thead><tbody><tr class="border-b border-gray-200 dark:border-gray-800"><td class="p-2 text-gray-700 dark:text-gray-300">Cell 1</td><td class="p-2 text-gray-700 dark:text-gray-300">Cell 2</td><td class="p-2 text-gray-700 dark:text-gray-300">Cell 3</td></tr></tbody></table><p><br></p>`;
        break;
      case 'gallery':
        html = `<div class="my-6 grid grid-cols-2 md:grid-cols-3 gap-4"><div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">Image 1</div><div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">Image 2</div><div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">Image 3</div></div><p><br></p>`;
        break;
      case 'audio':
        const audioUrl = prompt('Enter audio URL:');
        if (audioUrl) {
          html = `<div class="my-6"><audio controls class="w-full"><source src="${audioUrl}" type="audio/mpeg">Your browser does not support audio.</audio></div><p><br></p>`;
        }
        break;
      case 'video':
        const videoUrl = prompt('Enter video URL:');
        if (videoUrl) {
          html = `<div class="my-6"><video controls class="w-full rounded-lg"><source src="${videoUrl}" type="video/mp4">Your browser does not support video.</video></div><p><br></p>`;
        }
        break;
      case 'file':
        const fileName = prompt('Enter file name:') || 'document.pdf';
        html = `<div class="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center gap-3"><FileText class="h-8 w-8 text-gray-500" /><div><p class="font-medium text-gray-900 dark:text-gray-100">${fileName}</p><p class="text-sm text-gray-600 dark:text-gray-400">Click to download</p></div></div><p><br></p>`;
        break;
      case 'product':
        const productName = prompt('Product name:') || 'Amazing Product';
        const productPrice = prompt('Price:') || '$99';
        html = `<div class="my-6 p-6 border border-gray-300 dark:border-gray-700 rounded-lg"><h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">${productName}</h3><p class="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">${productPrice}</p><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Buy Now</button></div><p><br></p>`;
        break;
      case 'nft':
        html = `<div class="my-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white"><p class="font-bold mb-2">NFT Embed</p><p class="text-sm opacity-90">Connect your NFT here</p></div><p><br></p>`;
        break;
      case 'email':
        const email = prompt('Enter email for signup:') || 'your@email.com';
        html = `<div class="my-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"><p class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Subscribe to newsletter</p><div class="flex gap-2"><input type="email" placeholder="${email}" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900" /><button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Subscribe</button></div></div><p><br></p>`;
        break;
    }

    if (html) {
      document.execCommand('insertHTML', false, html);
      setShowFormatting(false);
    }
  };

  // Handle input
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent || '';
      const hasContent = textContent.trim() !== '';
      setIsEmpty(!hasContent);
      
      // Clear placeholder if user starts typing
      if (content.includes('Begin writing your post...') && textContent.replace('Begin writing your post...', '').trim() !== '') {
        editorRef.current.innerHTML = editorRef.current.innerHTML.replace('<p class="text-gray-400">Begin writing your post...</p>', '');
      }
    }
  };

  // Handle focus
  const handleFocus = () => {
    if (editorRef.current?.innerHTML.includes('Begin writing your post...')) {
      editorRef.current.innerHTML = '';
      setIsEmpty(true);
    }
  };

  // Handle blur
  const handleBlur = () => {
    if (editorRef.current && !editorRef.current.textContent?.trim()) {
      editorRef.current.innerHTML = '<p class="text-gray-400">Begin writing your post...</p>';
      setIsEmpty(true);
    }
  };

  // Handle key press for slash commands
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === '/') {
      // Get caret position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorRef.current?.getBoundingClientRect();
        
        if (editorRect) {
          setMenuPosition({
            top: rect.bottom - editorRect.top + 10,
            left: rect.left - editorRect.left
          });
          setShowFormatting(true);
        }
      }
    }
  };

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && showFormatting) {
      setShowFormatting(false);
    }
  };

  const handleSave = async () => {
    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    const content = editorRef.current?.innerHTML || '';
    if (!content || content.includes('Begin writing your post...')) {
      toast.error('Please add some content');
      return;
    }

    setIsSaving(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      await createActivity({
        slug,
        title,
        date: new Date().toISOString().split('T')[0],
        category: 'workflow',
        tags: ['ghost-editor', 'local'],
        preview: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        featured_image: null,
        content: content,
        published: isPublished,
      });

      toast.success('Post saved locally!');
      
      setTimeout(() => {
        window.location.href = '/#activities';
      }, 1000);
    } catch (error) {
      toast.error('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-5xl font-bold bg-transparent border-none outline-none mb-8 placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
        style={{ fontFamily: 'Georgia, serif' }}
      />

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Content Editor */}
      <div className="min-h-[400px] relative">
        <div
          ref={editorRef}
          contentEditable
          className="w-full min-h-[400px] text-lg leading-relaxed bg-transparent border-none outline-none resize-none text-gray-800 dark:text-gray-200 focus:outline-none [&_*]:text-gray-800 [&_*]:dark:text-gray-200"
          style={{ fontFamily: 'Georgia, serif' }}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />

        {/* Formatting menu - Positioned at cursor */}
        {showFormatting && (
          <div 
            className="formatting-menu absolute z-50 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-sm"
            style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">Basic</div>
            <div className="space-y-1">
              <button
                onClick={() => insertBlock('heading1')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Hash className="h-4 w-4" />
                <div>
                  <div className="font-medium">Heading 1</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Big section heading</div>
                </div>
              </button>
              <button
                onClick={() => insertBlock('heading2')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Hash className="h-4 w-4" />
                <div>
                  <div className="font-medium">Heading 2</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Medium section heading</div>
                </div>
              </button>
              <button
                onClick={() => insertBlock('heading3')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Hash className="h-4 w-4" />
                <div>
                  <div className="font-medium">Heading 3</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Small section heading</div>
                </div>
              </button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1 mt-3">Formatting</div>
            <div className="space-y-1">
              <button
                onClick={() => applyFormat('bold')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Bold className="h-4 w-4" />
                <span>Bold</span>
              </button>
              <button
                onClick={() => applyFormat('italic')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Italic className="h-4 w-4" />
                <span>Italic</span>
              </button>
              <button
                onClick={() => insertBlock('link')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Link className="h-4 w-4" />
                <span>Link</span>
              </button>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1 mt-3">Blocks</div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Image className="h-4 w-4" />
                <div>
                  <div className="font-medium">Image</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Upload from your computer</div>
                </div>
              </button>
              <button
                onClick={() => insertBlock('gallery')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Image className="h-4 w-4" />
                <span>Gallery</span>
              </button>
              <button
                onClick={() => insertBlock('quote')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Quote className="h-4 w-4" />
                <span>Quote</span>
              </button>
              <button
                onClick={() => insertBlock('list')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <List className="h-4 w-4" />
                <span>Bulleted list</span>
              </button>
              <button
                onClick={() => insertBlock('numbered-list')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <List className="h-4 w-4" />
                <span>Numbered list</span>
              </button>
              <button
                onClick={() => insertBlock('code')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Code className="h-4 w-4" />
                <span>Code block</span>
              </button>
              <button
                onClick={() => insertBlock('toggle')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <ToggleLeft className="h-4 w-4" />
                <span>Toggle</span>
              </button>
              <button
                onClick={() => insertBlock('callout')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Callout</span>
              </button>
              <button
                onClick={() => insertBlock('table')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Table className="h-4 w-4" />
                <span>Table</span>
              </button>
              <button
                onClick={() => insertBlock('button')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <ArrowRight className="h-4 w-4" />
                <span>Button</span>
              </button>
              <button
                onClick={() => insertBlock('divider')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Minus className="h-4 w-4" />
                <span>Divider</span>
              </button>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1 mt-3">Embeds</div>
              
              <button
                onClick={() => insertBlock('youtube')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Youtube className="h-4 w-4" />
                <span>YouTube</span>
              </button>
              <button
                onClick={() => insertBlock('twitter')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => insertBlock('bookmark')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Bookmark className="h-4 w-4" />
                <span>Bookmark</span>
              </button>
              <button
                onClick={() => insertBlock('audio')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Music className="h-4 w-4" />
                <span>Audio</span>
              </button>
              <button
                onClick={() => insertBlock('video')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Film className="h-4 w-4" />
                <span>Video</span>
              </button>
              <button
                onClick={() => insertBlock('file')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <FileText className="h-4 w-4" />
                <span>File</span>
              </button>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-1 mt-3">Special</div>
              
              <button
                onClick={() => insertBlock('product')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Package className="h-4 w-4" />
                <span>Product</span>
              </button>
              <button
                onClick={() => insertBlock('email')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Globe className="h-4 w-4" />
                <span>Email signup</span>
              </button>
              <button
                onClick={() => insertBlock('nft')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Zap className="h-4 w-4" />
                <span>NFT</span>
              </button>
              <button
                onClick={() => insertBlock('html')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <FileCode className="h-4 w-4" />
                <span>HTML</span>
              </button>
              <button
                onClick={() => insertBlock('timestamp')}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-left"
              >
                <Calendar className="h-4 w-4" />
                <span>Timestamp</span>
              </button>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                Press <kbd className="px-1 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd> to close
              </div>
            </div>
          </div>
        )}

        {/* Ghost-like toolbar hint */}
        {!showFormatting && !isEmpty && (
          <div className="absolute bottom-0 left-0 text-sm text-gray-400 dark:text-gray-600 pointer-events-none">
            Type / to insert...
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isPublished ? 'Published' : 'Draft'}
            </span>
          </label>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </div>
  );
}