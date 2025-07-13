import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Scale, Calculator, Building2, Heart, Factory } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/* -------------------------------------------------------------------------- */
/*                            DATA (images verified)                          */
/* -------------------------------------------------------------------------- */

const automationSolutions = {
  ecommerce: [
    {
      id: 1,
      title: "Multi-Channel Order Automation",
      description:
        "Automated order processing across Shopify/WooCommerce with inventory sync and customer notifications.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Shopify", "WooCommerce", "Slack", "Stripe"],
      metric: "Save 20+ hours/week",
    },
    {
      id: 2,
      title: "AI Customer Support Automation",
      description: "OpenAI-powered chatbot handling customer inquiries with automated ticket routing.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["OpenAI", "Zendesk", "Twilio"],
      metric: "Faster resolution",
    },
    {
      id: 3,
      title: "Cart Abandonment Recovery Automation",
      description: "Automated email sequences targeting cart abandoners with personalized recovery campaigns.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HubSpot", "Shopify", "Gmail"],
      metric: "Recover lost revenue",
    },
    {
      id: 4,
      title: "Email Marketing Personalization",
      description: "Automated campaigns with customer segmentation and behavioral triggers.",
      image: "https://images.unsplash.com/photo-1563986768494-4687776d38e8?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Mailchimp", "Segment", "OpenAI"],
      metric: "Higher conversion rates",
    },
  ],
  law: [
    {
      id: 1,
      title: "Client Intake Automation",
      description: "Automated lead capture with calendar scheduling and follow-up.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Google Forms", "Calendly", "Gmail"],
      metric: "Significant time savings",
    },
    {
      id: 2,
      title: "Document Generation Automation",
      description: "AI-powered document drafting integrated with your legal templates.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["OpenAI", "Google Docs", "Dropbox"],
      metric: "Faster document creation",
    },
    {
      id: 3,
      title: "Time Tracking & Billing Automation",
      description: "Automated time capture with QuickBooks billing integration.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Clio", "Webhook"],
      metric: "Capture more billables",
    },
    {
      id: 4,
      title: "Case Management Workflow",
      description: "Automated task tracking, deadline management, and client communication.",
      image: "https://images.unsplash.com/photo-1505664198025-eb2552e773d0?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Asana", "Slack", "Google Drive"],
      metric: "Better deadline tracking",
    },
  ],
  accounting: [
    {
      id: 1,
      title: "Accounts Payable/Receivable",
      description: "Automated invoice processing with QuickBooks/Xero integration.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Xero", "Stripe"],
      metric: "Faster reconciliation",
    },
    {
      id: 2,
      title: "Tax Preparation Automation",
      description: "Automated data import from accounting systems and client portals.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Google Drive", "Gmail"],
      metric: "Streamlined tax prep",
    },
    {
      id: 3,
      title: "Client Portal Automation",
      description: "Secure document exchange with automated client notifications.",
      image: "https://images.unsplash.com/photo-1486406648428-3e8d8f3f16c0?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Google Drive", "Slack", "Webhook"],
      metric: "Secure document exchange",
    },
    {
      id: 4,
      title: "Financial Reporting Automation",
      description: "Automated report generation from QuickBooks/Xero.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Google Sheets", "Gmail"],
      metric: "Automated reporting",
    },
  ],
  realestate: [
    {
      id: 1,
      title: "Lead Management Automation",
      description: "HubSpot CRM automation with lead scoring and SMS follow-up.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HubSpot", "Twilio", "Calendly"],
      metric: "Better lead conversion",
    },
    {
      id: 2,
      title: "Transaction Management",
      description: "Document workflow automation from contract to closing.",
      image: "https://images.unsplash.com/photo-1558618256-c5b89ca7e637?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["DocuSign", "Google Drive", "Slack"],
      metric: "Faster closings",
    },
    {
      id: 3,
      title: "Property Listing Automation",
      description: "Automated listing distribution for MLS integration.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HTTP Request", "Google Sheets", "Webhook"],
      metric: "Rapid listing distribution",
    },
    {
      id: 4,
      title: "CRM Marketing Automation",
      description: "Automated drip campaigns with SMS and email nurturing.",
      image: "https://images.unsplash.com/photo-1558618256-c5b89ca7e637?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HubSpot", "Twilio", "Mailchimp"],
      metric: "More referrals",
    },
  ],
  healthcare: [
    {
      id: 1,
      title: "Patient Scheduling Automation",
      description: "Calendar integration with SMS reminders and no-show prevention.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Google Calendar", "Twilio", "Webhook"],
      metric: "Reduce no-shows",
    },
    {
      id: 2,
      title: "Patient Communication",
      description: "Automated appointment reminders and follow-up care via SMS and email.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Twilio", "Gmail", "Slack"],
      metric: "Improved compliance",
    },
    {
      id: 3,
      title: "Revenue Cycle Automation",
      description: "Automated billing workflows with Stripe and denial management.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Stripe", "QuickBooks", "Webhook"],
      metric: "Faster collections",
    },
    {
      id: 4,
      title: "Clinical Documentation",
      description: "AI-powered documentation assistance integrated with EHR systems.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["OpenAI", "Google Docs", "Webhook"],
      metric: "Less documentation time",
    },
  ],
  manufacturing: [
    {
      id: 1,
      title: "Predictive Maintenance",
      description: "IoT sensor data collection with automated maintenance scheduling.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Webhook", "Google Sheets", "Slack"],
      metric: "Reduce downtime",
    },
    {
      id: 2,
      title: "Quality Control Automation",
      description: "Automated inspection data collection with defect tracking.",
      image: "https://images.unsplash.com/photo-1565520651213-25c8b2688cd5?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Webhook", "Google Sheets", "Gmail"],
      metric: "Better quality control",
    },
    {
      id: 3,
      title: "Supply Chain Automation",
      description: "Vendor management workflows with ERP integration.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HTTP Request", "QuickBooks", "Slack"],
      metric: "Shorter lead times",
    },
    {
      id: 4,
      title: "Production Planning",
      description: "Resource allocation and scheduling with real-time status updates.",
      image: "https://images.unsplash.com/photo-1565520651213-25c8b2688cd5?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Google Sheets", "Slack", "Webhook"],
      metric: "Boost efficiency",
    },
  ],
} as const

