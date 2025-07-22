import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Ghost as GhostIcon, Calendar, Clock, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getPosts, type GhostPost } from '@/lib/ghost';

const categoryColors: Record<string, string> = {
  'news': 'bg-blue-500/10 text-blue-600',
  'tutorial': 'bg-green-500/10 text-green-600',
  'case-study': 'bg-purple-500/10 text-purple-600',
  'workflow': 'bg-orange-500/10 text-orange-600',
  'update': 'bg-pink-500/10 text-pink-600',
};

export default function GhostBlogLive() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const ghostPosts = await getPosts(12);
        setPosts(ghostPosts);
        setError(null);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Failed to load posts. Please check your Ghost configuration.');
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GhostIcon className="h-4 w-4" />
              <span>Live from ai-flows.ghost.io</span>
            </div>
            <Link to="/blog/setup">
              <Button
                variant="outline"
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Setup Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">AIFlows Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Insights on automation, AI integration, and workflow optimization
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2">
                <span className="mr-2">🔴</span>
                Live Content from Ghost CMS
              </Badge>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading posts from Ghost...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => window.open(post.url, '_blank')}
                >
                  {post.feature_image && (
                    <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={post.feature_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.primary_tag && (
                        <Badge className={categoryColors[post.primary_tag.slug] || 'bg-gray-500/10 text-gray-600'}>
                          {post.primary_tag.name}
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.published_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {post.authors?.[0]?.name || 'Ghost'}
                      </span>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.reading_time || 1} min
                        </span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* No Posts */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No published posts found. Make sure you have published posts in Ghost.
              </p>
              <Button 
                onClick={() => window.open('https://ai-flows.ghost.io/ghost/#/posts', '_blank')}
              >
                Go to Ghost Admin
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}