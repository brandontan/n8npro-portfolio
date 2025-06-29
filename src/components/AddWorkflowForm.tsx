import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Upload, Save, Eye, Image, Link } from "lucide-react";
import { Workflow } from "@/data/workflows";

interface WorkflowFormData {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string;
  status: string;
  featured: boolean;
  thumbnail: string;
  images: string[];
  video: string;
  timeSaved: string;
  costReduction: string;
  efficiency: string;
  roi: string;
  technologies: string[];
  integrations: string[];
  complexity: string;
  challenge: string;
  solution: string;
  results: string[];
  client: string;
  industry: string;
  duration: string;
  tags: string[];
  isPublic: boolean;
}

const AddWorkflowForm: React.FC = () => {
  const [formData, setFormData] = useState<WorkflowFormData>({
    title: "",
    subtitle: "",
    description: "",
    longDescription: "",
    category: "",
    status: "Live",
    featured: false,
    thumbnail: "",
    images: [""],
    video: "",
    timeSaved: "",
    costReduction: "",
    efficiency: "",
    roi: "",
    technologies: [""],
    integrations: [""],
    complexity: "Medium",
    challenge: "",
    solution: "",
    results: [""],
    client: "",
    industry: "",
    duration: "",
    tags: [""],
    isPublic: true,
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentTech, setCurrentTech] = useState("");
  const [currentIntegration, setCurrentIntegration] = useState("");
  const [currentResult, setCurrentResult] = useState("");

  const categories = ["E-commerce", "CRM", "Marketing", "Finance", "Operations", "Support"];
  const statuses = ["Live", "In Development", "Concept"];
  const complexities = ["Simple", "Medium", "Complex"];

  const addArrayItem = (field: keyof WorkflowFormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: keyof WorkflowFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate workflow object
    const newWorkflow: Workflow = {
      id: formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      longDescription: formData.longDescription,
      category: formData.category as any,
      status: formData.status as any,
      featured: formData.featured,
      thumbnail: formData.thumbnail,
      images: formData.images.filter(img => img.trim()),
      video: formData.video || undefined,
      metrics: {
        timeSaved: formData.timeSaved,
        costReduction: formData.costReduction || undefined,
        efficiency: formData.efficiency,
        roi: formData.roi || undefined,
      },
      technologies: formData.technologies.filter(tech => tech.trim()),
      integrations: formData.integrations.filter(int => int.trim()),
      complexity: formData.complexity as any,
      challenge: formData.challenge,
      solution: formData.solution,
      results: formData.results.filter(result => result.trim()),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      client: formData.client || undefined,
      industry: formData.industry || undefined,
      duration: formData.duration,
      tags: formData.tags.filter(tag => tag.trim()),
      isPublic: formData.isPublic,
      viewCount: 0,
      likes: 0,
    };

    // In a real app, this would save to a database
    console.log("New Workflow:", JSON.stringify(newWorkflow, null, 2));
    alert("Workflow created! Check console for JSON output.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Core details about your automation workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="E-commerce Order Automation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle *</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Complete order processing workflow"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description for gallery cards..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Detailed Description *</Label>
            <Textarea
              id="longDescription"
              value={formData.longDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
              placeholder="Comprehensive description for case study page..."
              rows={5}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Complexity</Label>
              <Select value={formData.complexity} onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {complexities.map(comp => (
                    <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured">Featured Workflow</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
              />
              <Label htmlFor="isPublic">Public</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Assets */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Visual Assets
          </CardTitle>
          <CardDescription>
            Images and media for your workflow showcase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL *</Label>
            <Input
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Images</Label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={image}
                  onChange={(e) => {
                    const newImages = [...formData.images];
                    newImages[index] = e.target.value;
                    setFormData(prev => ({ ...prev, images: newImages }));
                  }}
                  placeholder="Image URL"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeArrayItem("images", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(prev => ({ ...prev, images: [...prev.images, ""] }))}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video URL (Optional)</Label>
            <Input
              id="video"
              value={formData.video}
              onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.value }))}
              placeholder="https://youtube.com/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button type="submit" className="glass-button">
          <Save className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>
    </form>
  );
};

export default AddWorkflowForm;