/* -------------------------------------------------------------------------- */
/*                                UI helpers                                  */
/* -------------------------------------------------------------------------- */

const industries = [
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: <ShoppingCart className="h-5 w-5" />,
    color: "bg-blue-500",
  },
  { id: "law", name: "Law", icon: <Scale className="h-5 w-5" />, color: "bg-purple-500" },
  {
    id: "accounting",
    name: "Accounting",
    icon: <Calculator className="h-5 w-5" />,
    color: "bg-green-500",
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: <Building2 className="h-5 w-5" />,
    color: "bg-orange-500",
  },
  { id: "healthcare", name: "Healthcare", icon: <Heart className="h-5 w-5" />, color: "bg-red-500" },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: <Factory className="h-5 w-5" />,
    color: "bg-gray-500",
  },
] as const

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function IndustryAutomationHub() {
  const [selectedIndustry, setSelectedIndustry] = useState("ecommerce")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const currentSolutions = automationSolutions[selectedIndustry as keyof typeof automationSolutions] ?? []
  const selectedIndustryData = industries.find((i) => i.id === selectedIndustry)!

  /* --------------------------- carousel helpers --------------------------- */
  const nextSlide = () => setCurrentSlide((s) => Math.min(s + 1, currentSolutions.length - 1))

  const prevSlide = () => setCurrentSlide((s) => Math.max(s - 1, 0))

  const handleIndustryChange = (id: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedIndustry(id)
      setCurrentSlide(0)
      setIsTransitioning(false)
    }, 150)
  }

  /* ----------------------------- touch events ----------------------------- */
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX)
  const onTouchEnd = () => {
    const distance = touchStart - touchEnd
    if (distance > 50) nextSlide()
    if (distance < -50) prevSlide()
  }

  /* -------------------------------- render -------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Industry&nbsp;Solutions</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose your industry and discover powerful automation workflows.
          </p>
        </header>

        {/* Industry selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-3 md:gap-4">
          {industries.map((ind) => (
            <Button
              key={ind.id}
              onClick={() => handleIndustryChange(ind.id)}
              variant={selectedIndustry === ind.id ? "default" : "outline"}
              className={
                selectedIndustry === ind.id
                  ? `${ind.color} text-white shadow-lg scale-105`
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }
            >
              {ind.icon}
              <span className="ml-2 font-medium">{ind.name}</span>
            </Button>
          ))}
        </div>

        {/* Industry info badge */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full">
            <span className={`p-2 ${selectedIndustryData.color} rounded-full`}>{selectedIndustryData.icon}</span>
            <strong className="text-white">{selectedIndustryData.name} Solutions</strong>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {currentSolutions.length} Automations
            </Badge>
          </span>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* arrows */}
          <Button
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            size="icon"
            onClick={nextSlide}
            disabled={currentSlide === currentSolutions.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>

          {/* track */}
          <div
            ref={carouselRef}
            className="overflow-hidden rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`flex transition-transform duration-500 ${isTransitioning ? "opacity-50" : "opacity-100"}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {currentSolutions.map((sln) => (
                <div key={sln.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                      {/* image */}
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={sln.image || "/placeholder.svg"}
                          alt={sln.title}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-green-500 text-white">{sln.metric}</Badge>
                      </div>

                      {/* text */}
                      <div className="flex flex-col justify-between h-full">
                        <CardHeader className="p-0">
                          <CardTitle className="text-2xl md:text-3xl text-white">{sln.title}</CardTitle>
                          <CardDescription className="text-slate-300">{sln.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="p-0">
                          <div className="flex flex-wrap gap-2 mt-4">
                            {sln.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-white/30 text-white bg-white/5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-8">
            {currentSolutions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === currentSlide ? `${selectedIndustryData.color} scale-125` : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* slide counter */}
          <p className="text-center mt-4 text-white/70 text-sm">
            {currentSlide + 1} of {currentSolutions.length}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to automate your {selectedIndustryData.name.toLowerCase()} business?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how these workflows can be customized for you.
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8">
            Schedule a consultation
          </Button>
        </div>
      </div>
    </div>
  )
}