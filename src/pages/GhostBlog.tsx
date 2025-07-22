import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Ghost } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight, User, Clock } from 'lucide-react';

export default function GhostBlog() {
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://ghost.org/help/setting-up-ghost/', '_blank')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Setup Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Ghost Activities Component */}
      <GhostActivities />

      {/* Setup Instructions */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">🚀 Setting Up Your Ghost Blog</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This page is currently showing demo content from Ghost's public API. To connect your own Ghost blog:
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h4 className="font-semibold mb-1">Create a Ghost Site</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign up for <a href="https://ghost.org/pricing/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ghost(Pro)</a> hosting 
                  or <a href="https://ghost.org/docs/install/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">self-host Ghost</a> on your own server.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h4 className="font-semibold mb-1">Generate API Keys</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  In your Ghost admin panel, go to Settings → Integrations → Add custom integration. 
                  Copy your Content API Key.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h4 className="font-semibold mb-1">Update Environment Variables</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add these to your <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">.env</code> file:
                </p>
                <pre className="mt-2 bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`VITE_GHOST_URL=https://your-site.ghost.io
VITE_GHOST_CONTENT_KEY=your-content-api-key`}
                </pre>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <h4 className="font-semibold mb-1">Start Publishing!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use Ghost's beautiful editor to write posts. They'll automatically appear here through the API.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <Button 
              onClick={() => window.open('https://ghost.org/pricing/', '_blank')}
            >
              Start 14-Day Free Trial
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://ghost.org/docs/content-api/', '_blank')}
            >
              View API Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}