import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Upload, X, Image, Video, FileText, Save, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { createActivity, updateActivity, getActivities, uploadActivityImage, type Activity } from '@/lib/activities';
import { supabase } from '@/lib/supabase';

interface UploadedFile {
  name: string;
  path: string;
  type: 'image' | 'video' | 'file';
  size: string;
}

export default function ActivitiesAdmin() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<string>('workflow');
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [generatedMDX, setGeneratedMDX] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [existingActivities, setExistingActivities] = useState<Activity[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuth();
    loadActivities();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please login to access admin panel');
      // Redirect to login or show login form
    }
  };

  const loadActivities = async () => {
    const activities = await getActivities();
    setExistingActivities(activities);
  };

  const generateMDX = () => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const filename = `${date}-${slug}.mdx`;
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    const mdxContent = `---
title: ${title}
date: ${date}
category: ${category}
tags: ${JSON.stringify(tagsArray)}
preview: ${preview}
${imagePath ? `image: ${imagePath}` : ''}
---

${content}`;

    setGeneratedMDX(mdxContent);
    
    // Copy to clipboard
    navigator.clipboard.writeText(mdxContent).then(() => {
      toast.success(`MDX copied to clipboard! Save as: src/activities/${filename}`);
    });
  };

  const downloadMDX = () => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const filename = `${date}-${slug}.mdx`;
    const blob = new Blob([generatedMDX], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'file';
      const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      const fileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
      const filePath = `/activities/images/${fileName}`;
      
      const newFile: UploadedFile = {
        name: fileName,
        path: filePath,
        type: fileType,
        size: fileSize
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Create a preview URL for the file
      const reader = new FileReader();
      reader.onload = (e) => {
        // Store the file data for later use
        // In a real app, you'd upload to a server here
        console.log(`File ready for upload: ${fileName}`);
      };
      reader.readAsDataURL(file);
    });
    
    toast.info(`Selected ${files.length} file(s). Save them to public/activities/images/ folder`);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const insertMediaToContent = (path: string, type: string) => {
    let insertion = '';
    if (type === 'image') {
      insertion = `![](${path})`;
    } else if (type === 'video') {
      insertion = `<video src="${path}" controls className="w-full rounded-lg" />`;
    } else {
      insertion = `[Download](${path})`;
    }
    setContent(prev => prev ? prev + '\n\n' + insertion : insertion);
    toast.success('Added to content!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Activities Admin</h1>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              onClick={() => window.location.href = '/blog'}
            >
              👻 Ghost Blog (Recommended)
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/admin/activities/grapes'}
            >
              GrapesJS Builder
            </Button>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Built Solar Lead Gen System"
                />
              </div>
              
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client-success">Client Success</SelectItem>
                    <SelectItem value="workflow">Workflow Built</SelectItem>
                    <SelectItem value="insight">Industry Insight</SelectItem>
                    <SelectItem value="technical">Technical Update</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="n8n, automation, lead-gen"
                />
              </div>
              
              <div>
                <Label htmlFor="preview">Preview Text</Label>
                <Textarea
                  id="preview"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  placeholder="Short description for the card..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="image">Featured Image (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                    placeholder="/activities/images/hero.png"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const fileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
                          const path = `/activities/images/${fileName}`;
                          setImagePath(path);
                          
                          // Add to uploaded files list
                          const newFile: UploadedFile = {
                            name: fileName,
                            path: path,
                            type: 'image',
                            size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
                          };
                          setUploadedFiles(prev => [...prev, newFile]);
                          
                          toast.success(`Selected: ${fileName}`);
                        }
                      };
                      input.click();
                    }}
                  >
                    <Image className="h-4 w-4" />
                    Pick
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This image appears as the card thumbnail in the activities grid
                </p>
              </div>
              
              <div>
                <Label>Content</Label>
                <div 
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                    
                    const files = Array.from(e.dataTransfer.files);
                    files.forEach(file => {
                      if (file.type.startsWith('image/')) {
                        const fileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
                        const path = `/activities/images/${fileName}`;
                        
                        // Add image markdown at cursor position
                        const imageMarkdown = `![](${path})`;
                        setContent(prev => prev ? prev + '\n\n' + imageMarkdown : imageMarkdown);
                        
                        // Add to uploaded files
                        const newFile: UploadedFile = {
                          name: fileName,
                          path: path,
                          type: 'image',
                          size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
                        };
                        setUploadedFiles(prev => [...prev, newFile]);
                        
                        toast.success(`Dropped: ${fileName}`);
                      } else if (file.type.startsWith('video/')) {
                        const fileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
                        const path = `/activities/images/${fileName}`;
                        
                        // Add video element
                        const videoMarkdown = `<video src="${path}" controls className="w-full rounded-lg" />`;
                        setContent(prev => prev ? prev + '\n\n' + videoMarkdown : videoMarkdown);
                        
                        // Add to uploaded files
                        const newFile: UploadedFile = {
                          name: fileName,
                          path: path,
                          type: 'video',
                          size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
                        };
                        setUploadedFiles(prev => [...prev, newFile]);
                        
                        toast.success(`Dropped: ${fileName}`);
                      }
                    });
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    if (e.currentTarget === e.target) {
                      setIsDragging(false);
                    }
                  }}
                  className="relative"
                >
                  <MDEditor
                    value={content}
                    onChange={(val) => setContent(val || '')}
                    preview="live"
                    height={400}
                    data-color-mode="light"
                  />
                  {isDragging && (
                    <div className="absolute inset-0 bg-blue-500/20 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                      <p className="text-blue-600 font-medium bg-white px-4 py-2 rounded-lg shadow-lg">
                        Drop images or videos here
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Drag & drop images/videos directly into the editor • Live preview on the right
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={async () => {
                    setIsSaving(true);
                    try {
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
                      
                      // Upload featured image if it's a file
                      let featuredImageUrl = imagePath;
                      if (imagePath && !imagePath.startsWith('http')) {
                        // Handle file upload later
                      }
                      
                      await createActivity({
                        slug,
                        title,
                        date,
                        category: category as any,
                        tags: tagsArray,
                        preview,
                        featured_image: featuredImageUrl,
                        content,
                        published: isPublished
                      });
                      
                      toast.success('Activity saved successfully!');
                      loadActivities();
                      
                      // Reset form
                      setTitle('');
                      setPreview('');
                      setContent('');
                      setTags('');
                      setImagePath('');
                      setUploadedFiles([]);
                    } catch (error) {
                      toast.error('Failed to save activity');
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                  disabled={!title || !content || isSaving}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save to Database
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPublished(!isPublished)}
                  type="button"
                >
                  {isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  {isPublished ? 'Published' : 'Draft'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated MDX
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(generatedMDX)}
                    disabled={!generatedMDX}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={downloadMDX}
                    disabled={!generatedMDX}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generatedMDX || 'Fill in the form and click "Generate MDX"'}</code>
              </pre>
              
              {generatedMDX && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>Next Steps:</strong>
                  </p>
                  <ol className="text-sm mt-2 space-y-1">
                    <li>1. Copy the MDX content above</li>
                    <li>2. Create a new file in <code>src/activities/</code></li>
                    <li>3. Name it: <code>{date}-{title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mdx</code></li>
                    <li>4. Paste the content and save</li>
                    <li>5. Add images to <code>public/activities/images/</code></li>
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Media Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Click to upload images, videos, or files
              </p>
              <p className="text-xs text-gray-500">
                Supports: JPG, PNG, GIF, MP4, PDF
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.pdf"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">Selected Files:</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        {file.type === 'image' && <Image className="h-5 w-5 text-blue-500" />}
                        {file.type === 'video' && <Video className="h-5 w-5 text-purple-500" />}
                        {file.type === 'file' && <FileText className="h-5 w-5 text-gray-500" />}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => insertMediaToContent(file.path, file.type)}
                        >
                          Insert
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    <strong>Important:</strong> After generating MDX, manually save these files to:
                  </p>
                  <code className="text-xs block mt-1">public/activities/images/</code>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}