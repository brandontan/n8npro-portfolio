import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { AlignableYoutube } from './AlignableYoutube';
import { TwitterExtension } from './editor/TwitterExtension';
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
import { createActivity, updateActivity, getActivity } from '@/lib/activities';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { supabase } from '@/lib/supabase';
import '../styles/tiptap-editor.css';
import '@/styles/editor-alignment.css';
import '@/styles/twitter-embed.css';
import EmojiPicker from './EmojiPicker';
import { formatTags, categoryTags, industryTags } from '@/lib/tagConfig';
import { ChevronDown } from 'lucide-react';
import { RenderContent } from './RenderContent';

interface TipTapEditorProps {
  onSave?: (content: string) => void;
}

// Preview component that uses RenderContent for consistency
const PreviewContent = ({ editor }: { editor: any }) => {
  return (
    <div className="min-h-[400px] py-4 bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <RenderContent 
        content={editor.getHTML()} 
        className="prose prose-lg dark:prose-invert max-w-none px-8"
      />
    </div>
  );
};


export default function TipTapEditor({ onSave }: TipTapEditorProps) {
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get('edit');
  const [activityId, setActivityId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [isPublished, setIsPublished] = useState(false); // Always start as draft
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFormatTag, setSelectedFormatTag] = useState<string>('tutorial');
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<string[]>([]);
  const [selectedIndustryTags, setSelectedIndustryTags] = useState<string[]>([]);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(!!editSlug);
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
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto my-4 block',
        },
      }),
      AlignableYoutube,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
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
      TwitterExtension,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] px-8 py-4 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-2 [&_img[style*="text-align:center"]]:mx-auto [&_img[style*="text-align:right"]]:ml-auto [&_img[style*="text-align:left"]]:mr-auto [&_p[style*="text-align:center"]_img]:mx-auto [&_p[style*="text-align:right"]_img]:ml-auto [&_div[style*="text-align:center"]_iframe]:mx-auto [&_div[style*="text-align:center"]_.youtube-video]:mx-auto [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:my-4',
      },
    },
    onUpdate: () => {
      // Force re-render on any content change to update button states
    },
  });

  // Load existing post if editing
  useEffect(() => {
    if (editSlug && editor) {
      const loadPost = async () => {
        try {
          const activity = await getActivity(editSlug);
          if (activity) {
            setActivityId(activity.id);
            setTitle(activity.title);
            setIsPublished(activity.published);
            setSelectedFormatTag(activity.formatTag);
            setSelectedCategoryTags(activity.categoryTags || []);
            setSelectedIndustryTags(activity.industryTags || []);
            setSaveCount(activity.save_count || 0);
            if (activity.last_saved_at) {
              setLastSavedAt(new Date(activity.last_saved_at));
            }
            editor.commands.setContent(activity.content);
          } else {
            toast.error('Post not found');
          }
        } catch (error) {
          console.error('Failed to load post:', error);
          toast.error('Failed to load post');
        } finally {
          setIsLoading(false);
        }
      };
      loadPost();
    } else {
      setIsLoading(false);
    }
  }, [editSlug, editor]);

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
      if (!target.closest('.format-dropdown') && !target.closest('.category-dropdown') && !target.closest('.industry-dropdown')) {
        setShowFormatDropdown(false);
        setShowCategoryDropdown(false);
        setShowIndustryDropdown(false);
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
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Current session:', session);
        
        if (!session) {
          throw new Error('You must be logged in to upload images');
        }
        
        console.log('File details:', {
          name: file.name,
          type: file.type,
          size: file.size
        });
        
        // Ensure we have a valid MIME type
        let mimeType = file.type;
        if (!mimeType || mimeType === '') {
          // Try to determine from file extension
          const ext = file.name.split('.').pop()?.toLowerCase();
          const mimeMap: Record<string, string> = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp'
          };
          mimeType = mimeMap[ext || ''] || 'image/jpeg';
        }
        
        console.log('Using MIME type:', mimeType);
        
        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')}`;
        const filePath = `${fileName}`;
        
        // Use 'activities' bucket for blog images
        const bucketName = 'activities';
        
        // Try upload without contentType option first
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);
        
        if (uploadError) {
          console.error('Upload error details:', uploadError);
          console.error('Upload error message:', uploadError.message);
          console.error('Upload error status:', uploadError.status);
          console.error('Upload error statusCode:', uploadError.statusCode);
          
          // Check if it's a bucket error
          if (uploadError.message?.includes('not found')) {
            throw new Error('Storage bucket "activities" not found. Please create it in Supabase dashboard.');
          }
          
          // Check if it's an auth error
          if (uploadError.message?.includes('row-level security') || uploadError.statusCode === '403') {
            throw new Error('Upload failed: Storage policies not configured correctly. Please check RLS policies.');
          }
          
          // Check if it's a MIME type error
          if (uploadError.message?.includes('mime type') || uploadError.statusCode === '415') {
            throw new Error('Upload failed: Invalid file type. Only images (PNG, JPEG, GIF, WEBP) are allowed.');
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
        toast.error(error.message || 'Failed to upload image. Please check storage configuration.');
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
    const url = prompt('Enter X/Twitter URL:');
    if (url && editor) {
      // Extract tweet ID from URL
      const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
      if (match) {
        const tweetId = match[1];
        
        // Use the custom Twitter extension command
        editor.chain()
          .focus()
          .setTwitterEmbed(tweetId)
          .run();
      } else {
        toast.error('Invalid Twitter/X URL format');
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
        industryTags: selectedIndustryTags,
        preview: editor?.getText().substring(0, 150) + '...' || '',
        featured_image: featuredImage,
        content,
        published: isPublished,
        // For backward compatibility
        category: 'workflow',
        tags: [...selectedCategoryTags, ...selectedIndustryTags],
      };
      
      console.log('Saving activity:', activityData);
      
      if (activityId) {
        // Update existing activity
        await updateActivity(activityId, {
          title,
          formatTag: selectedFormatTag as any,
          categoryTags: selectedCategoryTags,
          industryTags: selectedIndustryTags,
          preview: editor?.getText().substring(0, 150) + '...' || '',
          featured_image: featuredImage,
          content,
          published: isPublished,
        });
      } else {
        // Create new activity
        const result = await createActivity(activityData);
        setActivityId(result.id);
      }

      // Update local save tracking
      setSaveCount(prev => prev + 1);
      setLastSavedAt(new Date());

      toast.success(isPublished ? 'Post published successfully!' : 'Draft saved successfully!');
      
      if (onSave) {
        onSave(content);
      }
      // Stay on the editor page - no redirect
    } catch (error: unknown) {
      console.error('Save error details:', error);
      
      // More specific error messages
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorCode = (error as any)?.code;
      const errorDetails = (error as any)?.details || '';
      
      console.error('Error message:', errorMessage);
      console.error('Error code:', errorCode);
      console.error('Error details:', errorDetails);
      
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

  if (!editor || isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
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
        <>
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

          {/* Industry dropdown */}
          <div className="relative flex-1 industry-dropdown">
            <button
              onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
              className="w-full flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
            >
              <span className="text-sm text-gray-400">Industry:</span>
              <span className="text-sm font-medium flex-1 truncate">
                {selectedIndustryTags.length > 0 
                  ? selectedIndustryTags.join(', ')
                  : 'Select industry...'}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showIndustryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showIndustryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-30 max-h-64 overflow-y-auto">
                {industryTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndustryTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIndustryTags([...selectedIndustryTags, tag]);
                        } else {
                          setSelectedIndustryTags(selectedIndustryTags.filter(t => t !== tag));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
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
        </div>
      
        {/* Selected Tags Display */}
        {selectedCategoryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-gray-400 mr-2">Categories:</span>
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
        
        {/* Selected Industry Tags Display */}
        {selectedIndustryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs text-gray-400 mr-2">Industries:</span>
            {selectedIndustryTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs"
              >
                {tag}
                <button
                  onClick={() => setSelectedIndustryTags(selectedIndustryTags.filter(t => t !== tag))}
                  className="hover:text-green-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        </>
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
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{title || 'Untitled Post'}</h1>
          
          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mb-6 not-prose">
            {/* Format Tag */}
            {selectedFormatTag && (
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${formatTags[selectedFormatTag as keyof typeof formatTags]?.bgClass} ${formatTags[selectedFormatTag as keyof typeof formatTags]?.textClass}`}>
                {formatTags[selectedFormatTag as keyof typeof formatTags]?.label}
              </span>
            )}
            
            {/* Industry Tags */}
            {selectedIndustryTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs">
                {tag}
              </span>
            ))}
            
            {/* Category Tags */}
            {selectedCategoryTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          {/* Content */}
          <PreviewContent editor={editor} />
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
              onClick={() => {
                const { selection } = editor.state;
                
                // Check if a YouTube video is selected
                if (selection.node && selection.node.type.name === 'alignableYoutube') {
                  editor.chain().focus().updateAttributes('alignableYoutube', { align: 'left' }).run();
                } else {
                  editor.chain().focus().setTextAlign('left').run();
                }
              }}
              className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                const { selection } = editor.state;
                const node = selection.$from.node();
                
                // Check if a YouTube video is selected
                if (selection.node && selection.node.type.name === 'alignableYoutube') {
                  editor.chain().focus().updateAttributes('alignableYoutube', { align: 'center' }).run();
                } else {
                  editor.chain().focus().setTextAlign('center').run();
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
              onClick={() => {
                const { selection } = editor.state;
                
                // Check if a YouTube video is selected
                if (selection.node && selection.node.type.name === 'alignableYoutube') {
                  editor.chain().focus().updateAttributes('alignableYoutube', { align: 'right' }).run();
                } else {
                  editor.chain().focus().setTextAlign('right').run();
                }
              }}
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
              title="Embed X Post"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
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
              Publish Mode
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
          className={`px-6 py-2 text-white rounded-lg font-medium disabled:opacity-50 transition-colors ${
            isPublished 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSaving ? 'Saving...' : isPublished ? 'Publish' : 'Save Draft'}
        </button>
      </div>
      
      {/* Save timestamp display */}
      {lastSavedAt && (
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Saved {saveCount} {saveCount === 1 ? 'time' : 'times'}, last saved at{' '}
          {lastSavedAt.toLocaleString('en-US', {
            timeZone: 'Asia/Singapore',
            dateStyle: 'short',
            timeStyle: 'short'
          })} (SGT)
        </div>
      )}
      
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