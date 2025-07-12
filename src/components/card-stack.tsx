import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, FileText, Scale, Clock, Users, DollarSign, Briefcase } from "lucide-react"

interface ServiceCard {
  id: number
  category: string
  title: string
  description: string
  workflow: string
  pricing: string
  icon: React.ReactNode
}

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    category: "Law Firms",
    title: "Contract Generation",
    description: "Streamline legal document creation and management",
    workflow: "Client data → automated legal documents → DocuSign → file to matter folder",
    pricing: "Starting at $2,500/month",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 2,
    category: "Law Firms",
    title: "Case Status Updates",
    description: "Automated client communication and billing integration",
    workflow: "Court filings → client notifications → billing entries → calendar updates",
    pricing: "Starting at $1,800/month",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    id: 3,
    category: "Consulting",
    title: "Time Entry Automation",
    description: "Seamless time tracking and client billing",
    workflow: "Email/calendar activity → time tracking → client billing → payment processing",
    pricing: "Starting at $1,200/month",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 4,
    category: "Consulting",
    title: "Client Onboarding",
    description: "Streamlined client intake and project setup",
    workflow: "Lead capture → contract generation → project setup → team assignment",
    pricing: "Starting at $2,000/month",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 5,
    category: "Accounting",
    title: "Invoice Processing",
    description: "Automated invoice generation and payment tracking",
    workflow: "Time entries → invoice generation → client delivery → payment tracking",
    pricing: "Starting at $1,500/month",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: 6,
    category: "Accounting",
    title: "Expense Management",
    description: "Streamlined expense tracking and reimbursement",
    workflow: "Receipt capture → categorization → approval workflow → reimbursement",
    pricing: "Starting at $1,000/month",
    icon: <Briefcase className="w-6 h-6" />,
  },
]

export default function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Law Firms", "Consulting", "Accounting"]

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Services</h1>
          <p className="text-xl text-white/80 mb-8">
            Streamline operations for law firms, consulting, and accounting practices
          </p>

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
                        <h4 className="text-lg font-semibold text-white mb-3">Key Automation</h4>
                        <p className="text-white/70 leading-relaxed">{card.workflow}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-green-300">{card.pricing}</div>
                        <button className="px-6 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full text-white font-medium transition-all duration-300">
                          Learn More
                        </button>
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

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            Learn More About Professional Services
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
