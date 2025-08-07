import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Clock, MapPin, Building, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Singapore = () => {
  return (
    <div className="min-h-screen bg-[#0B1221]">
      {/* Hero Section - Location-specific */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Primary H1 with location keywords */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              n8n Consultant Singapore - AI Automation Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Local AI Automation Expert in Singapore • Serving APAC Region • Free MVP to Start
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                Get Singapore Quote →
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
                <MapPin className="mr-2" />
                Book Local Meeting
              </Button>
            </div>
          </div>

          {/* Local Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">SGT</div>
              <div className="text-sm text-gray-400">Time Zone</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-sm text-gray-400">SG Clients</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">24hr</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">Local</div>
              <div className="text-sm text-gray-400">Support</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Business Districts */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Serving Businesses Across Singapore
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <Building className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                CBD & Raffles Place
              </h3>
              <p className="text-gray-400">
                Supporting financial institutions, banks, and corporate headquarters with enterprise automation solutions.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Banking automation</li>
                <li>• Trading workflows</li>
                <li>• Compliance automation</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Globe className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                One-North & Jurong
              </h3>
              <p className="text-gray-400">
                Partnering with tech startups, biomedical companies, and innovation hubs for cutting-edge automation.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Startup automation</li>
                <li>• R&D workflows</li>
                <li>• Lab data processing</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <Users className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">
                Changi Business Park
              </h3>
              <p className="text-gray-400">
                Enabling regional headquarters and MNCs with scalable automation infrastructure across APAC.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Regional workflows</li>
                <li>• Multi-country ops</li>
                <li>• Supply chain automation</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Focus - Singapore specific */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Industries We Serve in Singapore
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Financial Services & FinTech
              </h3>
              <p className="text-gray-400">
                Automate KYC processes, transaction monitoring, reporting to MAS, and cross-border payments:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Automated MAS reporting</li>
                <li>• KYC/AML workflows</li>
                <li>• Payment reconciliation</li>
                <li>• Risk assessment automation</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                E-commerce & Retail
              </h3>
              <p className="text-gray-400">
                Support Singapore's booming e-commerce sector with inventory, order, and fulfillment automation:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Lazada/Shopee integration</li>
                <li>• GST calculation automation</li>
                <li>• Cross-border logistics</li>
                <li>• Customer service bots</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Healthcare & Biotech
              </h3>
              <p className="text-gray-400">
                Streamline patient data, lab results, and compliance with Singapore healthcare regulations:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Patient record automation</li>
                <li>• Lab result processing</li>
                <li>• MOH compliance workflows</li>
                <li>• Appointment scheduling</li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Logistics & Supply Chain
              </h3>
              <p className="text-gray-400">
                Optimize Singapore's position as APAC logistics hub with smart automation solutions:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>• Port documentation</li>
                <li>• Customs clearance</li>
                <li>• Warehouse automation</li>
                <li>• Fleet management</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Singapore-specific Benefits */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why Singapore Businesses Choose AIFlows
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Local Understanding
              </h3>
              <p className="text-gray-400">
                Deep knowledge of Singapore's business environment, regulations (PDPA, MAS guidelines), and local market needs.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                APAC Coverage
              </h3>
              <p className="text-gray-400">
                Support regional operations from Singapore across Southeast Asia, with multi-currency and multi-language capabilities.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Same Time Zone
              </h3>
              <p className="text-gray-400">
                Real-time support during Singapore business hours (SGT). No waiting for offshore teams to wake up.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Testimonial */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-600 p-8">
            <p className="text-xl text-gray-300 italic mb-6">
              "AIFlows automated our entire order processing workflow across 5 ASEAN markets. We saved 80 hours per week and reduced errors by 95%. Their understanding of regional complexities was invaluable."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                JT
              </div>
              <div>
                <p className="text-white font-semibold">James Tan</p>
                <p className="text-gray-400">Operations Director, Singapore E-commerce Leader</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Singapore Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Local expertise. Regional reach. Global standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Get Singapore Quote
            </Button>
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-6 text-lg">
              <Clock className="mr-2" />
              Schedule SGT Meeting
            </Button>
          </div>
          <p className="mt-6 text-gray-400">
            Email: brandon@aiflows.pro | WhatsApp: Available
          </p>
        </div>
      </section>
    </div>
  );
};

export default Singapore;