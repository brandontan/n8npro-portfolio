import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Loader2, FileText, TrendingUp, Search, ChevronLeft, ChevronRight, X, Share2, ArrowLeft } from 'lucide-react';
import { getActivities, type Activity } from '@/lib/activities';
import { formatTags } from '@/lib/tagConfig';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';


const ITEMS_PER_PAGE = 6; // Show 6 cards per page (2 rows of 3)

export default function ModernActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await getActivities();
        // Sort by created_at descending (newest first)
        const sorted = data.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setActivities(sorted);
        setFilteredActivities(sorted);
      } catch (error) {
        console.error('Failed to load activities:', error);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  // Filter activities based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredActivities(activities);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = activities.filter(activity => {
        const formatLabel = formatTags[activity.formatTag as keyof typeof formatTags]?.label || '';
        const categoryTagsLower = activity.categoryTags?.map(tag => tag.toLowerCase()) || [];
        const tagsLower = activity.tags?.map(tag => tag.toLowerCase()) || [];
        
        // For tags, we want to match if any tag contains the query
        // For example: searching "n8n" should match "n8n Workflows", "n8n-workflow", etc.
        const matchesInCategoryTags = categoryTagsLower.some(tag => {
          // Split hyphenated tags and check each part
          const tagParts = tag.split(/[-\s]+/);
          return tag.includes(query) || tagParts.some(part => part.includes(query));
        });
        
        const matchesInTags = tagsLower.some(tag => {
          // Split hyphenated tags and check each part
          const tagParts = tag.split(/[-\s]+/);
          return tag.includes(query) || tagParts.some(part => part.includes(query));
        });
        
        return (
          activity.title.toLowerCase().includes(query) ||
          activity.preview.toLowerCase().includes(query) ||
          activity.content.toLowerCase().includes(query) ||
          matchesInCategoryTags ||
          matchesInTags ||
          formatLabel.toLowerCase().includes(query)
        );
      });
      setFilteredActivities(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, activities]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  return (
    <section id="activities" className="min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-blue-900/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Latest Activities
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our latest automation workflows, client success stories, and technical insights
          </p>
        </motion.div>

        {/* Search Bar */}
        {activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities by title, content, or tags..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-gray-400 text-center">
                Found {filteredActivities.length} result{filteredActivities.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
            <p className="text-gray-400">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <FileText className="h-10 w-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-300">No Activities Yet</h3>
            <p className="text-gray-500">Check back soon for updates!</p>
          </motion.div>
        ) : filteredActivities.length === 0 ? (
          /* No Search Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <Search className="h-10 w-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-300">No Results Found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </motion.div>
        ) : (
          <>
            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {paginatedActivities.map((activity, index) => {
              // Handle both old and new format
              const formatTag = activity.formatTag || 'tutorial';
              const format = formatTags[formatTag as keyof typeof formatTags] || formatTags.tutorial;
              const categoryTagsToUse = activity.categoryTags || activity.tags || [];
              const isHovered = hoveredCard === activity.slug;
              
              return (
                <motion.article
                  key={activity.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative min-h-[500px] flex"
                  onMouseEnter={() => setHoveredCard(activity.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    onClick={() => setSelectedActivity(activity)}
                    className="w-full cursor-pointer"
                  >
                    {/* Card Container */}
                    <div className="relative h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col">
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Featured Image */}
                      <div className="relative h-56 overflow-hidden bg-gray-800 flex-shrink-0">
                        {activity.featured_image ? (
                          <>
                            <img
                              src={activity.featured_image}
                              alt={activity.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <FileText className="h-12 w-12 text-gray-700" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="relative p-6 flex flex-col flex-grow">
                        {/* Format Tag & Meta */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${format.bgClass} ${format.textClass} border ${format.borderClass}`}>
                            <format.icon className="h-3 w-3" />
                            {format.label}
                          </span>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(activity.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getReadingTime(activity.content)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors line-clamp-2">
                          {activity.title}
                        </h3>
                        
                        {/* Preview */}
                        <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                          {activity.preview}
                        </p>
                        
                        {/* Category Tags */}
                        {categoryTagsToUse.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {categoryTagsToUse.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2.5 py-1 bg-gray-800/60 border border-gray-700/50 rounded-md text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                            {categoryTagsToUse.length > 2 && (
                              <span className="text-xs px-2.5 py-1 text-gray-500">
                                +{categoryTagsToUse.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors mt-auto">
                          <span>Read article</span>
                          <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                        </div>
                      </div>
                      
                      {/* Bottom Gradient Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 mt-12"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-900/50 border border-gray-800 hover:border-gray-700 text-gray-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            )}

            {/* Results Summary */}
            <div className="text-center mt-8 text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredActivities.length)} of {filteredActivities.length} activities
            </div>
          </>
        )}
      </div>

      {/* Activity Detail Modal */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-gray-800 [&>button]:hidden">
          {selectedActivity && (
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute right-4 top-4 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Featured Image */}
              {selectedActivity.featured_image && (
                <div className="relative h-64 md:h-96 -mx-6 -mt-6 mb-8 overflow-hidden">
                  <img
                    src={selectedActivity.featured_image}
                    alt={selectedActivity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
              )}

              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {selectedActivity.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedActivity.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {getReadingTime(selectedActivity.content)}
                  </span>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/activities/${selectedActivity.slug}`;
                      if (navigator.share) {
                        navigator.share({
                          title: selectedActivity.title,
                          text: selectedActivity.preview,
                          url,
                        });
                      } else {
                        navigator.clipboard.writeText(url);
                        toast.success('Link copied to clipboard!');
                      }
                    }}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                {/* Tags */}
                {selectedActivity.categoryTags && selectedActivity.categoryTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedActivity.categoryTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800/60 border border-gray-700/50 rounded-full text-xs text-gray-400"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Content */}
              <div 
                className="prose prose-lg prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedActivity.content }}
              />

              {/* Share CTA */}
              <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/20 text-center">
                <h3 className="text-xl font-bold mb-3">Found this helpful?</h3>
                <p className="text-gray-400 mb-4">Share it with your network</p>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/activities/${selectedActivity.slug}`;
                    if (navigator.share) {
                      navigator.share({
                        title: selectedActivity.title,
                        text: selectedActivity.preview,
                        url,
                      });
                    } else {
                      navigator.clipboard.writeText(url);
                      toast.success('Link copied to clipboard!');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share Article
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}