import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Loader2 } from 'lucide-react';
import { getActivities, type Activity } from '@/lib/activities';
import { toast } from 'sonner';

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivity() {
      try {
        const activities = await getActivities();
        const found = activities.find(a => a.slug === slug);
        if (found) {
          setActivity(found);
        } else {
          toast.error('Activity not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to load activity:', error);
        toast.error('Failed to load activity');
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, [slug, navigate]);

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

  const shareActivity = () => {
    if (navigator.share) {
      navigator.share({
        title: activity?.title,
        text: activity?.preview,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!activity) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Featured Image */}
      {activity.featured_image && (
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={activity.featured_image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => {
            // If we came from activities, go back, otherwise navigate to activities
            if (location.state?.fromActivities) {
              navigate(-1);
            } else {
              navigate('/#activities');
            }
          }}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {activity.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(activity.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {getReadingTime(activity.content)}
              </span>
              <button
                onClick={shareActivity}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            {/* Tags */}
            {activity.tags && activity.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {activity.tags.map((tag) => (
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
            dangerouslySetInnerHTML={{ __html: activity.content }}
          />
        </motion.article>

        {/* Share CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 text-center">
          <h3 className="text-2xl font-bold mb-4">Found this helpful?</h3>
          <p className="text-gray-400 mb-6">Share it with your network</p>
          <button
            onClick={shareActivity}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
          >
            <Share2 className="h-5 w-5" />
            Share Article
          </button>
        </div>
      </div>
    </div>
  );
}