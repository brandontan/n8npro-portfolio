import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Copy, ExternalLink, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function GhostSetupGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://ghost.org/docs/content-api/', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ghost API Docs
          </Button>
        </div>
      </div>

      {/* Guide Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Ghost CMS Integration Guide</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Step-by-step instructions to connect your Ghost blog to this portfolio
        </p>

        {/* Step 1: Sign Up */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">1</span>
              Sign Up for Ghost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Choose one of these options to get started with Ghost:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Option A: Ghost(Pro) Hosting</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Managed hosting by the Ghost team. No server setup required.
                </p>
                <ul className="text-sm space-y-1 mb-3">
                  <li>✓ 14-day free trial</li>
                  <li>✓ Automatic updates</li>
                  <li>✓ SSL included</li>
                  <li>✓ Daily backups</li>
                </ul>
                <Button 
                  size="sm"
                  onClick={() => window.open('https://ghost.org/pricing/', '_blank')}
                >
                  Start Free Trial
                </Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Option B: Self-Host</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Install Ghost on your own server (VPS, DigitalOcean, etc.)
                </p>
                <ul className="text-sm space-y-1 mb-3">
                  <li>✓ Full control</li>
                  <li>✓ Custom domain</li>
                  <li>✓ No hosting fees</li>
                  <li>✓ Requires technical setup</li>
                </ul>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => window.open('https://ghost.org/docs/install/', '_blank')}
                >
                  Installation Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Access Admin */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">2</span>
              Access Your Ghost Admin Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Once your Ghost site is set up, access the admin panel:</p>
            
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm font-mono">https://your-site.ghost.io/ghost/</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Replace "your-site" with your actual Ghost subdomain
              </p>
            </div>
            
            <p className="text-sm">
              Log in with the admin credentials you created during setup.
            </p>
          </CardContent>
        </Card>

        {/* Step 3: Create Integration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">3</span>
              Create a Custom Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>In your Ghost admin panel, create a custom integration for API access:</p>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-purple-600 font-bold">a.</span>
                <div>
                  <p>Navigate to <strong>Settings</strong> in the left sidebar</p>
                  <img 
                    src="https://ghost.org/images/admin-settings-nav.png" 
                    alt="Settings navigation"
                    className="mt-2 border rounded shadow-sm max-w-xs"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-purple-600 font-bold">b.</span>
                <div>
                  <p>Scroll down and click on <strong>Integrations</strong></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You'll see a list of available integrations like Zapier, Slack, etc.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-purple-600 font-bold">c.</span>
                <div>
                  <p>Click the <strong>"+ Add custom integration"</strong> button at the bottom</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-purple-600 font-bold">d.</span>
                <div>
                  <p>Give your integration a name, like <strong>"Portfolio Website"</strong></p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You can also add a description and icon if you want
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-purple-600 font-bold">e.</span>
                <div>
                  <p>Click <strong>"Create"</strong> to generate your API keys</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Copy API Keys */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">4</span>
              Copy Your API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>After creating the integration, you'll see your API keys:</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Content API Key</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  This is what you need - it allows read-only access to your published content
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg font-mono text-sm">
                  22444f78447824223cefc48062
                  <p className="text-xs text-gray-500 mt-1">Example key format - yours will be different</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm">
                  <strong>⚠️ Important:</strong> The Content API Key is safe to use in frontend applications. 
                  It only provides read access to published content. Never use the Admin API Key in client-side code!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Configure Portfolio */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">5</span>
              Configure Your Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Add your Ghost site details to your portfolio's environment variables:</p>
            
            <div className="space-y-3">
              <div>
                <p className="font-semibold mb-2">Create/Update your .env file:</p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`# Ghost CMS Configuration
VITE_GHOST_URL=https://your-site.ghost.io
VITE_GHOST_CONTENT_KEY=your-content-api-key-here`}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(
                      `VITE_GHOST_URL=https://your-site.ghost.io\nVITE_GHOST_CONTENT_KEY=your-content-api-key-here`,
                      'env'
                    )}
                  >
                    {copiedCode === 'env' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm">Replace:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">your-site</code> with your Ghost subdomain</li>
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">your-content-api-key-here</code> with your actual Content API Key</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 6: Test Connection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">6</span>
              Test Your Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Restart your development server to load the new environment variables:</p>
            
            <div className="space-y-3">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
{`# Stop the server (Ctrl+C) then restart:
npm run dev`}
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard('npm run dev', 'restart')}
                >
                  {copiedCode === 'restart' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              <p className="text-sm">
                Visit your blog page - you should now see your Ghost posts instead of the demo content!
              </p>
              
              <Button 
                onClick={() => window.location.href = '/blog'}
              >
                View Your Blog
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Posts not showing up?</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Make sure you have published posts (drafts won't appear)</li>
                <li>• Check that your Ghost site URL includes the protocol (https://)</li>
                <li>• Verify the Content API Key is copied correctly (no extra spaces)</li>
                <li>• Open browser console (F12) to check for error messages</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">CORS errors?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ghost's Content API is configured to work from any domain. If you see CORS errors,
                ensure you're using the Content API Key (not Admin API Key).
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Need more help? Check out these resources:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('https://ghost.org/docs/content-api/', '_blank')}
                >
                  API Documentation
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('https://forum.ghost.org/', '_blank')}
                >
                  Ghost Forum
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('https://ghost.org/help/', '_blank')}
                >
                  Ghost Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}