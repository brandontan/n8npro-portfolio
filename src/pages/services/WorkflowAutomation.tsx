import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Clock, DollarSign, Shield, Zap, Users, GitBranch, Activity, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkflowAutomation = () => {
  return (
    <div className="min-h-screen bg-[#0B1221]">
      {/* Hero Section - Above the Fold */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Primary H1 with high-intent keywords */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Automate Repetitive Business Tasks
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Professional Workflow Automation Services • Save 60+ Hours Weekly • Free MVP in 7 Days
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                Start Free MVP →
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
                View Automation Examples
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">60hrs</div>
              <div className="text-sm text-gray-400">Saved Weekly</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">200+</div>
              <div className="text-sm text-gray-400">Workflows Built</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">7 Days</div>
              <div className="text-sm text-gray-400">MVP Delivery</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview - Target Keywords */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Business Process Automation Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <GitBranch className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                Multi-Step Workflow Automation
              </h3>
              <p className="text-gray-400 mb-4">
                Complex business processes automated end-to-end. From trigger to completion, everything runs automatically.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Conditional logic</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Error handling</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Parallel processing</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Activity className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                Data Pipeline Automation
              </h3>
              <p className="text-gray-400 mb-4">
                Automate data collection, transformation, and distribution. ETL processes that run 24/7 without intervention.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Data validation</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Format conversion</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Scheduled runs</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Workflow className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                Business Process Optimization
              </h3>
              <p className="text-gray-400 mb-4">
                Streamline operations by removing manual steps. We identify bottlenecks and automate repetitive tasks.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Process mapping</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Bottleneck removal</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />ROI tracking</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section - Commercial Keywords */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Workflow Automation Pricing
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Risk-free with our free MVP approach
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="text-4xl font-bold text-purple-400">$1,500</div>
                <p className="text-gray-400 mt-2">Simple workflows</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />1-3 step automation</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Basic integrations</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />5 day delivery</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Documentation</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Start Small
              </Button>
            </Card>

            <Card className="bg-gradient-to-b from-purple-900/20 to-purple-900/10 border-purple-600 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="text-4xl font-bold text-purple-400">$4,500+</div>
                <p className="text-gray-400 mt-2">Complex automation</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Free MVP first</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Multi-step workflows</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Multiple integrations</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Error handling</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />30-day support</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Get Free MVP
              </Button>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-purple-400">Custom</div>
                <p className="text-gray-400 mt-2">Full automation</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Unlimited workflows</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Custom development</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Team training</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Priority support</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />SLA guarantee</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Get Quote
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases - Problem Keywords */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Workflows That Save You 60+ Hours Weekly
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Invoice Processing Automation
              </h3>
              <p className="text-gray-400">
                Stop manually processing invoices. Automate receipt, validation, approval, and payment workflows:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Extract data from PDF invoices</li>
                <li>• Match with purchase orders</li>
                <li>• Route for approval</li>
                <li>• Update accounting systems</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Customer Onboarding Automation
              </h3>
              <p className="text-gray-400">
                Create seamless onboarding experiences that run automatically for every new customer:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Welcome email sequences</li>
                <li>• Account setup automation</li>
                <li>• Document collection</li>
                <li>• Training schedule creation</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Report Generation Automation
              </h3>
              <p className="text-gray-400">
                Automatically generate and distribute reports on schedule without manual intervention:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Data collection from multiple sources</li>
                <li>• Automatic calculations</li>
                <li>• PDF/Excel generation</li>
                <li>• Email distribution to stakeholders</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Lead Management Automation
              </h3>
              <p className="text-gray-400">
                Never lose another lead. Automate capture, qualification, and nurturing processes:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Lead scoring automation</li>
                <li>• CRM data enrichment</li>
                <li>• Sales team assignment</li>
                <li>• Follow-up reminders</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Schema Markup Ready */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions About Workflow Automation
          </h2>
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How much time can workflow automation really save?
              </h3>
              <p className="text-gray-400">
                Our clients typically save 60+ hours per week by automating repetitive tasks. One e-commerce client reduced order processing time by 90%, saving 8 hours daily.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What's included in the free MVP?
              </h3>
              <p className="text-gray-400">
                The free MVP is a working prototype of your automation that demonstrates value. It typically includes 1-2 core workflows, basic integrations, and proves the ROI before you invest in the full solution.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Which tools and platforms can you automate?
              </h3>
              <p className="text-gray-400">
                We can automate virtually any tool with an API including Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, QuickBooks, Shopify, and hundreds more. If it has an API, we can automate it.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How long does it take to implement workflow automation?
              </h3>
              <p className="text-gray-400">
                Simple workflows can be implemented in 3-5 days. Complex multi-step automations typically take 1-2 weeks. We deliver the free MVP within 7 days to demonstrate value quickly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get your free MVP in 7 days. Save 60+ hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Start Free MVP Today
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
              <Clock className="mr-2" />
              Book Strategy Call
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

export default WorkflowAutomation;