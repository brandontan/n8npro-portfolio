'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, FileText, Clock, Receipt, Users } from 'lucide-react'

interface Workflow {
  id: number
  name: string
  priceRange: string
  description: string
  icon: React.ReactNode
}

const workflows: Workflow[] = [
  {
    id: 1,
    name: 'Client Intake Automation',
    priceRange: '$3K-8K',
    description: 'Streamline client onboarding and data collection',
    icon: <Users className="w-4 h-4" />
  },
  {
    id: 2,
    name: 'Document Generation',
    priceRange: '$2K-5K',
    description: 'Automate contract and report creation',
    icon: <FileText className="w-4 h-4" />
  },
  {
    id: 3,
    name: 'Time Tracking Integration',
    priceRange: '$4K-10K',
    description: 'Connect billing systems with project tracking',
    icon: <Clock className="w-4 h-4" />
  },
  {
    id: 4,
    name: 'Tax Workflow Automation',
    priceRange: '$3K-12K',
    description: 'End-to-end tax preparation and filing',
    icon: <Receipt className="w-4 h-4" />
  }
]

export default function WorkflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextWorkflow = () => {
    setCurrentIndex((prev) => (prev + 1) % workflows.length)
  }

  const prevWorkflow = () => {
    setCurrentIndex((prev) => (prev - 1 + workflows.length) % workflows.length)
  }

  const currentWorkflow = workflows[currentIndex]

  return (
    <div className="relative w-full h-32 overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={prevWorkflow}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
        aria-label="Previous workflow"
      >
        <ChevronLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
      </button>

      <button
        onClick={nextWorkflow}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
        aria-label="Next workflow"
      >
        <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
      </button>

      {/* Workflow Cards Container */}
      <div className="mx-10 h-full">
        <div 
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="w-full flex-shrink-0 h-full"
            >
              <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/8 hover:border-white/20 transition-all duration-200 hover:scale-[1.02]">
                <div className="flex items-start gap-3 h-full">
                  {/* Icon */}
                  <div className="flex-shrink-0 p-2 rounded-lg bg-[hsl(217,91%,60%)]/20 border border-[hsl(217,91%,60%)]/30">
                    <div className="text-[hsl(217,91%,60%)]">
                      {workflow.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-white font-medium text-sm leading-tight truncate">
                        {workflow.name}
                      </h3>
                      <span className="text-[hsl(217,91%,60%)] font-semibold text-sm whitespace-nowrap">
                        {workflow.priceRange}
                      </span>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {workflow.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {workflows.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-[hsl(217,91%,60%)]' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}