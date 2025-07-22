import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Trash2, 
  Edit, 
  Eye, 
  Search,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileText,
  CheckSquare,
  Square,
  TrashIcon
} from 'lucide-react';
import { getActivities, deleteActivity, type Activity } from '@/lib/activities';
import { formatTags } from '@/lib/tagConfig';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface MonthGroup {
  month: string;
  year: number;
  activities: Activity[];
  count: number;
}

export default function PostManager() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [groupedActivities, setGroupedActivities] = useState<MonthGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);
  const [deletingPost, setDeletingPost] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [deletingBulk, setDeletingBulk] = useState(false);
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    groupActivitiesByMonth();
  }, [activities, searchQuery]);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      // Sort by created_at descending (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setActivities(sorted);
    } catch (error) {
      console.error('Failed to load activities:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const groupActivitiesByMonth = () => {
    let filtered = activities;
    
    // Filter by published status if requested
    if (showPublishedOnly) {
      filtered = filtered.filter(activity => activity.published);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity => {
        const formatLabel = formatTags[activity.formatTag as keyof typeof formatTags]?.label || '';
        const categoryTagsLower = activity.categoryTags?.map(tag => tag.toLowerCase()) || [];
        const tagsLower = activity.tags?.map(tag => tag.toLowerCase()) || [];
        
        return (
          activity.title.toLowerCase().includes(query) ||
          activity.preview.toLowerCase().includes(query) ||
          categoryTagsLower.some(tag => tag.includes(query)) ||
          tagsLower.some(tag => tag.includes(query)) ||
          formatLabel.toLowerCase().includes(query)
        );
      });
    }

    const grouped = filtered.reduce((acc, activity) => {
      const date = new Date(activity.created_at);
      const monthYear = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;
      
      const existingGroup = acc.find(group => group.month === monthYear);
      if (existingGroup) {
        existingGroup.activities.push(activity);
        existingGroup.count++;
      } else {
        acc.push({
          month: monthYear,
          year: date.getFullYear(),
          activities: [activity],
          count: 1
        });
      }
      
      return acc;
    }, [] as MonthGroup[]);

    // Sort by year and month (newest first)
    grouped.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      const aMonth = new Date(a.month + ' 1').getMonth();
      const bMonth = new Date(b.month + ' 1').getMonth();
      return bMonth - aMonth;
    });

    setGroupedActivities(grouped);
    
    // Auto-expand current month
    if (grouped.length > 0 && expandedMonths.length === 0) {
      setExpandedMonths([grouped[0].month]);
    }
  };

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month) 
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  const handleDelete = async (activity: Activity) => {
    if (!confirm(`Are you sure you want to delete "${activity.title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingPost(activity.slug);
    try {
      await deleteActivity(activity.id);
      setActivities(prev => prev.filter(a => a.id !== activity.id));
      setSelectedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(activity.id);
        return newSet;
      });
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete post');
    } finally {
      setDeletingPost(null);
    }
  };

  const handleBulkDelete = async (postIds: string[]) => {
    if (postIds.length === 0) return;
    
    const postTitles = activities
      .filter(a => postIds.includes(a.id))
      .map(a => a.title)
      .slice(0, 3);
    
    const displayText = postTitles.length < postIds.length 
      ? `${postTitles.join(', ')} and ${postIds.length - postTitles.length} more`
      : postTitles.join(', ');

    if (!confirm(`Are you sure you want to delete ${postIds.length} post(s)?\n\n${displayText}\n\nThis action cannot be undone.`)) {
      return;
    }

    setDeletingBulk(true);
    try {
      const deletePromises = postIds.map(id => deleteActivity(id));
      await Promise.all(deletePromises);
      
      setActivities(prev => prev.filter(a => !postIds.includes(a.id)));
      setSelectedPosts(new Set());
      toast.success(`${postIds.length} post(s) deleted successfully`);
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete some posts');
    } finally {
      setDeletingBulk(false);
    }
  };

  const handleDeleteMonth = async (monthGroup: MonthGroup) => {
    const postIds = monthGroup.activities.map(a => a.id);
    await handleBulkDelete(postIds);
  };

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const selectAllInMonth = (monthGroup: MonthGroup) => {
    const monthPostIds = monthGroup.activities.map(a => a.id);
    const allSelected = monthPostIds.every(id => selectedPosts.has(id));
    
    setSelectedPosts(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        monthPostIds.forEach(id => newSet.delete(id));
      } else {
        monthPostIds.forEach(id => newSet.add(id));
      }
      return newSet;
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Post Manager</h1>
          <p className="text-gray-400">Manage your blog posts and activities</p>
        </div>

        {/* Controls */}
        <Card className="mb-6 bg-gray-900 border-gray-800">
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts by title, content, or tags..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPublishedOnly}
                    onChange={(e) => setShowPublishedOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-300">Published posts only</span>
                </label>
              </div>

              {/* Bulk Actions */}
              {selectedPosts.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {selectedPosts.size} selected
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkDelete(Array.from(selectedPosts))}
                    disabled={deletingBulk}
                    className="border-red-600/50 text-red-400 hover:bg-red-600/20"
                  >
                    {deletingBulk ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b border-red-400" />
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Selected
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-purple-400">{activities.length}</h3>
              <p className="text-gray-400">Total Posts</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-green-400">{activities.filter(a => a.published).length}</h3>
              <p className="text-gray-400">Published</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-yellow-400">{activities.filter(a => !a.published).length}</h3>
              <p className="text-gray-400">Drafts</p>
            </CardContent>
          </Card>
        </div>

        {/* Grouped Posts */}
        {groupedActivities.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-300">No Posts Found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'No posts match your search criteria.' : 'No posts have been created yet.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {groupedActivities.map((group) => {
              const monthPostIds = group.activities.map(a => a.id);
              const allSelected = monthPostIds.every(id => selectedPosts.has(id));
              const someSelected = monthPostIds.some(id => selectedPosts.has(id));
              
              return (
              <Card key={group.month} className="bg-gray-900 border-gray-800">
                <CardHeader className="hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center gap-4 cursor-pointer flex-1"
                      onClick={() => toggleMonth(group.month)}
                    >
                      <div>
                        <CardTitle className="text-xl">{group.month}</CardTitle>
                        <p className="text-gray-400">
                          {group.count} post{group.count !== 1 ? 's' : ''}
                          {someSelected && (
                            <span className="ml-2 text-purple-400">
                              ({monthPostIds.filter(id => selectedPosts.has(id)).length} selected)
                            </span>
                          )}
                        </p>
                      </div>
                      {expandedMonths.includes(group.month) ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    
                    {/* Month Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAllInMonth(group);
                        }}
                        className="border-gray-700 hover:bg-gray-700"
                      >
                        {allSelected ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : someSelected ? (
                          <Square className="h-4 w-4 opacity-50" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMonth(group);
                        }}
                        className="border-red-600/50 text-red-400 hover:bg-red-600/20"
                        title={`Delete all posts in ${group.month}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <AnimatePresence>
                  {expandedMonths.includes(group.month) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {group.activities.map((activity) => {
                            const format = formatTags[activity.formatTag as keyof typeof formatTags] || formatTags.tutorial;
                            const isDeleting = deletingPost === activity.slug;
                            
                            return (
                              <motion.div
                                key={activity.slug}
                                layout
                                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors relative"
                                onMouseEnter={(e) => {
                                  setHoveredPost(activity.slug);
                                  setMousePosition({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseMove={(e) => {
                                  setMousePosition({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => setHoveredPost(null)}
                              >
                                {/* Selection Checkbox */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePostSelection(activity.id);
                                  }}
                                  className="text-gray-400 hover:text-white"
                                >
                                  {selectedPosts.has(activity.id) ? (
                                    <CheckSquare className="h-5 w-5 text-purple-400" />
                                  ) : (
                                    <Square className="h-5 w-5" />
                                  )}
                                </button>

                                {/* Post Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge 
                                      className={`${format.bgClass} ${format.textClass} border-0`}
                                    >
                                      <format.icon className="h-3 w-3 mr-1" />
                                      {format.label}
                                    </Badge>
                                    {!activity.published && (
                                      <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                                        Draft
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <h3 className="font-semibold truncate mb-1">{activity.title}</h3>
                                  <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                                    {activity.preview}
                                  </p>
                                  
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {formatDate(activity.created_at)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {getReadingTime(activity.content)}
                                    </span>
                                    {activity.categoryTags && activity.categoryTags.length > 0 && (
                                      <span>
                                        {activity.categoryTags.slice(0, 2).join(', ')}
                                        {activity.categoryTags.length > 2 && ` +${activity.categoryTags.length - 2}`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(`/activities/${activity.slug}`, '_blank')}
                                    className="border-gray-700 hover:bg-gray-700"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(`/editor?edit=${activity.slug}`, '_blank')}
                                    className="border-gray-700 hover:bg-gray-700"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(activity)}
                                    disabled={isDeleting}
                                    className="border-red-600/50 text-red-400 hover:bg-red-600/20 hover:border-red-600"
                                  >
                                    {isDeleting ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b border-red-400" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
            })}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => window.open('/editor', '_blank')}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <FileText className="h-5 w-5 mr-2" />
            Create New Post
          </Button>
        </div>
      </div>

      {/* Post Preview Tooltip */}
      <AnimatePresence>
        {hoveredPost && (() => {
          const activity = activities.find(a => a.slug === hoveredPost);
          if (!activity) return null;
          
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed z-50 pointer-events-none"
              style={{
                left: `${Math.min(mousePosition.x + 20, window.innerWidth - 520)}px`,
                top: `${Math.max(20, Math.min(mousePosition.y - 200, window.innerHeight - 420))}px`,
                maxWidth: '500px',
                maxHeight: '400px'
              }}
            >
              <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
                {/* Preview Header */}
                {activity.featured_image && (
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={activity.featured_image} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Preview Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{activity.title}</h3>
                  
                  {/* Render content as preview */}
                  <div 
                    className="prose prose-sm prose-gray dark:prose-invert max-w-none line-clamp-6"
                    dangerouslySetInnerHTML={{ 
                      __html: activity.content.substring(0, 500) + '...' 
                    }}
                  />
                  
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(activity.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getReadingTime(activity.content)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}