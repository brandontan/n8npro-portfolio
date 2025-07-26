import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight, X, Ghost, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getActivities, type Activity } from '@/lib/activities';
import { getPosts, type GhostPost } from '@/lib/ghost';
import MDEditor from '@uiw/react-md-editor';
import GhostContent from './GhostContent';
import '@/styles/ghost-overrides.css';
import { RenderContent } from './RenderContent';

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [ghostPosts, setGhostPosts] = useState<GhostPost[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedGhostPost, setSelectedGhostPost] = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        // Load both Supabase activities and Ghost posts
        const [supabaseData, ghostData] = await Promise.all([
          getActivities(undefined, true), // Get only published activities
          getPosts(6) // Get latest 6 Ghost posts
        ]);
        // Sort activities by published_at or created_at, latest first
        const sortedActivities = supabaseData.sort((a, b) => {
          const dateA = new Date(a.published_at || a.created_at);
          const dateB = new Date(b.published_at || b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
        setActivities(sortedActivities);
        setGhostPosts(ghostData);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);
  
  // Filter activities based on search query
  const filteredActivities = activities.filter(activity => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const matchesTitle = activity.title.toLowerCase().includes(query);
    const matchesContent = activity.content.toLowerCase().includes(query);
    const matchesPreview = activity.preview.toLowerCase().includes(query);
    const matchesFormatTag = activity.formatTag?.toLowerCase().includes(query);
    const matchesCategoryTags = activity.categoryTags?.some(tag => 
      tag.toLowerCase().includes(query)
    );
    const matchesIndustryTags = activity.industryTags?.some(tag => 
      tag.toLowerCase().includes(query)
    );
    
    return matchesTitle || matchesContent || matchesPreview || 
           matchesFormatTag || matchesCategoryTags || matchesIndustryTags;
  });

  // Filter Ghost posts based on search query
  const filteredGhostPosts = ghostPosts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const matchesTitle = post.title.toLowerCase().includes(query);
    const matchesExcerpt = post.excerpt?.toLowerCase().includes(query) || false;
    const matchesHtml = post.html?.toLowerCase().includes(query) || false;
    const matchesTag = post.primary_tag?.name?.toLowerCase().includes(query) || false;
    const matchesTags = post.tags?.some(tag => 
      tag.name?.toLowerCase().includes(query)
    ) || false;
    
    return matchesTitle || matchesExcerpt || matchesHtml || matchesTag || matchesTags;
  });

  const categoryColors = {
    'client-success': 'bg-green-500/10 text-green-400 border border-green-500/20',
    'workflow': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    'insight': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    'technical': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    'case-study': 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
    'news': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };

  const categoryLabels = {
    'client-success': 'Client Success',
    'workflow': 'Workflow Built',
    'insight': 'Industry Insight',
    'technical': 'Technical Update',
    'case-study': 'Case Study',
  };

  return (
    <section id="activities" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Latest Updates</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Project insights, automation works and case studies
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 focus:border-purple-500 rounded-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Loading activities...
            </p>
          </div>
        ) : filteredActivities.length === 0 && filteredGhostPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No activities published yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" key={searchQuery}>
            {/* Ghost Posts First */}
            {filteredGhostPosts.map((post, index) => (
              <motion.article
                key={`ghost-${post.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all cursor-pointer relative group"
                onClick={() => setSelectedGhostPost(post)}
              >
                {/* Ghost Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-purple-600/20 text-purple-400 border border-purple-600/30 backdrop-blur-sm">
                    <Ghost className="h-3 w-3 mr-1" />
                    Ghost
                  </Badge>
                </div>
                
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
                      <Badge className={categoryColors[post.primary_tag.slug] || categoryColors['workflow']}>
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
                  
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-100">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="text-xs px-2 py-1 bg-gray-800/50 border border-gray-700 rounded-full flex items-center gap-1 text-gray-400"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <button
                    className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1 transition-colors group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGhostPost(post);
                    }}
                  >
                    Read more 
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
            
            {/* Supabase Activities */}
            {filteredActivities.map((activity, index) => (
              <motion.article
                key={activity.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all cursor-pointer group"
                onClick={() => setSelectedActivity(activity)}
              >
                {activity.featured_image && (
                  <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={activity.featured_image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {/* Format Tag */}
                    <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {activity.formatTag?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(activity.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-100">
                    {activity.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {activity.preview}
                  </p>
                  
                  {/* All Tags Combined */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Category Tags */}
                    {activity.categoryTags && activity.categoryTags.map((tag) => (
                      <span
                        key={`cat-${tag}`}
                        className="text-xs px-2 py-1 bg-blue-800/30 border border-blue-700/50 rounded-full flex items-center gap-1 text-blue-400"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                    {/* Industry Tags */}
                    {activity.industryTags && activity.industryTags.map((tag) => (
                      <span
                        key={`ind-${tag}`}
                        className="text-xs px-2 py-1 bg-green-800/30 border border-green-700/50 rounded-full flex items-center gap-1 text-green-400"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1 transition-colors group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedActivity(activity);
                    }}
                  >
                    Read more 
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Ghost Post Modal */}
        <Dialog open={!!selectedGhostPost} modal={false} onOpenChange={(open) => {
          if (!open) {
            setSelectedGhostPost(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedGhostPost && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold pr-8">
                    {selectedGhostPost.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 mt-2 mb-6">
                  {selectedGhostPost.primary_tag && (
                    <Badge className={categoryColors[selectedGhostPost.primary_tag.slug] || categoryColors['workflow']}>
                      {selectedGhostPost.primary_tag.name}
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedGhostPost.published_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Badge variant="outline" className="ml-auto">
                    <Ghost className="h-3 w-3 mr-1" />
                    Ghost CMS
                  </Badge>
                </div>
                {selectedGhostPost.feature_image && (
                  <img 
                    src={selectedGhostPost.feature_image} 
                    alt={selectedGhostPost.title}
                    className="w-full rounded-lg mb-6"
                  />
                )}
                <div 
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedGhostPost.html }}
                />
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Activity Modal */}
        <Dialog open={!!selectedActivity} modal={false} onOpenChange={(open) => {
          if (!open) {
            setSelectedActivity(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedActivity && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold pr-8">
                    {selectedActivity.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-2 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    {/* Format Tag */}
                    <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {selectedActivity.formatTag?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(selectedActivity.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {/* All Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedActivity.categoryTags && selectedActivity.categoryTags.map((tag) => (
                      <span
                        key={`cat-${tag}`}
                        className="text-xs px-2 py-1 bg-blue-800/30 border border-blue-700/50 rounded-full flex items-center gap-1 text-blue-400"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                    {selectedActivity.industryTags && selectedActivity.industryTags.map((tag) => (
                      <span
                        key={`ind-${tag}`}
                        className="text-xs px-2 py-1 bg-green-800/30 border border-green-700/50 rounded-full flex items-center gap-1 text-green-400"
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {(() => {
                    // Check if content is JSON (from Puck)
                    try {
                      const puckData = JSON.parse(selectedActivity.content);
                      if (puckData.root && puckData.content) {
                        // This is Puck data - render as simple HTML for now
                        return (
                          <div className="space-y-4">
                            {puckData.content?.map((item: any, index: number) => {
                              const Component = item.props;
                              switch (item.type) {
                                case 'HeadingBlock':
                                  const Tag = Component.level || 'h2';
                                  return <Tag key={index}>{Component.text}</Tag>;
                                case 'TextBlock':
                                  return <p key={index}>{Component.text}</p>;
                                case 'ImageBlock':
                                  return <img key={index} src={Component.url} alt={Component.alt} className="w-full rounded-lg" />;
                                case 'VideoBlock':
                                  return <video key={index} src={Component.url} controls className="w-full rounded-lg" />;
                                case 'ButtonBlock':
                                  return (
                                    <a key={index} href={Component.url} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                      {Component.text}
                                    </a>
                                  );
                                case 'CodeBlock':
                                  return (
                                    <pre key={index} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                                      <code className={`language-${Component.language}`}>{Component.code}</code>
                                    </pre>
                                  );
                                case 'Card':
                                  return (
                                    <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
                                      {Component.image && <img src={Component.image} alt={Component.title} className="w-full h-48 object-cover" />}
                                      <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{Component.title}</h3>
                                        <p className="text-gray-600">{Component.description}</p>
                                      </div>
                                    </div>
                                  );
                                default:
                                  return null;
                              }
                            })}
                          </div>
                        );
                      }
                    } catch {
                      // Not JSON, render as markdown
                    }
                    // Check if content contains HTML
                    if (selectedActivity.content.includes('<iframe') || selectedActivity.content.includes('<div') || selectedActivity.content.includes('<p')) {
                      return (
                        <RenderContent 
                          content={selectedActivity.content}
                          className="prose prose-gray dark:prose-invert max-w-none [&_iframe]:w-full [&_iframe]:h-auto [&_iframe]:aspect-video [&_iframe]:rounded-lg"
                        />
                      );
                    }
                    return <MDEditor.Markdown source={selectedActivity.content} />;
                  })()}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}