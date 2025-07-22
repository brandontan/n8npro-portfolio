import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Tag, Loader2 } from "lucide-react";
import { getPost, type GhostPost } from "@/lib/ghost";
import { motion } from "framer-motion";

export default function GhostPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const postData = await getPost(slug);
        if (postData) {
          setPost(postData);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Post not found"}</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
            {post.authors?.[0] && (
              <div className="flex items-center gap-2">
                {post.authors[0].profile_image ? (
                  <img 
                    src={post.authors[0].profile_image} 
                    alt={post.authors[0].name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span>{post.authors[0].name}</span>
              </div>
            )}
            
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.published_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.reading_time || 1} min read
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {post.feature_image && (
            <img 
              src={post.feature_image}
              alt={post.title}
              className="w-full rounded-lg mb-8"
            />
          )}

          {/* Content */}
          <div 
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </motion.div>
      </article>
    </div>
  );
}