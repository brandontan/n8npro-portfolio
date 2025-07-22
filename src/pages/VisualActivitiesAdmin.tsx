import { Puck } from "@measured/puck";
import "@measured/puck/dist/index.css";
import "@/styles/puck-overrides.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createActivity } from "@/lib/activities";

// Define custom components for the page builder
const config = {
  components: {
    HeadingBlock: {
      render: ({ text = "Heading", level = "h2" }) => {
        const Tag = level as keyof JSX.IntrinsicElements;
        return <Tag className="font-bold">{text}</Tag>;
      },
      fields: {
        text: { type: "text" as const },
        level: {
          type: "select" as const,
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
          ],
        },
      },
      defaultProps: {
        text: "Heading",
        level: "h2",
      },
    },
    TextBlock: {
      render: ({ text = "Enter your text here..." }) => <p className="mb-4">{text}</p>,
      fields: {
        text: { type: "textarea" as const },
      },
      defaultProps: {
        text: "Enter your text here...",
      },
    },
    ImageBlock: {
      render: ({ url = "https://via.placeholder.com/600x400", alt = "Image description" }) => (
        <img src={url} alt={alt} className="w-full h-auto rounded-lg mb-4" />
      ),
      fields: {
        url: { type: "text" as const },
        alt: { type: "text" as const },
      },
      defaultProps: {
        url: "https://via.placeholder.com/600x400",
        alt: "Image description",
      },
    },
    ButtonBlock: {
      render: ({ text = "Click me", url = "#" }) => (
        <a href={url} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4">
          {text}
        </a>
      ),
      fields: {
        text: { type: "text" as const },
        url: { type: "text" as const },
      },
      defaultProps: {
        text: "Click me",
        url: "#",
      },
    },
    VideoBlock: {
      render: ({ url = "" }) => (
        <video controls className="w-full h-auto rounded-lg mb-4">
          <source src={url} />
        </video>
      ),
      fields: {
        url: { type: "text" as const },
      },
      defaultProps: {
        url: "",
      },
    },
    CodeBlock: {
      render: ({ code = "// Your code here", language = "javascript" }) => (
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      ),
      fields: {
        code: { type: "textarea" as const },
        language: {
          type: "select" as const,
          options: [
            { label: "JavaScript", value: "javascript" },
            { label: "TypeScript", value: "typescript" },
            { label: "Python", value: "python" },
            { label: "Bash", value: "bash" },
          ],
        },
      },
      defaultProps: {
        code: "// Your code here",
        language: "javascript",
      },
    },
    Columns: {
      render: ({ children }) => (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {children}
        </div>
      ),
      fields: {},
      defaultProps: {},
    },
    Card: {
      render: ({ title = "Card Title", description = "Card description goes here", image = "https://via.placeholder.com/400x200" }) => (
        <div className="border rounded-lg overflow-hidden shadow-lg mb-4">
          {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      ),
      fields: {
        title: { type: "text" as const },
        description: { type: "textarea" as const },
        image: { type: "text" as const },
      },
      defaultProps: {
        title: "Card Title",
        description: "Card description goes here",
        image: "https://via.placeholder.com/400x200",
      },
    },
  },
};

export default function VisualActivitiesAdmin() {
  const [data, setData] = useState({
    content: [],
    root: { props: { title: "Page" } }
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("workflow");
  const [tags, setTags] = useState("");
  const [preview, setPreview] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    setIsSaving(true);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      
      // Convert Puck data to markdown/HTML content
      const content = JSON.stringify(data);
      
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
      setData({});
    } catch (error) {
      toast.error("Failed to save activity");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b p-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Visual Activity Builder</h1>
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
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              Save Activity
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex h-[calc(100vh-73px)]">
        <div className="w-64 border-r p-4 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
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
        </div>
        
        <div className="flex-1 bg-white dark:bg-gray-800" style={{ position: 'relative' }}>
          <div className="puck-editor-wrapper" style={{ height: '100%' }}>
            <Puck
              config={config}
              data={data}
              onPublish={setData}
              onChange={setData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}