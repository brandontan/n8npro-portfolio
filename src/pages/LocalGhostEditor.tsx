import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TipTapEditor from '@/components/TipTapEditor';

export default function LocalGhostEditor() {
  // Always enable dark mode for the editor
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('dark');
    
    // Cleanup function to restore previous state when leaving editor
    return () => {
      // Optional: remove dark class when leaving the editor
      // html.classList.remove('dark');
    };
  }, []);

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
              Modern Editor (TipTap)
            </div>
          </div>
        </div>
      </header>

      {/* TipTap Editor */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        <TipTapEditor />
      </main>
    </div>
  );
}