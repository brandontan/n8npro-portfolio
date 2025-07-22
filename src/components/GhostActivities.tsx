import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight, User, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getPosts, type GhostPost } from '@/lib/ghost';

export default function GhostActivities() {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const ghostPosts = await getPosts(12);
        setPosts(ghostPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const categoryColors: Record<string, string> = {
    'automation': 'bg-blue-500/10 text-blue-600',
    'workflow': 'bg-green-500/10 text-green-600',
    'tutorial': 'bg-purple-500/10 text-purple-600',
    'case-study': 'bg-orange-500/10 text-orange-600',
    'update': 'bg-pink-500/10 text-pink-600',
  };

  return (
    <section id="ghost-activities" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Professional Activities</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Latest insights, tutorials, and automation success stories
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <span className="mr-2">📝</span>
              Powered by Ghost CMS
            </Badge>
            <Button 
              variant="outline"
              onClick={() => window.open('https://ghost.org', '_blank')}
              className="text-sm"
            >
              Learn about Ghost →
            </Button>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No posts available. Connect your Ghost site to start publishing!
            </p>
            <Button 
              variant="outline"
              onClick={() => window.open('https://ghost.org/pricing/', '_blank')}
            >
              Get Started with Ghost
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedPost(post)}
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
                    {post.custom_excerpt || post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.authors?.[0] && (
                        <>
                          {post.authors[0].profile_image ? (
                            <img 
                              src={post.authors[0].profile_image} 
                              alt={post.authors[0].name}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <User className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm text-gray-500">{post.authors[0].name}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.reading_time} min
                      </span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Post Modal */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold pr-8">
                    {selectedPost.title}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => setSelectedPost(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogHeader>
                
                <div className="flex items-center gap-3 mt-2 mb-6">
                  {selectedPost.authors?.[0] && (
                    <div className="flex items-center gap-2">
                      {selectedPost.authors[0].profile_image ? (
                        <img 
                          src={selectedPost.authors[0].profile_image} 
                          alt={selectedPost.authors[0].name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm font-medium">{selectedPost.authors[0].name}</span>
                    </div>
                  )}
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedPost.published_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {selectedPost.reading_time} min read
                  </span>
                </div>
                
                {selectedPost.feature_image && (
                  <img 
                    src={selectedPost.feature_image} 
                    alt={selectedPost.title}
                    className="w-full rounded-lg mb-6"
                  />
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags?.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                
                <div 
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.html }}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}