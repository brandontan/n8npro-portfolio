import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Clock, DollarSign, Shield, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const N8nConsulting = () => {
  return (
    <div className="min-h-screen bg-[#0B1221]">
      {/* Hero Section - Above the Fold */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Primary H1 with high-intent keywords */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hire Expert n8n Consultant
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Professional n8n Development Services • 24-48 Hour Turnaround • Free MVP to Start
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                Get Free Consultation →
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
                View n8n Portfolio
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">100+</div>
              <div className="text-sm text-gray-400">Workflows Built</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">60hrs</div>
              <div className="text-sm text-gray-400">Saved Weekly</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">24hr</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">5.0★</div>
              <div className="text-sm text-gray-400">Client Rating</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview - Target Keywords */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            n8n Automation Services We Provide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <Zap className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                n8n Workflow Development
              </h3>
              <p className="text-gray-400 mb-4">
                Custom n8n workflow creation from scratch. API integrations, data pipelines, and complex automation logic.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />REST & GraphQL APIs</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Database connections</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Multi-step workflows</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Shield className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                Emergency n8n Support
              </h3>
              <p className="text-gray-400 mb-4">
                Fix broken n8n workflows fast. Debug errors, optimize performance, and restore automation operations.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />24-48hr turnaround</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Error debugging</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Performance optimization</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Users className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                n8n Migration Services
              </h3>
              <p className="text-gray-400 mb-4">
                Migrate from Zapier, Make.com, or Integromat to n8n. Better pricing, more control, no limits.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Zapier migration</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Make.com alternative</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Self-hosted setup</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section - Commercial Keywords */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            n8n Consulting Pricing & Rates
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Transparent pricing for n8n development services
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Quick Fix</h3>
                <div className="text-4xl font-bold text-purple-400">$500</div>
                <p className="text-gray-400 mt-2">One-time fixes</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Debug broken workflows</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Fix API connections</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />24-48hr delivery</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Basic optimization</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Book Emergency Fix
              </Button>
            </Card>

            <Card className="bg-gradient-to-b from-purple-900/20 to-purple-900/10 border-purple-600 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Project</h3>
                <div className="text-4xl font-bold text-purple-400">$2,500+</div>
                <p className="text-gray-400 mt-2">Complete workflows</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Free MVP to start</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Custom workflow design</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />API integrations</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />1 week delivery</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />30-day support</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Start Free MVP
              </Button>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-purple-400">Custom</div>
                <p className="text-gray-400 mt-2">Complex systems</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Multi-system integration</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Custom nodes</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Self-hosted setup</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Training included</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Ongoing support</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Get Custom Quote
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases - Problem Keywords */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            What Our n8n Consultants Can Automate
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Automate Repetitive Business Tasks
              </h3>
              <p className="text-gray-400">
                Stop wasting 60+ hours weekly on manual data entry, copy-paste operations, and repetitive workflows. Our n8n experts build automations that handle:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Invoice processing and bookkeeping</li>
                <li>• Customer onboarding sequences</li>
                <li>• Report generation and distribution</li>
                <li>• Data synchronization between systems</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Integrate Multiple APIs Together
              </h3>
              <p className="text-gray-400">
                Connect all your business tools into one seamless workflow. Our n8n consultants specialize in complex API integrations:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• CRM to accounting software sync</li>
                <li>• E-commerce to inventory management</li>
                <li>• Marketing tools to analytics platforms</li>
                <li>• Custom API to database connections</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Connect CRM with Email Automation
              </h3>
              <p className="text-gray-400">
                Streamline your sales and marketing operations with intelligent CRM-email integrations that nurture leads automatically:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Automated lead scoring and routing</li>
                <li>• Personalized email campaigns</li>
                <li>• Follow-up sequence automation</li>
                <li>• Sales pipeline notifications</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Build AI Customer Service Workflow
              </h3>
              <p className="text-gray-400">
                Deploy AI-powered customer service that handles 80% of inquiries automatically while maintaining quality:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• ChatGPT/Claude integration</li>
                <li>• Intelligent ticket routing</li>
                <li>• Automated FAQ responses</li>
                <li>• Escalation to human agents</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Schema Markup Ready */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions About n8n Consulting
          </h2>
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How much does it cost to hire an n8n consultant?
              </h3>
              <p className="text-gray-400">
                Our n8n consulting services start at $500 for quick fixes and $2,500+ for complete workflow projects. We offer a free MVP to demonstrate value before you commit to the full project.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How quickly can you fix my broken n8n workflow?
              </h3>
              <p className="text-gray-400">
                We provide emergency n8n support with 24-48 hour turnaround for urgent fixes. Most broken workflows can be debugged and repaired within one business day.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Why choose n8n over Zapier or Make.com?
              </h3>
              <p className="text-gray-400">
                n8n is open-source, self-hosted, and has no workflow limits. It's more cost-effective for complex automations, offers better data privacy, and provides complete control over your automation infrastructure.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do you provide n8n training and support?
              </h3>
              <p className="text-gray-400">
                Yes, all our n8n development projects include documentation and basic training. We also offer ongoing support packages and can train your team to maintain and expand workflows.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Hire an n8n Expert?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get your free MVP within one week. No risk, proven results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Book Free n8n Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
              <Clock className="mr-2" />
              Emergency Support (24hr)
            </Button>
          </div>
          <p className="mt-6 text-gray-400">
            Or email us directly: brandon@aiflows.pro
          </p>
        </div>
      </section>
    </div>
  );
};

export default N8nConsulting;