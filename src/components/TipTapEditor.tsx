import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { AlignableYoutube } from './AlignableYoutube';
import { 
  Bold, 
  Italic, 
  Strikethrough,
  Code,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Minus,
  Highlighter,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Youtube as YoutubeIcon,
  Smile,
  Table,
  CheckSquare,
  FileText,
  Twitter,
  Music,
  Film,
  Package,
  Eye,
  Edit3
} from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { createActivity } from '@/lib/activities';
import { toast } from 'sonner';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { supabase } from '@/lib/supabase';
import '../styles/tiptap-editor.css';
import EmojiPicker from './EmojiPicker';
import { formatTags, categoryTags } from '@/lib/tagConfig';
import { ChevronDown } from 'lucide-react';

interface TipTapEditorProps {
  onSave?: (content: string) => void;
}

export default function TipTapEditor({ onSave }: TipTapEditorProps) {
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFormatTag, setSelectedFormatTag] = useState<string>('tutorial');
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<string[]>([]);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        // Disable extensions we're adding separately
        link: false,
        underline: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing content...',
        emptyEditorClass: 'is-editor-empty',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4',
        },
      }),
      AlignableYoutube,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Underline,
      TaskList.configure({
        HTMLAttributes: {
          class: 'space-y-2',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start gap-2',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] px-8 py-4 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-2 [&_[style*="text-align:center"]_iframe]:mx-auto [&_[style*="text-align:center"]_img]:mx-auto [&_[style*="text-align:center"]_.youtube-video]:mx-auto [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:my-4',
      },
    },
    onUpdate: () => {
      // Force re-render on any content change to update button states
    },
  });

  // Expose editor to window for testing
  useEffect(() => {
    if (editor && typeof window !== 'undefined') {
      (window as any).editor = editor;
    }
  }, [editor]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.format-dropdown') && !target.closest('.category-dropdown')) {
        setShowFormatDropdown(false);
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      // Show loading state
      toast.loading('Uploading image...');
      
      try {
        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')}`;
        const filePath = `${fileName}`;
        
        // Try 'images' bucket first, fallback to 'public' if it doesn't exist
        let bucketName = 'images';
        let { error: uploadError, data: uploadData } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        // If images bucket doesn't exist, try public bucket
        if (uploadError?.message?.includes('not found')) {
          bucketName = 'public';
          const result = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });
          uploadError = result.error;
          uploadData = result.data;
        }
        
        if (uploadError) {
          console.error('Upload error details:', uploadError);
          // Check if it's a bucket error
          if (uploadError.message?.includes('not found')) {
            throw new Error('Storage bucket "images" not found. Please create it in Supabase dashboard.');
          }
          throw uploadError;
        }
        
        // Get public URL from the correct bucket
        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);
        
        // Insert image with public URL
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
        toast.dismiss();
        toast.success('Image uploaded successfully');
      } catch (error: any) {
        console.error('Error uploading image:', error);
        toast.dismiss();
        
        // Silently fallback to base64 if upload fails
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          editor.chain().focus().setImage({ src: dataUrl }).run();
        };
        reader.readAsDataURL(file);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [editor]);

  const addYouTubeVideo = useCallback(() => {
    const url = prompt('Enter YouTube URL:');
    if (url && editor) {
      // Get current alignment from parent node
      const { selection } = editor.state;
      const parentNode = selection.$from.parent;
      const currentAlign = parentNode.attrs.textAlign || 'left';
      
      // Convert YouTube URL to embed URL with cleaner appearance
      let embedUrl = url;
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
      }
      
      editor.chain()
        .focus()
        .setAlignableYoutube({
          src: embedUrl,
          width: 640,
          height: 480,
          align: currentAlign,
        })
        .run();
    }
  }, [editor]);

  const addTweet = useCallback(() => {
    const url = prompt('Enter Tweet URL:');
    if (url && editor) {
      // Extract tweet ID from URL
      const tweetId = url.match(/status\/(\d+)/)?.[1];
      if (tweetId) {
        const embedHtml = `
          <div class="twitter-embed my-6" contenteditable="false">
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Tweet</p>
              <a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>
              <p class="text-xs text-gray-500 mt-2">Twitter embed placeholder - will render on published page</p>
            </div>
          </div>
        `;
        editor.chain().focus().insertContent(embedHtml).run();
      }
    }
  }, [editor]);

  const insertEmoji = useCallback((emoji: string) => {
    if (editor) {
      editor.chain().focus().insertContent(emoji).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    
    // Check if there's selected text
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    
    if (!selectedText) {
      toast.error('Please select some text first');
      return;
    }
    
    const previousUrl = editor.getAttributes('link').href;
    const url = prompt('Enter URL:', previousUrl || 'https://');

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // Make sure URL has protocol
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }

    editor.chain().focus().setLink({ href: finalUrl }).run();
  }, [editor]);

  const handleSave = async () => {
    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    const content = editor?.getHTML() || '';
    if (!content || content === '<p></p>') {
      toast.error('Please add some content');
      return;
    }

    setIsSaving(true);
    try {
      let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      // Add timestamp to slug to ensure uniqueness
      const timestamp = Date.now();
      slug = `${slug}-${timestamp}`;
      
      // Extract first image from content as featured image
      let featuredImage = null;
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch && imgMatch[1]) {
        featuredImage = imgMatch[1];
      }
      
      const activityData = {
        slug,
        title,
        date: new Date().toISOString().split('T')[0],
        formatTag: selectedFormatTag as 'tutorial' | 'case-study' | 'tips-tricks' | 'how-to' | 'best-practices' | 'review' | 'news' | 'series',
        categoryTags: selectedCategoryTags,
        preview: editor?.getText().substring(0, 150) + '...' || '',
        featured_image: featuredImage,
        content,
        published: isPublished,
        // For backward compatibility
        category: 'workflow',
        tags: selectedCategoryTags,
      };
      
      console.log('Saving activity:', activityData);
      
      await createActivity(activityData);

      toast.success('Post saved successfully!');
      
      if (onSave) {
        onSave(content);
      } else {
        // Redirect to activities section
        setTimeout(() => {
          window.location.href = '/#activities';
          // Force scroll to activities section after navigation
          setTimeout(() => {
            const activitiesSection = document.getElementById('activities');
            if (activitiesSection) {
              activitiesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }, 1000);
      }
    } catch (error: unknown) {
      console.error('Save error details:', error);
      
      // More specific error messages
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorCode = (error as any)?.code;
      
      if (errorMessage?.includes('activities') && errorMessage?.includes('does not exist')) {
        toast.error('Database table not found. Please run the migration first.');
      } else if (errorCode === '42P01') {
        toast.error('Activities table does not exist. Check run-migrations.md for setup instructions.');
      } else {
        toast.error(`Failed to save post: ${errorMessage || 'Unknown error'}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-5xl font-bold bg-transparent border-none outline-none mb-8 placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
        style={{ fontFamily: 'Georgia, serif' }}
        disabled={isPreview}
      />

      {/* Tag Selection */}
      {!isPreview && (
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Format Tag Dropdown */}
          <div className="relative format-dropdown">
            <button
              onClick={() => setShowFormatDropdown(!showFormatDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <span className="text-sm text-gray-400">Format:</span>
              <span className="text-sm font-medium">{formatTags[selectedFormatTag as keyof typeof formatTags]?.label}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {showFormatDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                {Object.entries(formatTags).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedFormatTag(key);
                      setShowFormatDropdown(false);
                    }}
                    className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-800 transition-colors ${
                      selectedFormatTag === key ? 'bg-gray-800' : ''
                    }`}
                  >
                    <config.icon className={`h-5 w-5 mt-0.5 ${config.textClass}`} />
                    <div className="text-left">
                      <div className="font-medium">{config.label}</div>
                      <div className="text-xs text-gray-500">{config.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Tags Dropdown */}
          <div className="relative flex-1 category-dropdown">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
            >
              <span className="text-sm text-gray-400">Categories:</span>
              <span className="text-sm font-medium flex-1 truncate">
                {selectedCategoryTags.length > 0 
                  ? selectedCategoryTags.join(', ')
                  : 'Select categories...'}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                {categoryTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategoryTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategoryTags([...selectedCategoryTags, tag]);
                        } else {
                          setSelectedCategoryTags(selectedCategoryTags.filter(t => t !== tag));
                        }
                      }}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Selected Tags Display */}
          {selectedCategoryTags.length > 0 && (
            <div className="w-full flex flex-wrap gap-2">
              {selectedCategoryTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs"
                >
                  {tag}
                  <button
                    onClick={() => setSelectedCategoryTags(selectedCategoryTags.filter(t => t !== tag))}
                    className="hover:text-purple-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {isPreview ? (
        /* Preview Mode */
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            className="min-h-[400px] px-8 py-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 [&_iframe]:rounded-lg [&_iframe]:overflow-hidden [&_iframe]:my-4 [&_.youtube-wrapper]:my-4"
          />
        </div>
      ) : (
        <>
          {/* Modern Toolbar */}
          <div className="mb-4 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Formatting Row */}
        <div className="flex flex-wrap items-center gap-1 p-1 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('highlight') ? 'bg-yellow-200 dark:bg-yellow-700' : ''
              }`}
              title="Highlight"
            >
              <Highlighter className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('code') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Inline Code"
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              onClick={setLink}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
          </div>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          
          {/* Text Alignment */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                editor.chain().focus().setTextAlign('center').run();
                // Also update any selected YouTube videos
                const { selection } = editor.state;
                const node = selection.$from.node();
                if (node && node.type.name === 'alignableYoutube') {
                  editor.chain().updateAttributes('alignableYoutube', { align: 'center' }).run();
                }
              }}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Blocks Row */}
        <div className="flex flex-wrap items-center gap-1 p-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                console.log('H1 button clicked');
                console.log('Selection before:', editor.state.selection);
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                console.log('H1 applied');
              }}
              className={`px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium ${
                editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Heading 1"
              type="button"
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium ${
                editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium ${
                editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Heading 3"
            >
              H3
            </button>
          </div>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('taskList') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Task List"
            >
              <CheckSquare className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                console.log('Quote button clicked');
                editor.chain().focus().toggleBlockquote().run();
                console.log('Blockquote active:', editor.isActive('blockquote'));
              }}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Quote"
              type="button"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Code Block"
            >
              <FileText className="h-4 w-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Divider"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          
          {/* Media */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Add Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <button
              onClick={addYouTubeVideo}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Add YouTube Video"
            >
              <YoutubeIcon className="h-4 w-4" />
            </button>
            <button
              onClick={addTweet}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Embed Tweet"
            >
              <Twitter className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowEmojiPicker(true)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Insert Emoji"
            >
              <Smile className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

          {/* Editor Container */}
          <div className="relative bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            {/* Editor Content */}
            <EditorContent editor={editor} />
          </div>
        </>
      )}

      {/* Preview Toggle - Centered at bottom of editor */}
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all transform hover:scale-105"
        >
          {isPreview ? (
            <>
              <Edit3 className="h-5 w-5" />
              Back to Editor
            </>
          ) : (
            <>
              <Eye className="h-5 w-5" />
              Preview Post
            </>
          )}
        </button>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex items-center justify-between">
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

          <button
            onClick={() => window.open('/posts', '_blank')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Manage Posts
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Post'}
        </button>
      </div>
      
      {/* Emoji Picker Modal */}
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={insertEmoji}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
}