import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Search, FileText } from 'lucide-react';
import { getActivities, deleteActivity, type Activity } from '@/lib/activities';
import { formatTags } from '@/lib/tagConfig';
import { toast } from 'sonner';

export default function PostManager() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data.sort((a, b) => {
        // Sort by most recent activity first
        // For published posts, use published_at; for drafts, use last_saved_at
        const aDate = a.published && a.published_at 
          ? a.published_at 
          : (a.last_saved_at || a.updated_at || a.created_at);
        const bDate = b.published && b.published_at 
          ? b.published_at 
          : (b.last_saved_at || b.updated_at || b.created_at);
        
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      }));
    } catch (error) {
      console.error('Failed to load activities:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      activity.title.toLowerCase().includes(query) ||
      activity.preview.toLowerCase().includes(query)
    );
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setDeleting(true);
    try {
      await deleteActivity(id);
      setActivities(prev => prev.filter(a => a.id !== id));
      toast.success('Post deleted');
    } catch (error) {
      toast.error('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} posts?`)) return;
    
    setDeleting(true);
    try {
      await Promise.all(selectedIds.map(id => deleteActivity(id)));
      setActivities(prev => prev.filter(a => !selectedIds.includes(a.id)));
      setSelectedIds([]);
      toast.success('Posts deleted');
    } catch (error) {
      toast.error('Failed to delete posts');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        <Card className="mb-6 bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-10 bg-gray-800 border-gray-700"
                />
              </div>
              {selectedIds.length > 0 && (
                <Button
                  onClick={handleBulkDelete}
                  disabled={deleting}
                  variant="destructive"
                >
                  Delete {selectedIds.length}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {filteredActivities.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-12 text-center">
              <p className="text-gray-400">No posts found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredActivities.map((activity) => {
              const format = formatTags[activity.formatTag as keyof typeof formatTags] || formatTags.tutorial;
              const isSelected = selectedIds.includes(activity.id);
              
              return (
                <Card key={activity.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(activity.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${format.bgClass} ${format.textClass} border-0`}>
                            <format.icon className="h-3 w-3 mr-1" />
                            {format.label}
                          </Badge>
                          {activity.published ? (
                            <Badge variant="outline" className="border-green-500/50 text-green-400">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                              Draft
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold mb-1">{activity.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{activity.preview}</p>
                        <div className="text-xs text-gray-500">
                          {activity.published && activity.published_at ? (
                            // Published posts - show only publish date
                            <p>Published on {new Date(activity.published_at).toLocaleString('en-US', {
                              timeZone: 'Asia/Singapore',
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })} (SGT)</p>
                          ) : (
                            // Draft posts - show save info
                            <p>Saved {activity.save_count || 1} times, last on {new Date(activity.last_saved_at || activity.updated_at || activity.created_at).toLocaleString('en-US', { 
                              timeZone: 'Asia/Singapore',
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })} (SGT)</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/editor?edit=${activity.slug}`, '_blank')}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(activity.id)}
                          disabled={deleting}
                          className="text-red-400 hover:bg-red-600/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

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
    </div>
  );
}