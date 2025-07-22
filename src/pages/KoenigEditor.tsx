import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createActivity } from '@/lib/activities';
import { toast } from 'sonner';

// Since Koenig is complex to integrate, let's create a Ghost-like editor experience
export default function KoenigEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load Koenig dynamically
  useEffect(() => {
    // @ts-ignore
    if (window.KoenigLexical) {
      console.log('Koenig loaded');
    }
  }, []);

  const handleSave = async () => {
    if (!title) {
      toast.error('Please enter a title');
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
        tags: ['local-post'],
        preview: content.substring(0, 150) + '...',
        featured_image: null,
        content,
        published: isPublished,
      });

      toast.success('Post saved locally!');
      
      // Redirect to activities
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Ghost-like Header */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Local Editor
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPublished(!isPublished)}
              className="text-sm"
            >
              {isPublished ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {isPublished ? 'Published' : 'Draft'}
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Ghost-like Editor */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <article className="bg-white dark:bg-gray-950 rounded-lg shadow-sm">
          <div className="p-12">
            {/* Title */}
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-5xl font-bold bg-transparent border-none outline-none mb-8 placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-gray-100"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            
            {/* Content Editor */}
            <div className="min-h-[400px]">
              <div className="relative">
                <textarea
                  placeholder="Begin writing your post..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[400px] text-lg leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-800 dark:text-gray-200"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
                
                {/* Ghost-like toolbar hint */}
                <div className="absolute bottom-0 left-0 text-sm text-gray-400 dark:text-gray-600">
                  Type / for commands
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Settings Panel (Ghost-like) */}
        <div className="mt-8 bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Post Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">URL</label>
              <div className="mt-1 text-sm text-gray-500">
                /activities/{title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled'}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Publish date</label>
              <div className="mt-1 text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}