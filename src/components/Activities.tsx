import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getActivities, type Activity } from '@/lib/activities';
import MDEditor from '@uiw/react-md-editor';
import '@/styles/ghost-overrides.css';
import { RenderContent } from './RenderContent';
import { Link } from 'react-router-dom';

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        // Load Supabase activities
        const supabaseData = await getActivities(undefined, true); // Get only published activities
        // Sort activities by published_at or created_at, latest first
        const sortedActivities = supabaseData.sort((a, b) => {
          const dateA = new Date(a.published_at || a.created_at);
          const dateB = new Date(b.published_at || b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
        setActivities(sortedActivities);
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
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No activities published yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" key={searchQuery}>
            {/* Supabase Activities */}
            {filteredActivities.map((activity, index) => (
              <motion.article
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all"
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Format Tag */}
                    {activity.formatTag && (
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {activity.formatTag}
                      </Badge>
                    )}
                    
                    {/* Category Tags */}
                    {activity.categoryTags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {tag}
                      </Badge>
                    ))}
                    
                    {/* Industry Tags */}
                    {activity.industryTags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-green-500/10 text-green-400 border border-green-500/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-100 hover:text-purple-400 transition-colors">
                    <Link 
                      to={`/activities/${activity.slug}`}
                      state={{ fromActivities: true }}
                      className="hover:text-purple-400"
                    >
                      {activity.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {activity.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(activity.published_at || activity.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Link 
                      to={`/activities/${activity.slug}`}
                      state={{ fromActivities: true }}
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium transition-colors"
                    >
                      Read more 
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}