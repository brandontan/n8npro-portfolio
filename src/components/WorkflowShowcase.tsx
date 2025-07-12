'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, DollarSign, Users, FileText, Clock, Shield, Calculator, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface WorkflowStep {
  id: string
  title: string
  icon: React.ReactNode
  description: string
}

interface Workflow {
  id: string
  category: 'law' | 'accounting'
  title: string
  description: string
  steps: WorkflowStep[]
  pricing: {
    min: number
    max: number
    typical: string
  }
  icon: React.ReactNode
  color: string
}

const workflows: Workflow[] = [
  // Law Firm Workflows
  {
    id: 'client-intake',
    category: 'law',
    title: 'Client Intake Automation',
    description: 'Streamline new client onboarding from initial contact to engagement',
    steps: [
      { id: '1', title: 'Web Forms', icon: <FileText className="w-4 h-4" />, description: 'Client submits intake form' },
      { id: '2', title: 'CRM Integration', icon: <Users className="w-4 h-4" />, description: 'Data flows to CRM system' },
      { id: '3', title: 'Conflict Check', icon: <Shield className="w-4 h-4" />, description: 'Automated conflict screening' },
      { id: '4', title: 'Engagement Letter', icon: <FileText className="w-4 h-4" />, description: 'Generate & send documents' }
    ],
    pricing: { min: 3000, max: 8000, typical: '$3K-8K' },
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'document-generation',
    category: 'law',
    title: 'Document Generation Workflows',
    description: 'Automate legal document creation from client data',
    steps: [
      { id: '1', title: 'Client Data', icon: <Users className="w-4 h-4" />, description: 'Extract client information' },
      { id: '2', title: 'Template Selection', icon: <FileText className="w-4 h-4" />, description: 'Choose document template' },
      { id: '3', title: 'Auto-Population', icon: <ArrowRight className="w-4 h-4" />, description: 'Fill template with data' },
      { id: '4', title: 'Review & Send', icon: <FileText className="w-4 h-4" />, description: 'Generate final documents' }
    ],
    pricing: { min: 2000, max: 5000, typical: '$2K-5K' },
    icon: <FileText className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'time-tracking',
    category: 'law',
    title: 'Time Tracking Integration',
    description: 'Automate time capture and billing processes',
    steps: [
      { id: '1', title: 'Manual Entry', icon: <Clock className="w-4 h-4" />, description: 'Lawyer logs time manually' },
      { id: '2', title: 'Auto Capture', icon: <Clock className="w-4 h-4" />, description: 'System captures activities' },
      { id: '3', title: 'Billing Integration', icon: <DollarSign className="w-4 h-4" />, description: 'Sync with billing system' },
      { id: '4', title: 'Invoice Generation', icon: <FileText className="w-4 h-4" />, description: 'Create client invoices' }
    ],
    pricing: { min: 4000, max: 10000, typical: '$4K-10K' },
    icon: <Clock className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'case-status',
    category: 'law',
    title: 'Case Status Updates',
    description: 'Automated client communications based on case milestones',
    steps: [
      { id: '1', title: 'Milestone Tracking', icon: <TrendingUp className="w-4 h-4" />, description: 'Monitor case progress' },
      { id: '2', title: 'Trigger Events', icon: <AlertCircle className="w-4 h-4" />, description: 'Detect status changes' },
      { id: '3', title: 'Template Selection', icon: <FileText className="w-4 h-4" />, description: 'Choose communication type' },
      { id: '4', title: 'Client Notification', icon: <Users className="w-4 h-4" />, description: 'Send automated updates' }
    ],
    pricing: { min: 2000, max: 6000, typical: '$2K-6K' },
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  // Accounting Firm Workflows
  {
    id: 'tax-workflow',
    category: 'accounting',
    title: 'Tax Workflow Automation',
    description: 'Streamline tax preparation from document collection to filing',
    steps: [
      { id: '1', title: 'Document Upload', icon: <FileText className="w-4 h-4" />, description: 'Client uploads tax docs' },
      { id: '2', title: 'Data Extraction', icon: <ArrowRight className="w-4 h-4" />, description: 'OCR extracts key data' },
      { id: '3', title: 'Software Population', icon: <Calculator className="w-4 h-4" />, description: 'Auto-fill tax software' },
      { id: '4', title: 'Review & File', icon: <Shield className="w-4 h-4" />, description: 'CPA review and filing' }
    ],
    pricing: { min: 3000, max: 12000, typical: '$3K-12K' },
    icon: <Calculator className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'client-onboarding-accounting',
    category: 'accounting',
    title: 'Client Onboarding',
    description: 'Automate new client setup and compliance checks',
    steps: [
      { id: '1', title: 'Client Forms', icon: <FileText className="w-4 h-4" />, description: 'New client information' },
      { id: '2', title: 'KYC Checks', icon: <Shield className="w-4 h-4" />, description: 'Know Your Customer verification' },
      { id: '3', title: 'Engagement Setup', icon: <Users className="w-4 h-4" />, description: 'Create client relationship' },
      { id: '4', title: 'Welcome Package', icon: <FileText className="w-4 h-4" />, description: 'Send onboarding materials' }
    ],
    pricing: { min: 2000, max: 5000, typical: '$2K-5K' },
    icon: <Users className="w-6 h-6" />,
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'report-generation',
    category: 'accounting',
    title: 'Recurring Report Generation',
    description: 'Automated monthly and quarterly client reporting',
    steps: [
      { id: '1', title: 'Data Collection', icon: <TrendingUp className="w-4 h-4" />, description: 'Gather financial data' },
      { id: '2', title: 'Report Templates', icon: <FileText className="w-4 h-4" />, description: 'Apply client templates' },
      { id: '3', title: 'Auto Generation', icon: <ArrowRight className="w-4 h-4" />, description: 'Create formatted reports' },
      { id: '4', title: 'Client Delivery', icon: <Users className="w-4 h-4" />, description: 'Send to clients automatically' }
    ],
    pricing: { min: 3000, max: 8000, typical: '$3K-8K' },
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-emerald-500 to-green-500'
  },
  {
    id: 'compliance-monitoring',
    category: 'accounting',
    title: 'Compliance Monitoring',
    description: 'Track deadlines and automate compliance reminders',
    steps: [
      { id: '1', title: 'Deadline Tracking', icon: <Clock className="w-4 h-4" />, description: 'Monitor compliance dates' },
      { id: '2', title: 'Alert System', icon: <AlertCircle className="w-4 h-4" />, description: 'Generate automated reminders' },
      { id: '3', title: 'Status Updates', icon: <TrendingUp className="w-4 h-4" />, description: 'Track completion status' },
      { id: '4', title: 'Reporting', icon: <FileText className="w-4 h-4" />, description: 'Generate compliance reports' }
    ],
    pricing: { min: 2000, max: 6000, typical: '$2K-6K' },
    icon: <Shield className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500'
  }
]

const WorkflowCard = ({ workflow, isActive }: { workflow: Workflow; isActive: boolean }) => {
  return (
    <Card className={`relative overflow-hidden transition-all duration-500 ${
      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
    } bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-slate-700/50`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${workflow.color} opacity-5`} />
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${workflow.color} text-white shadow-lg`}>
              {workflow.icon}
            </div>
            <div>
              <Badge variant="secondary" className="mb-2 bg-slate-700/50 text-slate-300">
                {workflow.category === 'law' ? 'Law Firms' : 'Accounting Firms'}
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-2">{workflow.title}</h3>
              <p className="text-slate-400 text-lg">{workflow.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <DollarSign className="w-5 h-5" />
              <span className="text-2xl font-bold">{workflow.pricing.typical}</span>
            </div>
            <p className="text-slate-500 text-sm">typical project</p>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Workflow Steps</h4>
            <div className="text-sm text-slate-400">
              {workflow.steps.length} steps
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 -translate-y-1/2 z-0" />
            
            {workflow.steps.map((step, index) => (
              <div key={step.id} className="relative z-10">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-700/50 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${workflow.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                  <h5 className="font-semibold text-white mb-2">{step.title}</h5>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Details */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-white mb-1">Investment Range</h5>
              <p className="text-slate-400 text-sm">Typical project scope and pricing</p>
            </div>
            <div className="text-right">
              <div className="text-slate-300 text-sm">
                ${workflow.pricing.min.toLocaleString()} - ${workflow.pricing.max.toLocaleString()}
              </div>
              <div className="text-green-400 font-semibold">{workflow.pricing.typical} typical</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WorkflowShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const nextWorkflow = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % workflows.length)
  }, [])

  const prevWorkflow = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + workflows.length) % workflows.length)
  }, [])

  const goToWorkflow = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlay || isPaused) return

    const interval = setInterval(() => {
      nextWorkflow()
    }, 5000) // Advance every 5 seconds

    return () => clearInterval(interval)
  }, [nextWorkflow, isAutoPlay, isPaused])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  const currentWorkflow = workflows[currentIndex]
  const lawWorkflows = workflows.filter(w => w.category === 'law')
  const accountingWorkflows = workflows.filter(w => w.category === 'accounting')

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Professional Services Automation Workflows
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Proven automation solutions for law firms and accounting practices. 
          Each workflow includes implementation, training, and ongoing support.
        </p>
      </div>

      {/* Category Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Law Firms</h3>
                <p className="text-slate-400">$3K-15K+ projects</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              Streamline client intake, document generation, time tracking, and case communications
            </p>
            <div className="text-sm text-slate-400">
              {lawWorkflows.length} automation workflows available
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Accounting Firms</h3>
                <p className="text-slate-400">$2K-10K+ projects</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              Automate tax workflows, client onboarding, report generation, and compliance monitoring
            </p>
            <div className="text-sm text-slate-400">
              {accountingWorkflows.length} automation workflows available
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Workflow Showcase */}
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevWorkflow}
              className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextWorkflow}
              className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Current Workflow Card */}
        <div className="min-h-[600px]">
          <WorkflowCard workflow={currentWorkflow} isActive={true} />
        </div>

        {/* Workflow Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {workflows.map((_, index) => (
            <button
              key={index}
              onClick={() => goToWorkflow(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Workflow Counter */}
        <div className="text-center mt-4">
          <p className="text-slate-400 text-sm">
            {currentIndex + 1} of {workflows.length} workflows
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-slate-700/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Automate Your Practice?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get a custom automation proposal for your firm. We'll analyze your current workflows 
              and design a solution that fits your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                Get Free Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                View More Examples
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}