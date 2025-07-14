import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, FileText, Scale, Clock, Users, DollarSign, Briefcase, Send, Zap, CheckCircle, AlertCircle, Database, FileCheck, TrendingUp } from "lucide-react"
import AnimatedWorkflow from "./AnimatedWorkflow"

interface ServiceCard {
  id: number
  category: string
  title: string
  description: string
  workflow: string
  workflowNodes?: Array<{
    icon: React.ComponentType<{ className?: string }>
    label: string
  }>
  icon: React.ReactNode
}

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    category: "Law Firms",
    title: "Client Intake Automation",
    description: "Reduce 69% of non-billable hours spent on manual intake processes",
    workflow: "Lead capture → conflict checks → engagement letters → matter setup → billing activation",
    workflowNodes: [
      { icon: Users, label: "Capture" },
      { icon: AlertCircle, label: "Check" },
      { icon: FileText, label: "Letters" },
      { icon: Briefcase, label: "Setup" },
      { icon: DollarSign, label: "Billing" }
    ],
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 2,
    category: "Law Firms",
    title: "Document Generation Workflows",
    description: "Automated compliance checks and document assembly for streamlined operations",
    workflow: "Client data → template selection → automated assembly → compliance validation → delivery",
    workflowNodes: [
      { icon: Database, label: "Data" },
      { icon: FileText, label: "Template" },
      { icon: Zap, label: "Assembly" },
      { icon: CheckCircle, label: "Validate" },
      { icon: Send, label: "Deliver" }
    ],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 3,
    category: "Law Firms",
    title: "Time Tracking Integration",
    description: "Seamless billable hour capture - the lifeblood of law firm profitability",
    workflow: "Activity monitoring → time capture → billing integration → invoice generation → payment tracking",
    workflowNodes: [
      { icon: Clock, label: "Monitor" },
      { icon: Zap, label: "Capture" },
      { icon: DollarSign, label: "Billing" },
      { icon: FileText, label: "Invoice" },
      { icon: CheckCircle, label: "Payment" }
    ],
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 4,
    category: "Law Firms",
    title: "Case Status Updates",
    description: "Automated client communication and case management workflows",
    workflow: "Court filings → status updates → client notifications → calendar sync → billing entries",
    workflowNodes: [
      { icon: Scale, label: "Filing" },
      { icon: TrendingUp, label: "Update" },
      { icon: Send, label: "Notify" },
      { icon: Clock, label: "Sync" },
      { icon: DollarSign, label: "Bill" }
    ],
    icon: <Scale className="w-6 h-6" />,
  },
  {
    id: 5,
    category: "Law Firms",
    title: "Trust Accounting Automation",
    description: "Critical compliance automation for trust account management and regulations",
    workflow: "Trust deposits → compliance monitoring → reconciliation → reporting → audit trails",
    workflowNodes: [
      { icon: DollarSign, label: "Deposit" },
      { icon: AlertCircle, label: "Monitor" },
      { icon: CheckCircle, label: "Reconcile" },
      { icon: FileText, label: "Report" },
      { icon: FileCheck, label: "Audit" }
    ],
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: 6,
    category: "Accounting Firms",
    title: "Tax Workflow Automation",
    description: "AI-powered data entry and predictive analytics for tax preparation",
    workflow: "OCR document capture → data extraction → tax software integration → review workflows → filing",
    workflowNodes: [
      { icon: FileText, label: "Capture" },
      { icon: Database, label: "Extract" },
      { icon: Zap, label: "Integrate" },
      { icon: CheckCircle, label: "Review" },
      { icon: Send, label: "File" }
    ],
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: 7,
    category: "Accounting Firms",
    title: "Client Onboarding",
    description: "Real-time analytics and RPA for streamlined client management",
    workflow: "Lead qualification → engagement setup → document collection → system provisioning → workflow activation",
    workflowNodes: [
      { icon: Users, label: "Qualify" },
      { icon: Briefcase, label: "Setup" },
      { icon: FileText, label: "Collect" },
      { icon: Database, label: "Provision" },
      { icon: Zap, label: "Activate" }
    ],
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 8,
    category: "Accounting Firms",
    title: "Recurring Report Generation",
    description: "Reduce mundane tasks while enhancing accuracy and financial insights",
    workflow: "Data aggregation → report generation → quality checks → client delivery → feedback loops",
    workflowNodes: [
      { icon: Database, label: "Aggregate" },
      { icon: FileText, label: "Generate" },
      { icon: CheckCircle, label: "QA" },
      { icon: Send, label: "Deliver" },
      { icon: TrendingUp, label: "Feedback" }
    ],
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 9,
    category: "Accounting Firms",
    title: "Compliance Monitoring",
    description: "Proactive flagging of potential issues for continuous regulatory compliance",
    workflow: "Regulation tracking → compliance scanning → issue flagging → remediation workflows → audit preparation",
    workflowNodes: [
      { icon: Scale, label: "Track" },
      { icon: AlertCircle, label: "Scan" },
      { icon: AlertCircle, label: "Flag" },
      { icon: Zap, label: "Fix" },
      { icon: FileCheck, label: "Audit" }
    ],
    icon: <Scale className="w-6 h-6" />,
  },
]

export default function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Law Firms", "Accounting Firms"]

  const filteredCards =
    selectedCategory === "All" ? serviceCards : serviceCards.filter((card) => card.category === selectedCategory)

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
  }

  const goToCard = (index: number) => {
    setCurrentIndex(index)
  }

  const getCardStyle = (index: number) => {
    const offset = index - currentIndex
    const isActive = index === currentIndex

    if (Math.abs(offset) > 2) {
      return { display: "none" }
    }

    return {
      transform: `
        translateX(${offset * 8}px) 
        translateY(${Math.abs(offset) * 4}px) 
        scale(${isActive ? 1 : 0.96})
      `,
      zIndex: isActive ? 30 : 20 - Math.abs(offset),
      opacity: isActive ? 1 : 0.7,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Industry Solutions</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-4">Professional Services</h2>
          <p className="text-xl text-white/80 mb-8">Automation solutions for law firms and accounting practices</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentIndex(0)
                }}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Card Stack Container */}
        <div className="relative h-96 mb-8 perspective-1000">
          <div className="relative w-full max-w-2xl mx-auto h-full">
            {filteredCards.map((card, index) => {
              const isActive = index === currentIndex

              return (
                <div
                  key={card.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    isActive ? "cursor-default" : "cursor-pointer"
                  }`}
                  style={getCardStyle(index)}
                  onClick={() => !isActive && goToCard(index)}
                >
                  {/* Background cards - just show a colored bar */}
                  {!isActive ? (
                    <div className="w-full h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl" />
                  ) : (
                    /* Active card - full content */
                    <div className="w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                          {card.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-blue-300 font-medium mb-2">{card.category}</div>
                          <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                          <p className="text-white/80 mb-4">{card.description}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Automation Workflow</h4>
                        {card.workflowNodes ? (
                          <AnimatedWorkflow 
                            workflow={{
                              nodes: card.workflowNodes,
                              color: card.category === "Law Firms" ? "hsl(217 91% 60%)" : "hsl(280 70% 60%)"
                            }}
                          />
                        ) : (
                          <p className="text-white/70 leading-relaxed">{card.workflow}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevCard}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300"
            disabled={filteredCards.length <= 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-3">
            {filteredCards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300"
            disabled={filteredCards.length <= 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
