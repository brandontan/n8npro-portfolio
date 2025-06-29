import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings, Eye, Edit, Trash2, Upload, BarChart3 } from "lucide-react";
import AddWorkflowForm from "@/components/AddWorkflowForm";
import { workflows } from "@/data/workflows";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Workflow CMS</h1>
              <p className="text-muted-foreground">Manage your automation workflow gallery</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Gallery
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Workflow
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Manage Workflows
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-6">
            <AddWorkflowForm />
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <ManageWorkflows />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ManageWorkflows = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Workflows</h2>
          <p className="text-muted-foreground">Edit, delete, or update your workflows</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Bulk Import
        </Button>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={workflow.thumbnail}
                    alt={workflow.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{workflow.title}</h3>
                    <p className="text-sm text-muted-foreground">{workflow.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {workflow.category}
                      </span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {workflow.status}
                      </span>
                      {workflow.featured && (
                        <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {workflows.reduce((sum, w) => sum + w.viewCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Across all workflows</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {workflows.reduce((sum, w) => sum + w.likes, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Engagement metric</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {workflows.filter(w => w.isPublic).length}
            </div>
            <p className="text-sm text-muted-foreground">Public workflows</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">CMS Settings</h2>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Gallery Settings</CardTitle>
          <CardDescription>Configure your workflow gallery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto-publish new workflows</h4>
              <p className="text-sm text-muted-foreground">Automatically make new workflows public</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable analytics tracking</h4>
              <p className="text-sm text-muted-foreground">Track views and engagement</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Require approval for featured workflows</h4>
              <p className="text-sm text-muted-foreground">Manual review before featuring</p>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
