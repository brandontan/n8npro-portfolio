import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Clock, DollarSign, Shield, Zap, Users, Code, Database, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiIntegration = () => {
  return (
    <div className="min-h-screen bg-[#0B1221]">
      {/* Hero Section - Above the Fold */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Primary H1 with high-intent keywords */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Emergency API Integration Help
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Professional API Integration Services • Fix Broken APIs in 24-48 Hours • REST & GraphQL Experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                Get Emergency Help →
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
                View API Portfolio
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">500+</div>
              <div className="text-sm text-gray-400">APIs Connected</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">24hr</div>
              <div className="text-sm text-gray-400">Emergency Fix</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime Record</div>
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
            API Integration Services We Provide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <Code className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                REST API Integration
              </h3>
              <p className="text-gray-400 mb-4">
                Connect any REST API to your business systems. Authentication, pagination, error handling all included.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />OAuth 2.0 & JWT</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Rate limiting</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Webhook handling</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Database className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                GraphQL API Setup
              </h3>
              <p className="text-gray-400 mb-4">
                Modern GraphQL integrations with optimized queries, mutations, and real-time subscriptions.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Query optimization</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Real-time updates</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Type safety</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Shield className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                Fix Broken API Connections
              </h3>
              <p className="text-gray-400 mb-4">
                Emergency repairs for broken API integrations. Debug authentication, fix data mapping, restore connections.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />24-48hr turnaround</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Error debugging</li>
                <li className="flex items-center"><Check size={16} className="mr-2 text-green-400" />Performance fixes</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section - Commercial Keywords */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            API Integration Pricing & Rates
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Transparent pricing for API development services
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Emergency Fix</h3>
                <div className="text-4xl font-bold text-purple-400">$750</div>
                <p className="text-gray-400 mt-2">Broken API repairs</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Fix authentication issues</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Restore broken connections</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />24-48hr delivery</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Debug error responses</li>
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
                <h3 className="text-2xl font-bold text-white mb-2">Integration</h3>
                <div className="text-4xl font-bold text-purple-400">$3,500+</div>
                <p className="text-gray-400 mt-2">Complete API setup</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Free consultation</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Custom API integration</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Data transformation</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Error handling</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Documentation included</li>
              </ul>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                Start Integration
              </Button>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-purple-400">Custom</div>
                <p className="text-gray-400 mt-2">Complex systems</p>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Multiple API orchestration</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Custom middleware</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Load balancing</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />Monitoring setup</li>
                <li className="flex items-center"><Check className="mr-2 text-green-400" size={20} />SLA guarantee</li>
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
            Common API Integration Challenges We Solve
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Connect Multiple APIs Together
              </h3>
              <p className="text-gray-400">
                Orchestrate complex data flows between multiple APIs. We handle authentication, data transformation, and synchronization:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Salesforce to HubSpot sync</li>
                <li>• Stripe to QuickBooks integration</li>
                <li>• Shopify to inventory systems</li>
                <li>• Social media API aggregation</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Fix API Authentication Errors
              </h3>
              <p className="text-gray-400">
                Resolve authentication issues that break your integrations. We fix OAuth flows, API keys, and token refresh problems:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• OAuth 2.0 token refresh</li>
                <li>• JWT token validation</li>
                <li>• API key rotation</li>
                <li>• CORS and security headers</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Handle API Rate Limiting
              </h3>
              <p className="text-gray-400">
                Implement intelligent rate limiting and retry logic to ensure your API integrations never fail:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Automatic retry with backoff</li>
                <li>• Request queue management</li>
                <li>• Rate limit monitoring</li>
                <li>• Parallel request optimization</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Transform API Data Formats
              </h3>
              <p className="text-gray-400">
                Convert between different data formats and structures to ensure seamless integration:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• JSON to XML conversion</li>
                <li>• CSV data processing</li>
                <li>• Schema mapping</li>
                <li>• Data validation & cleaning</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Schema Markup Ready */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions About API Integration
          </h2>
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How much does emergency API integration help cost?
              </h3>
              <p className="text-gray-400">
                Emergency API fixes start at $750 for critical issues with 24-48 hour turnaround. Complete API integration projects start at $3,500 depending on complexity and number of endpoints.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How quickly can you fix my broken API integration?
              </h3>
              <p className="text-gray-400">
                We provide emergency API support with 24-48 hour turnaround for critical issues. Most authentication errors and broken connections can be fixed within one business day.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What types of APIs can you integrate?
              </h3>
              <p className="text-gray-400">
                We work with REST APIs, GraphQL, SOAP, webhooks, and WebSocket connections. We've integrated major platforms like Salesforce, HubSpot, Stripe, Shopify, and hundreds of other APIs.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do you provide ongoing API monitoring and support?
              </h3>
              <p className="text-gray-400">
                Yes, we offer monitoring packages that include uptime tracking, error alerts, performance optimization, and proactive maintenance to prevent API failures before they impact your business.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Emergency API Integration Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Fix broken APIs in 24-48 hours. Get your systems talking again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Get Emergency API Help
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
              <Clock className="mr-2" />
              Book Consultation
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

export default ApiIntegration;