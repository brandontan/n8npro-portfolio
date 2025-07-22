import { FileText, BookOpen, Lightbulb, HelpCircle, Award, Star, Newspaper, Layers } from 'lucide-react';

export const formatTags = {
  'tutorial': {
    label: 'Tutorial',
    color: 'blue',
    bgClass: 'bg-blue-500/10',
    textClass: 'text-blue-500',
    borderClass: 'border-blue-500/20',
    icon: BookOpen,
    description: 'Step-by-step guides'
  },
  'case-study': {
    label: 'Case Study',
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-500',
    borderClass: 'border-emerald-500/20',
    icon: FileText,
    description: 'Real-world implementations'
  },
  'tips-tricks': {
    label: 'Tips & Tricks',
    color: 'purple',
    bgClass: 'bg-purple-500/10',
    textClass: 'text-purple-500',
    borderClass: 'border-purple-500/20',
    icon: Lightbulb,
    description: 'Quick tips and tricks'
  },
  'how-to': {
    label: 'How-to Guide',
    color: 'orange',
    bgClass: 'bg-orange-500/10',
    textClass: 'text-orange-500',
    borderClass: 'border-orange-500/20',
    icon: HelpCircle,
    description: 'Practical how-to guides'
  },
  'best-practices': {
    label: 'Best Practices',
    color: 'pink',
    bgClass: 'bg-pink-500/10',
    textClass: 'text-pink-500',
    borderClass: 'border-pink-500/20',
    icon: Award,
    description: 'Industry best practices'
  },
  'review': {
    label: 'Review',
    color: 'yellow',
    bgClass: 'bg-yellow-500/10',
    textClass: 'text-yellow-500',
    borderClass: 'border-yellow-500/20',
    icon: Star,
    description: 'Product and tool reviews'
  },
  'news': {
    label: 'News',
    color: 'cyan',
    bgClass: 'bg-cyan-500/10',
    textClass: 'text-cyan-500',
    borderClass: 'border-cyan-500/20',
    icon: Newspaper,
    description: 'Latest updates and news'
  },
  'series': {
    label: 'Series',
    color: 'indigo',
    bgClass: 'bg-indigo-500/10',
    textClass: 'text-indigo-500',
    borderClass: 'border-indigo-500/20',
    icon: Layers,
    description: 'Multi-part series'
  }
};

// Popular n8n automation categories based on n8n blog and community
export const categoryTags = [
  // Core n8n Features
  'n8n Workflows',
  'API Integration',
  'Webhook Automation',
  'Error Handling',
  'Workflow Design',
  'Custom Nodes',
  'Community Nodes',
  
  // Integration Types
  'CRM Integration',
  'Database Automation',
  'Email Automation',
  'Slack Integration',
  'Google Workspace',
  'Microsoft 365',
  'Social Media Automation',
  
  // AI & Advanced
  'AI Tools',
  'OpenAI Integration',
  'LangChain',
  'Machine Learning',
  'Natural Language Processing',
  
  // Business Use Cases
  'Business Automation',
  'Sales Automation',
  'Marketing Automation',
  'HR Automation',
  'Finance Automation',
  'Customer Support',
  'Data Processing',
  
  // Technical Topics
  'REST API',
  'GraphQL',
  'Authentication',
  'Data Transformation',
  'File Processing',
  'Scheduling',
  'Monitoring',
  
  // Industry Specific
  'E-commerce',
  'SaaS',
  'Healthcare',
  'Education',
  'Real Estate',
  'Manufacturing',
  
  // Open Source & Tools
  'Open-Source Tools',
  'Self-Hosting',
  'Docker',
  'Security',
  'Performance',
  'Debugging',
  'Testing'
];