import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, ShoppingCart, DollarSign, Users, BarChart, Headphones, Building2, Scale } from "lucide-react"

const industryData = {
  "Professional Services": {
    icon: <Briefcase className="w-8 h-8" />,
    description: "Streamline operations for law firms and accounting practices",
    solutions: [
      {
        title: "Client Intake Automation",
        description: "Reduce 69% of non-billable hours spent on manual intake processes. Automated conflict checks, engagement letters, and matter setup.",
        workflow: "Lead capture → conflict checks → engagement letters → matter setup → billing activation",
        metrics: "Save 25+ hours/week",
        tags: ["n8n", "Document Generation", "CRM", "Billing"]
      },
      {
        title: "Document Generation Workflows",
        description: "Automated compliance checks and document assembly for streamlined operations. Template-based generation with smart field mapping.",
        workflow: "Client data → template selection → automated assembly → compliance validation → delivery",
        metrics: "90% faster documents",
        tags: ["n8n", "Templates", "Compliance", "PDF"]
      },
      {
        title: "Time Tracking Integration",
        description: "Seamless billable hour capture - the lifeblood of law firm profitability. Automatic time entry from activities.",
        workflow: "Activity monitoring → time capture → billing integration → invoice generation",
        metrics: "Zero lost billables",
        tags: ["n8n", "Time Tracking", "Invoicing", "Analytics"]
      }
    ]
  },
  "E-commerce": {
    icon: <ShoppingCart className="w-8 h-8" />,
    description: "Automate your entire e-commerce operation from order to fulfillment",
    solutions: [
      {
        title: "Order Processing Automation",
        description: "Complete order workflow handling orders, inventory updates, and customer notifications. Reduce processing time by 90%.",
        workflow: "Order received → inventory check → payment processing → fulfillment → shipping notification",
        metrics: "Save 35+ hours/week",
        tags: ["n8n", "Shopify", "WooCommerce", "Email"]
      },
      {
        title: "Inventory Management System",
        description: "Automated inventory tracking and reordering with predictive analytics for optimal stock levels.",
        workflow: "Stock monitoring → reorder triggers → supplier orders → receiving → stock updates",
        metrics: "30% less stockouts",
        tags: ["n8n", "PostgreSQL", "Alerts", "Analytics"]
      },
      {
        title: "Customer Feedback Loop",
        description: "Automated review collection and response system to boost ratings and customer satisfaction.",
        workflow: "Order completion → review request → sentiment analysis → response generation → follow-up",
        metrics: "2x review rate",
        tags: ["n8n", "AI", "Email", "Social Proof"]
      }
    ]
  },
  "Sales & Marketing": {
    icon: <BarChart className="w-8 h-8" />,
    description: "Accelerate your sales cycle and amplify marketing impact",
    solutions: [
      {
        title: "CRM Lead Qualification",
        description: "Intelligent lead scoring and routing that automatically qualifies prospects and assigns to the right team.",
        workflow: "Lead capture → scoring → qualification → routing → notification → follow-up",
        metrics: "80% faster responses",
        tags: ["n8n", "HubSpot", "AI", "Webhooks"]
      },
      {
        title: "Social Media Pipeline",
        description: "Automated content creation and distribution across multiple platforms with performance tracking.",
        workflow: "Content generation → approval → scheduling → publishing → analytics",
        metrics: "5x content output",
        tags: ["n8n", "OpenAI", "Buffer", "Analytics"]
      },
      {
        title: "Email Campaign Automation",
        description: "Personalized email sequences with behavior-based triggers and A/B testing.",
        workflow: "Segment creation → content personalization → send → track → optimize",
        metrics: "3x email ROI",
        tags: ["n8n", "Mailchimp", "Personalization", "Analytics"]
      }
    ]
  },
  "Finance & Operations": {
    icon: <DollarSign className="w-8 h-8" />,
    description: "Automate financial processes and operational workflows",
    solutions: [
      {
        title: "Financial Reporting Dashboard",
        description: "Real-time data aggregation from multiple sources with automated report generation.",
        workflow: "Data collection → transformation → validation → report generation → distribution",
        metrics: "Eliminate manual reports",
        tags: ["n8n", "QuickBooks", "Google Sheets", "PDF"]
      },
      {
        title: "Expense Management",
        description: "Automated expense tracking, approval workflows, and reimbursement processing.",
        workflow: "Receipt capture → categorization → approval routing → reimbursement → reconciliation",
        metrics: "75% faster processing",
        tags: ["n8n", "OCR", "Approval Flows", "Accounting"]
      },
      {
        title: "Invoice Processing",
        description: "End-to-end invoice automation from receipt to payment with exception handling.",
        workflow: "Invoice receipt → data extraction → validation → approval → payment → reconciliation",
        metrics: "60% cost reduction",
        tags: ["n8n", "AI", "ERP", "Payment Systems"]
      }
    ]
  }
}

export default function IndustryNew() {
  const [selectedIndustry, setSelectedIndustry] = useState("Professional Services")

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Industry Solutions
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Tailored automation workflows for your industry's unique challenges
          </p>
        </div>

        {/* Industry Tabs */}
        <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0 mb-8">
            {Object.entries(industryData).map(([industry, data]) => (
              <TabsTrigger
                key={industry}
                value={industry}
                className="flex flex-col gap-2 p-4 data-[state=active]:bg-white/10 data-[state=active]:border-white/20 border border-white/10 rounded-xl backdrop-blur-sm transition-all"
              >
                <div className="text-white/80 data-[state=active]:text-white">
                  {data.icon}
                </div>
                <span className="text-sm font-medium text-white/80 data-[state=active]:text-white">
                  {industry}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(industryData).map(([industry, data]) => (
            <TabsContent key={industry} value={industry} className="mt-0">
              <div className="mb-8 text-center">
                <p className="text-lg text-white/70">{data.description}</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.solutions.map((solution, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">{solution.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {solution.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-black/20 rounded-lg p-3">
                        <p className="text-sm text-white/60 mb-1">Workflow:</p>
                        <p className="text-sm text-white/80 font-mono">{solution.workflow}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-green-400">
                          {solution.metrics}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {solution.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="bg-white/10 text-white/80 border-white/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-lg text-white/80 mb-4">
            Don't see your industry? I can create custom automation solutions for any business process.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm border border-white/20 transition-all"
          >
            Let's Discuss Your Needs
          </a>
        </div>
      </div>
    </div>
  )
}