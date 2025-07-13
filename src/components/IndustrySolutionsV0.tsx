import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, ShoppingCart, Scale, Calculator } from "lucide-react"

const automationSolutions = [
  {
    id: 1,
    title: "E-commerce Order Automation",
    description:
      "Complete order processing workflow that can automatically handle orders, inventory updates, and customer notifications. Potential to reduce processing time by 80%.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center",
    tags: ["n8n", "Shopify API", "Email", "Slack"],
    metric: "Save 35+ hours/week",
    category: "ecommerce",
  },
  {
    id: 2,
    title: "CRM Lead Qualification System",
    description:
      "Intelligent lead scoring and routing system that can automatically qualify prospects and assign them to the right sales team members.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&crop=center",
    tags: ["n8n", "HubSpot", "AI", "Webhooks"],
    metric: "80% faster response",
    category: "ecommerce",
  },
  {
    id: 3,
    title: "Social Media Content Pipeline",
    description:
      "Automated content creation and distribution system that can generate, schedule, and publish content across multiple platforms.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop&crop=center",
    tags: ["n8n", "OpenAI", "Twitter API", "Buffer"],
    metric: "5x content output",
    category: "ecommerce",
  },
  {
    id: 4,
    title: "Financial Reporting Dashboard",
    description:
      "Real-time financial data aggregation from multiple sources with automated report generation and stakeholder notifications.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center",
    tags: ["n8n", "QuickBooks", "Google Sheets", "PDF"],
    metric: "Eliminate manual reports",
    category: "ecommerce",
  },
  {
    id: 5,
    title: "Customer Support Ticket Router",
    description:
      "Smart ticket classification and routing system that can automatically categorize support requests and assign them to specialized agents.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=300&h=200&fit=crop&crop=center",
    tags: ["n8n", "Zendesk", "NLP", "Teams"],
    metric: "90% faster resolution",
    category: "ecommerce",
  },
  {
    id: 6,
    title: "Inventory Management System",
    description:
      "Automated inventory tracking and reordering system with predictive analytics for optimal stock levels.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop&crop=center",
    tags: ["n8n", "PostgreSQL", "Alerts", "Analytics"],
    metric: "40% cost reduction",
    category: "ecommerce",
  },
]

const professionalServices = [
  {
    id: 1,
    title: "Client Intake Automation",
    description: "Reduce 69% of non-billable hours spent on manual intake processes",
    icon: <Scale className="h-6 w-6 text-white" />,
    workflow: "Lead capture → conflict checks → engagement letters → matter setup → billing activation",
    category: "law",
  },
  {
    id: 2,
    title: "Document Review Pipeline",
    description: "AI-powered document analysis and categorization for legal cases",
    icon: <Briefcase className="h-6 w-6 text-white" />,
    workflow: "Document upload → AI analysis → categorization → review assignment → approval workflow",
    category: "law",
  },
  {
    id: 3,
    title: "Tax Preparation Automation",
    description: "Streamline tax document collection and preparation processes",
    icon: <Calculator className="h-6 w-6 text-white" />,
    workflow: "Client portal → document collection → data extraction → review → filing preparation",
    category: "accounting",
  },
  {
    id: 4,
    title: "Compliance Monitoring System",
    description: "Automated tracking of regulatory requirements and deadlines",
    icon: <Briefcase className="h-6 w-6 text-white" />,
    workflow: "Regulation tracking → deadline alerts → compliance checks → reporting → audit trail",
    category: "accounting",
  },
]

export default function IndustrySolutionsV0() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <>
      {/* AI Automation Solutions Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AI Automation Solutions</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              These are the types of workflows I love building. Each one tackles those repetitive tasks that eat up your
              time so you can focus on growing your business. Let's discuss how AI automation can free you up to do what
              you do best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationSolutions.map((solution) => (
              <Card key={solution.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      {solution.metric}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">{solution.description}</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {solution.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Industry Solutions</h2>
            <h3 className="text-2xl font-semibold text-purple-200 mb-4">Professional Services</h3>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Automation solutions for law firms and accounting practices
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-white/10 border-white/20">
              <TabsTrigger
                value="overview"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="law"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900"
              >
                Law Firms
              </TabsTrigger>
              <TabsTrigger
                value="accounting"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900"
              >
                Accounting Firms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {professionalServices.map((service) => (
                  <Card key={service.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg">{service.icon}</div>
                        <Badge variant="outline" className="border-white/30 text-white">
                          {service.category === "law" ? "Law Firms" : "Accounting Firms"}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-purple-100">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">Key Automation</h4>
                        <p className="text-purple-200 text-sm">{service.workflow}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="law" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {professionalServices
                  .filter((service) => service.category === "law")
                  .map((service) => (
                    <Card key={service.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-white/20 rounded-lg">{service.icon}</div>
                        </div>
                        <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-purple-100">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="text-white font-medium">Key Automation</h4>
                          <p className="text-purple-200 text-sm">{service.workflow}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="accounting" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {professionalServices
                  .filter((service) => service.category === "accounting")
                  .map((service) => (
                    <Card key={service.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-white/20 rounded-lg">{service.icon}</div>
                        </div>
                        <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-purple-100">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="text-white font-medium">Key Automation</h4>
                          <p className="text-purple-200 text-sm">{service.workflow}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {professionalServices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* E-commerce Professional Solutions Bridge Section */}
      <section className="py-16 bg-gradient-to-b from-indigo-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">E-commerce Professional Solutions</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Specialized automation workflows designed specifically for e-commerce businesses, from order processing to
            customer engagement and inventory management.
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-3">
            Explore E-commerce Solutions Above
          </Button>
        </div>
      </section>
    </>
  )
}
