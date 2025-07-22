import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import websitePlugin from "grapesjs-preset-webpage";
import basicBlockPlugin from "grapesjs-blocks-basic";
import { Button } from "@/components/ui/button";
import { Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createActivity } from "@/lib/activities";

export default function GrapesActivitiesAdmin() {
  const editorRef = useRef<any>(null);
  const [editor, setEditor] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("workflow");
  const [tags, setTags] = useState("");
  const [preview, setPreview] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!editorRef.current && !editor) {
      const grapesEditor = grapesjs.init({
        container: "#gjs-editor",
        height: "calc(100vh - 200px)",
        width: "100%",
        plugins: [websitePlugin, basicBlockPlugin],
        pluginsOpts: {
          [websitePlugin]: {
            blocks: ["link-block", "quote", "text-basic"],
          },
        },
        storageManager: false,
        deviceManager: {
          devices: [
            {
              name: "Desktop",
              width: "",
            },
            {
              name: "Mobile",
              width: "320px",
              widthMedia: "480px",
            },
          ],
        },
        blockManager: {
          appendTo: "#blocks",
        },
        layerManager: {
          appendTo: "#layers-container",
        },
        traitManager: {
          appendTo: "#trait-container",
        },
        selectorManager: {
          appendTo: "#styles-container",
        },
        styleManager: {
          appendTo: "#styles-container",
          sectors: [
            {
              name: "Dimension",
              open: false,
              buildProps: ["width", "min-height", "padding"],
              properties: [
                {
                  type: "integer",
                  name: "The width",
                  property: "width",
                  units: ["px", "%"],
                  defaults: "auto",
                  min: 0,
                },
              ],
            },
            {
              name: "Extra",
              open: false,
              buildProps: ["background-color", "box-shadow", "custom-prop"],
              properties: [
                {
                  id: "custom-prop",
                  name: "Custom Label",
                  property: "font-size",
                  type: "select",
                  defaults: "32px",
                  options: [
                    { value: "12px", name: "Tiny" },
                    { value: "18px", name: "Medium" },
                    { value: "32px", name: "Big" },
                  ],
                },
              ],
            },
          ],
        },
        panels: {
          defaults: [
            {
              id: "layers",
              el: "#layers",
              resizable: {
                maxDim: 350,
                minDim: 200,
                tc: 0,
                cr: 1,
                bc: 0,
                keyWidth: "flex-basis",
              },
            },
            {
              id: "panel-devices",
              el: ".panel__devices",
              buttons: [
                {
                  id: "device-desktop",
                  label: '<i class="fa fa-desktop"></i>',
                  command: "set-device-desktop",
                  active: true,
                  togglable: false,
                },
                {
                  id: "device-mobile",
                  label: '<i class="fa fa-mobile"></i>',
                  command: "set-device-mobile",
                  togglable: false,
                },
              ],
            },
          ],
        },
      });

      // Define commands
      grapesEditor.Commands.add("set-device-desktop", {
        run: (editor) => editor.setDevice("Desktop"),
      });
      grapesEditor.Commands.add("set-device-mobile", {
        run: (editor) => editor.setDevice("Mobile"),
      });

      setEditor(grapesEditor);
      editorRef.current = grapesEditor;
    }
  }, [editor]);

  const handleSave = async () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!editor) {
      toast.error("Editor not initialized");
      return;
    }

    setIsSaving(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      const content = `<style>${css}</style>${html}`;
      
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      
      await createActivity({
        slug,
        title,
        date: new Date().toISOString().split("T")[0],
        category: category as any,
        tags: tagsArray,
        preview,
        featured_image: null,
        content,
        published: isPublished,
      });

      toast.success("Activity saved successfully!");
      
      // Reset form
      setTitle("");
      setPreview("");
      setTags("");
      editor.setComponents("");
      editor.setStyle("");
    } catch (error) {
      toast.error("Failed to save activity");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b p-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Visual Activity Builder (GrapesJS)</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Activity Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background"
            >
              <option value="workflow">Workflow Built</option>
              <option value="client-success">Client Success</option>
              <option value="insight">Industry Insight</option>
              <option value="technical">Technical Update</option>
              <option value="case-study">Case Study</option>
            </select>
            <Button
              variant="outline"
              onClick={() => setIsPublished(!isPublished)}
            >
              {isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {isPublished ? "Published" : "Draft"}
            </Button>
            <div className="panel__devices"></div>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              Save Activity
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Blocks */}
        <div className="w-64 border-r p-4 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium">Preview Text</label>
              <textarea
                placeholder="Short description..."
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tags</label>
              <input
                type="text"
                placeholder="n8n, automation, workflow"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800"
              />
            </div>
          </div>
          
          <h3 className="text-sm font-semibold mb-2">Blocks</h3>
          <div id="blocks"></div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-white dark:bg-gray-800">
          <div id="gjs-editor"></div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l p-4 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <div id="layers-container">
            <div id="layers"></div>
          </div>
          <div id="styles-container"></div>
          <div id="trait-container"></div>
        </div>
      </div>
    </div>
  );
}