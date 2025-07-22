import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Ghost, Calendar, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

// Demo posts for testing
const demoPosts = [
  {
    id: '1',
    title: 'Building AI-Powered Automation with n8n',
    slug: 'ai-powered-automation-n8n',
    excerpt: 'Learn how to integrate AI models like GPT-4 and Claude into your n8n workflows for intelligent automation.',
    feature_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    published_at: '2025-01-19',
    reading_time: 5,
    primary_tag: { name: 'AI Automation', slug: 'ai-automation' },
    author: { name: 'Brandon Tan', profile_image: null }
  },
  {
    id: '2',
    title: 'Migrating from Zapier to n8n: A Complete Guide',
    slug: 'zapier-to-n8n-migration',
    excerpt: 'Step-by-step guide on migrating your Zapier workflows to self-hosted n8n, including cost analysis and benefits.',
    feature_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    published_at: '2025-01-18',
    reading_time: 8,
    primary_tag: { name: 'Tutorial', slug: 'tutorial' },
    author: { name: 'Brandon Tan', profile_image: null }
  },
  {
    id: '3',
    title: 'Case Study: Automating E-commerce Operations',
    slug: 'ecommerce-automation-case-study',
    excerpt: 'How we helped an e-commerce client save 60+ hours weekly by automating order processing, inventory, and customer support.',
    feature_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    published_at: '2025-01-17',
    reading_time: 6,
    primary_tag: { name: 'Case Study', slug: 'case-study' },
    author: { name: 'Brandon Tan', profile_image: null }
  }
];

const categoryColors: Record<string, string> = {
  'ai-automation': 'bg-blue-500/10 text-blue-600',
  'tutorial': 'bg-green-500/10 text-green-600',
  'case-study': 'bg-purple-500/10 text-purple-600',
  'workflow': 'bg-orange-500/10 text-orange-600',
  'update': 'bg-pink-500/10 text-pink-600',
};

export default function GhostBlogSimple() {
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
              <Ghost className="h-4 w-4" />
              <span>Powered by Ghost CMS</span>
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
                <span className="mr-2">📝</span>
                Professional Publishing with Ghost
              </Badge>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {demoPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
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
                    <span className="text-sm text-gray-500">{post.author.name}</span>
                    
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
        </div>
      </section>

      {/* Setup Instructions */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">🚀 Ready to Start Publishing?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Ghost is the perfect platform for professional content creation. Get started in minutes:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Why Ghost?</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Beautiful, distraction-free editor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Built-in SEO & social sharing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Native membership & subscriptions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Lightning fast performance
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Setup</h4>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>1. Sign up for Ghost(Pro) - 14 day free trial</li>
                <li>2. Create custom integration for API access</li>
                <li>3. Add your API credentials to this site</li>
                <li>4. Start publishing amazing content!</li>
              </ol>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              onClick={() => window.open('https://ghost.org/pricing/', '_blank')}
            >
              Start Free Trial
            </Button>
            <Link to="/blog/setup">
              <Button variant="outline">
                Detailed Setup Guide
              </Button>
            </Link>
            <Button 
              variant="outline"
              onClick={() => window.open('https://ghost.org/docs/', '_blank')}
            >
              Documentation
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://demo.ghost.io/', '_blank')}
            >
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}