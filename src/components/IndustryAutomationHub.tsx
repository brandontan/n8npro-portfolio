import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Scale, Calculator, Building2, Heart, Factory, Database, Cloud, Zap, CheckCircle, Webhook, Sparkles, Mail, BarChart, FileText, Calendar, Clock, Users, DollarSign, Package, Brain, Globe, Send, Bell, Activity, Lock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedWorkflow from "./AnimatedWorkflow"

/* -------------------------------------------------------------------------- */
/*                            Icon Mapping                                    */
/* -------------------------------------------------------------------------- */

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Database,
  Cloud,
  Zap,
  CheckCircle,
  Webhook,
  Sparkles,
  Mail,
  BarChart,
  FileText,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  Brain,
  Globe,
  Send,
  Bell,
  Activity,
  Lock,
  Calculator,
}

/* -------------------------------------------------------------------------- */
/*                            DATA (images verified)                          */
/* -------------------------------------------------------------------------- */

interface Automation {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  metric: string;
  workflow?: Array<{ icon: string; label: string }>;
}

const automationSolutions: Record<string, Automation[]> = {
  ecommerce: [
    {
      id: 1,
      title: "Multi-Channel Order Automation",
      description:
        "Streamline order fulfillment across multiple sales channels. Automatically sync orders from Shopify, WooCommerce, and marketplaces into a central system. Updates inventory in real-time, generates shipping labels, sends tracking info to customers, and posts updates to your team Slack.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Shopify API", "WooCommerce", "ShipStation", "Slack"],
      metric: "Save 20+ hours/week",
      workflow: [
        { icon: "ShoppingCart", label: "Order Received" },
        { icon: "DollarSign", label: "Verify Payment" },
        { icon: "Database", label: "Sync Inventory" },
        { icon: "Package", label: "Create Shipment" },
        { icon: "Mail", label: "Send Tracking" },
        { icon: "CheckCircle", label: "Update Status" }
      ]
    },
    {
      id: 2,
      title: "AI Customer Support Automation",
      description: "Reduce support costs while delighting customers with instant, accurate responses. AI analyzes inquiries, searches your knowledge base, and provides personalized solutions. Complex issues are seamlessly escalated to agents with full context and suggested responses.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["OpenAI", "Zendesk", "Intercom", "KB"],
      metric: "Resolve 60% instantly",
      workflow: [
        { icon: "Bell", label: "Ticket Created" },
        { icon: "Brain", label: "AI Analysis" },
        { icon: "FileText", label: "Search KB" },
        { icon: "Send", label: "Auto Reply" },
        { icon: "CheckCircle", label: "Resolve" }
      ]
    },
    {
      id: 3,
      title: "Cart Abandonment Recovery Automation",
      description: "Recover 15-25% of lost revenue by detecting abandoned carts and triggering personalized multi-step email campaigns. Integrates with Shopify/WooCommerce to track cart events, enriches customer data, and sends behavior-triggered emails with dynamic content and discount codes.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Shopify API", "OpenAI", "SendGrid", "CRM"],
      metric: "15-25% revenue recovery",
      workflow: [
        { icon: "Webhook", label: "Cart Trigger" },
        { icon: "Database", label: "Enrich Data" },
        { icon: "Sparkles", label: "AI Personalize" },
        { icon: "Mail", label: "Email Campaign" },
        { icon: "BarChart", label: "Track Results" }
      ]
    },
    {
      id: 4,
      title: "Email Marketing Personalization",
      description: "Boost revenue with AI-powered email campaigns that segment customers by purchase history, browsing behavior, and engagement patterns. Automatically generates personalized subject lines, recommends products based on past purchases, and triggers campaigns at optimal send times for each customer.",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Mailchimp", "Segment", "OpenAI"],
      metric: "3.5x email ROI increase",
      workflow: [
        { icon: "Database", label: "Segment" },
        { icon: "Brain", label: "Personalize" },
        { icon: "Clock", label: "Schedule" },
        { icon: "Mail", label: "Send" },
        { icon: "BarChart", label: "Track ROI" }
      ]
    },
  ],
  law: [
    {
      id: 1,
      title: "Client Intake Automation",
      description: "Transform your intake process from days to hours. Captures leads from website forms, runs automated conflict checks against your client database, schedules consultations based on attorney availability, generates engagement letters from templates, and creates matters in your practice management system.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Typeform", "Calendly", "Clio API", "DocuSign"],
      metric: "Reduce intake by 85%",
      workflow: [
        { icon: "FileText", label: "Intake Form" },
        { icon: "Lock", label: "Conflict Check" },
        { icon: "Calendar", label: "Book Consult" },
        { icon: "FileText", label: "Engagement" },
        { icon: "Database", label: "Create Case" }
      ]
    },
    {
      id: 2,
      title: "Document Generation Automation",
      description: "Generate complex legal documents in minutes, not hours. AI analyzes your templates and prior documents to draft contracts, pleadings, and agreements. Automatically pulls client data from your practice management system, applies jurisdiction-specific clauses, and maintains consistent formatting across all documents.",
      image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["OpenAI", "Google Docs", "Dropbox"],
      metric: "90% faster drafting",
      workflow: [
        { icon: "Database", label: "Pull Client Data" },
        { icon: "FileText", label: "Select Template" },
        { icon: "Brain", label: "AI Draft" },
        { icon: "Lock", label: "Apply Clauses" },
        { icon: "CheckCircle", label: "Final Review" }
      ]
    },
    {
      id: 3,
      title: "Time Tracking & Billing Automation",
      description: "Never lose billable time again. Automatically captures time from emails, calendar events, document edits, and phone calls. AI categorizes activities by matter, suggests billing descriptions, and generates draft invoices. Integrates with QuickBooks for seamless billing and AR management.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Clio", "Gmail", "Calendar"],
      metric: "Capture 15% more billables",
      workflow: [
        { icon: "Clock", label: "Track Time" },
        { icon: "Brain", label: "Categorize" },
        { icon: "FileText", label: "Log Entries" },
        { icon: "Calculator", label: "Invoice" },
        { icon: "DollarSign", label: "Payment" }
      ]
    },
    {
      id: 4,
      title: "Case Management Workflow",
      description: "Never miss a deadline with automated case tracking that monitors court rules, calculates response dates, and creates task chains for your team. Sends proactive alerts, distributes work based on attorney availability, and maintains audit trails for malpractice protection.",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Asana", "Slack", "Google Drive"],
      metric: "100% deadline compliance",
      workflow: [
        { icon: "FileText", label: "Filing Received" },
        { icon: "Calculator", label: "Set Deadlines" },
        { icon: "Users", label: "Assign Tasks" },
        { icon: "Bell", label: "Send Reminders" },
        { icon: "CheckCircle", label: "Complete" }
      ]
    },
  ],
  accounting: [
    {
      id: 1,
      title: "Accounts Payable/Receivable",
      description: "Streamline your AP/AR workflow by automatically capturing invoices from email, extracting data with AI, matching to purchase orders, and syncing directly to QuickBooks or Xero. Reduces manual entry errors and speeds up payment cycles.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Xero", "Stripe"],
      metric: "80% faster reconciliation",
      workflow: [
        { icon: "Mail", label: "Receive Invoice" },
        { icon: "Brain", label: "AI Extract Data" },
        { icon: "Database", label: "Match PO" },
        { icon: "Calculator", label: "Sync to QB/Xero" },
        { icon: "CheckCircle", label: "Mark Processed" }
      ]
    },
    {
      id: 2,
      title: "Tax Preparation Automation",
      description: "Eliminate manual data entry during tax season by automatically importing financial data from QuickBooks, bank statements, and client portals. Categorizes transactions, flags potential deductions, and prepares preliminary tax documents for review.",
      image: "https://images.unsplash.com/photo-1554224155-a1487473ffd9?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Google Drive", "Gmail"],
      metric: "70% less prep time",
      workflow: [
        { icon: "Database", label: "Import Data" },
        { icon: "Brain", label: "Categorize Trans" },
        { icon: "Calculator", label: "Find Deductions" },
        { icon: "FileText", label: "Generate Forms" },
        { icon: "CheckCircle", label: "Review Ready" }
      ]
    },
    {
      id: 3,
      title: "Client Portal Automation",
      description: "Create a secure, automated document exchange that clients love. Automatically organizes uploaded documents by client and tax year, sends reminders for missing items, validates document completeness, and maintains audit trails. Includes 2FA, encryption, and automatic retention policies.",
      image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["SharePoint", "Email", "2FA", "Encryption"],
      metric: "95% client adoption rate",
      workflow: [
        { icon: "Bell", label: "Request Docs" },
        { icon: "Lock", label: "Secure Upload" },
        { icon: "Database", label: "Auto-Organize" },
        { icon: "CheckCircle", label: "Validate" },
        { icon: "Mail", label: "Confirm Receipt" }
      ]
    },
    {
      id: 4,
      title: "Financial Reporting Automation",
      description: "Deliver professional financial reports to clients automatically. Pulls data from QuickBooks/Xero, generates P&L statements, balance sheets, and cash flow reports with variance analysis. Customizes reports by client preferences, adds commentary on key metrics, and delivers via secure portal or email.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["QuickBooks", "Google Sheets", "Gmail"],
      metric: "Reports in 5 minutes",
      workflow: [
        { icon: "Database", label: "Pull GL Data" },
        { icon: "Calculator", label: "Run Calculations" },
        { icon: "BarChart", label: "Generate Reports" },
        { icon: "Sparkles", label: "Add Insights" },
        { icon: "Send", label: "Deliver" }
      ]
    },
  ],
  realestate: [
    {
      id: 1,
      title: "Lead Management Automation",
      description: "Never let a hot lead go cold. Automatically captures leads from multiple sources, scores them based on behavior and demographics, triggers personalized SMS sequences, and books viewings when prospects show high intent. Integrates with HubSpot to track every interaction from first touch to closing.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HubSpot", "Twilio", "Calendly"],
      metric: "25% better conversion",
      workflow: [
        { icon: "Globe", label: "Lead Captured" },
        { icon: "Database", label: "CRM Entry" },
        { icon: "Sparkles", label: "Lead Scoring" },
        { icon: "Send", label: "SMS Follow-up" },
        { icon: "Calendar", label: "Book/Nurture" }
      ]
    },
    {
      id: 2,
      title: "Transaction Management",
      description: "Streamline every real estate transaction from offer to closing. Automatically tracks critical dates, sends reminders for contingencies, routes documents for signatures, coordinates with title companies, and keeps all parties updated. Creates a central transaction hub where agents, buyers, sellers, and attorneys stay in sync.",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["DocuSign", "Google Drive", "Slack"],
      metric: "Close 30% faster",
      workflow: [
        { icon: "FileText", label: "Offer Accepted" },
        { icon: "Calendar", label: "Set Milestones" },
        { icon: "Users", label: "Coordinate Services" },
        { icon: "Send", label: "Route Documents" },
        { icon: "Bell", label: "Send Reminders" },
        { icon: "CheckCircle", label: "Track to Close" }
      ]
    },
    {
      id: 3,
      title: "Property Listing Automation",
      description: "Instantly distribute new property listings across multiple MLS platforms, real estate portals, and social media channels. Automatically formats listing data, optimizes images, and tracks syndication status across all platforms from a single dashboard.",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["MLS API", "Zillow", "Social Media", "Analytics"],
      metric: "List in 5 minutes",
      workflow: [
        { icon: "FileText", label: "Create Listing" },
        { icon: "Sparkles", label: "Optimize Images" },
        { icon: "Globe", label: "Syndicate MLS" },
        { icon: "Send", label: "Post Social" },
        { icon: "Activity", label: "Track Views" }
      ]
    },
    {
      id: 4,
      title: "CRM Marketing Automation",
      description: "Keep your pipeline full with intelligent nurture campaigns that adapt to lead behavior. Automatically segments contacts by buyer stage, sends personalized property alerts, schedules follow-ups based on engagement, and triggers milestone communications for past clients to generate referrals.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HubSpot", "Twilio", "Mailchimp"],
      metric: "40% more referrals",
      workflow: [
        { icon: "Database", label: "Segment Leads" },
        { icon: "Brain", label: "Score Behavior" },
        { icon: "Mail", label: "Send Campaign" },
        { icon: "BarChart", label: "Track" },
        { icon: "Users", label: "Referrals" }
      ]
    },
  ],
  healthcare: [
    {
      id: 1,
      title: "Patient Scheduling Automation",
      description: "Cut no-shows by 35% with intelligent appointment management. Automatically sends multi-touch reminders via SMS and email, detects high-risk appointments, offers easy rescheduling options, and fills cancelled slots from your waitlist. Integrates with Epic/Cerner for seamless scheduling.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Epic/Cerner", "Twilio", "Calendar", "Portal"],
      metric: "Reduce no-shows by 35%",
      workflow: [
        { icon: "Calendar", label: "Appointment Set" },
        { icon: "Clock", label: "24hr Reminder" },
        { icon: "Send", label: "SMS Alert" },
        { icon: "Bell", label: "Day-of Reminder" },
        { icon: "CheckCircle", label: "Confirm Arrival" }
      ]
    },
    {
      id: 2,
      title: "Patient Communication",
      description: "Keep patients engaged throughout their care journey. Sends pre-appointment prep instructions, medication reminders, post-visit care plans, and satisfaction surveys. Proactively identifies at-risk patients for intervention before issues escalate.",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Twilio", "Epic/Cerner", "Portal", "AI"],
      metric: "95% show rate",
      workflow: [
        { icon: "Calendar", label: "Visit Scheduled" },
        { icon: "Send", label: "Instructions" },
        { icon: "Bell", label: "Day-of Reminder" },
        { icon: "FileText", label: "Care Plan" },
        { icon: "Activity", label: "Monitor Progress" }
      ]
    },
    {
      id: 3,
      title: "Revenue Cycle Automation",
      description: "Accelerate collections and reduce denials with intelligent billing automation. Verifies insurance eligibility before visits, submits clean claims within 24 hours, tracks claim status, automatically appeals denials with supporting documentation, and sends patient payment reminders via text and email.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Clearinghouse API", "EHR", "Payment Portal", "SMS"],
      metric: "Collect 40% faster",
      workflow: [
        { icon: "Lock", label: "Verify Insurance" },
        { icon: "FileText", label: "Submit Claims" },
        { icon: "Activity", label: "Track Status" },
        { icon: "Bell", label: "Handle Denials" },
        { icon: "DollarSign", label: "Collect Payment" }
      ]
    },
    {
      id: 4,
      title: "Clinical Documentation",
      description: "Let doctors focus on patients, not paperwork. AI listens to patient encounters, generates structured SOAP notes, suggests appropriate billing codes, and integrates directly with your EHR. Reviews past visits for context and flags important changes.",
      image: "https://images.unsplash.com/photo-1581595220975-119360b1c63f?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["AI Scribe", "Epic/Cerner", "Voice", "ICD-10"],
      metric: "Save 2 hours/day charting",
      workflow: [
        { icon: "Activity", label: "Record Visit" },
        { icon: "Brain", label: "AI Transcribe" },
        { icon: "FileText", label: "Generate SOAP" },
        { icon: "Calculator", label: "Suggest Codes" },
        { icon: "Database", label: "Push to EHR" }
      ]
    },
  ],
  manufacturing: [
    {
      id: 1,
      title: "Predictive Maintenance",
      description: "Prevent costly breakdowns before they happen. Continuously monitors equipment health through IoT sensors, uses ML to predict failures weeks in advance, automatically schedules maintenance during optimal production windows, and alerts technicians with specific repair instructions. Reduces downtime by 45% on average.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["IoT Sensors", "ML Analysis", "SMS Alerts", "ERP"],
      metric: "Reduce downtime by 45%",
      workflow: [
        { icon: "Activity", label: "IoT Data Stream" },
        { icon: "Brain", label: "Analyze Patterns" },
        { icon: "Bell", label: "Alert Threshold" },
        { icon: "Calendar", label: "Schedule Service" },
        { icon: "Users", label: "Notify Team" }
      ]
    },
    {
      id: 2,
      title: "Quality Control Automation",
      description: "Catch defects before they reach customers. Automatically collects inspection data from sensors and cameras, applies AI to detect anomalies, tracks defect patterns across shifts, and triggers immediate alerts when quality drops below thresholds.",
      image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["Computer Vision", "IoT", "Dashboard", "Alerts"],
      metric: "Reduce defects by 70%",
      workflow: [
        { icon: "Activity", label: "Inspect" },
        { icon: "Brain", label: "AI Analysis" },
        { icon: "Bell", label: "Flag Defects" },
        { icon: "Lock", label: "Quarantine" },
        { icon: "Database", label: "Log Results" },
        { icon: "BarChart", label: "Track Trends" }
      ]
    },
    {
      id: 3,
      title: "Supply Chain Automation",
      description: "Automate your entire vendor lifecycle from onboarding to payment. Tracks purchase orders, manages approvals, monitors delivery schedules, and integrates with your ERP system for seamless inventory updates and financial reconciliation.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["HTTP Request", "QuickBooks", "Slack"],
      metric: "30% shorter lead times",
      workflow: [
        { icon: "FileText", label: "Create PO" },
        { icon: "Users", label: "Route Approval" },
        { icon: "Package", label: "Track Shipment" },
        { icon: "CheckCircle", label: "Receive" },
        { icon: "Database", label: "Update Inventory" },
        { icon: "DollarSign", label: "Process Payment" }
      ]
    },
    {
      id: 4,
      title: "Production Planning",
      description: "Optimize production schedules by automatically allocating resources based on demand forecasts, machine availability, and workforce capacity. Provides real-time dashboards showing production status, bottlenecks, and completion estimates.",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=400&h=300&q=80",
      tags: ["MES", "Forecasting", "Dashboard", "Alerts"],
      metric: "25% efficiency gain",
      workflow: [
        { icon: "BarChart", label: "Analyze Demand" },
        { icon: "Calculator", label: "Plan Schedule" },
        { icon: "Users", label: "Assign Resources" },
        { icon: "Activity", label: "Monitor Progress" },
        { icon: "CheckCircle", label: "Complete" }
      ]
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
    lineColor: "#3b82f6",
  },
  { 
    id: "law", 
    name: "Law", 
    icon: <Scale className="h-5 w-5" />, 
    color: "bg-blue-500",
    lineColor: "#3b82f6",
  },
  {
    id: "accounting",
    name: "Accounting",
    icon: <Calculator className="h-5 w-5" />,
    color: "bg-blue-500",
    lineColor: "#3b82f6",
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: <Building2 className="h-5 w-5" />,
    color: "bg-blue-500",
    lineColor: "#3b82f6",
  },
  { 
    id: "healthcare", 
    name: "Healthcare", 
    icon: <Heart className="h-5 w-5" />, 
    color: "bg-blue-500",
    lineColor: "#3b82f6",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: <Factory className="h-5 w-5" />,
    color: "bg-blue-500",
    lineColor: "#3b82f6",
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
            Discover impactful intelligent automations.
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

                        <CardContent className="p-0 space-y-4">
                          <div className="flex flex-wrap gap-2 mt-4">
                            {sln.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-white/30 text-white bg-white/5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {/* Animated Workflow */}
                          {sln.workflow && (
                            <div className="mt-6">
                              <AnimatedWorkflow 
                                workflow={sln.workflow}
                                color={selectedIndustryData.lineColor}
                              />
                            </div>
                          )}
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

      </div>
    </div>
  )
}