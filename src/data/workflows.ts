export interface Workflow {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'E-commerce' | 'CRM' | 'Marketing' | 'Finance' | 'Operations' | 'Support';
  status: 'Live' | 'In Development' | 'Concept';
  featured: boolean;
  
  // Visual Assets
  thumbnail: string;
  images: string[];
  video?: string;
  
  // Metrics & Impact
  metrics: {
    timeSaved: string;
    costReduction?: string;
    efficiency: string;
    roi?: string;
  };
  
  // Technical Details
  technologies: string[];
  integrations: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  
  // Case Study Details
  challenge: string;
  solution: string;
  results: string[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  client?: string;
  industry?: string;
  duration: string;
  
  // CMS Features
  tags: string[];
  isPublic: boolean;
  viewCount: number;
  likes: number;
}

export const workflows: Workflow[] = [
  {
    id: 'ecommerce-automation',
    title: 'E-commerce Order Automation',
    subtitle: 'Complete order processing workflow',
    description: 'Automated order processing that handles inventory, payments, and customer notifications seamlessly.',
    longDescription: 'A comprehensive e-commerce automation system that transforms manual order processing into a streamlined, intelligent workflow. This system automatically processes orders, updates inventory across multiple channels, handles payment confirmations, and sends personalized customer notifications.',
    category: 'E-commerce',
    status: 'Live',
    featured: true,
    
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center'
    ],
    
    metrics: {
      timeSaved: '35+ hours/week',
      costReduction: '60%',
      efficiency: '90% faster processing',
      roi: '300% in 6 months'
    },
    
    technologies: ['n8n', 'Shopify API', 'Stripe', 'SendGrid', 'Slack'],
    integrations: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Mailchimp'],
    complexity: 'Complex',
    
    challenge: 'Manual order processing was taking 2-3 hours daily, with frequent errors in inventory updates and delayed customer communications.',
    solution: 'Built an intelligent automation that processes orders in real-time, automatically updates inventory across all channels, and sends personalized notifications based on order status.',
    results: [
      'Reduced order processing time from 3 hours to 5 minutes',
      'Eliminated inventory sync errors completely',
      'Increased customer satisfaction by 40%',
      'Freed up team to focus on growth initiatives'
    ],
    
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20',
    client: 'TechStyle Fashion',
    industry: 'Fashion E-commerce',
    duration: '3 weeks',
    
    tags: ['automation', 'e-commerce', 'inventory', 'notifications', 'payments'],
    isPublic: true,
    viewCount: 1247,
    likes: 89
  },
  
  {
    id: 'crm-lead-qualification',
    title: 'AI-Powered Lead Qualification',
    subtitle: 'Intelligent lead scoring and routing',
    description: 'Smart lead qualification system that automatically scores prospects and routes them to the right sales team members.',
    longDescription: 'An AI-driven lead qualification system that analyzes prospect behavior, company data, and engagement patterns to automatically score and route leads to the most suitable sales representatives, dramatically improving conversion rates.',
    category: 'CRM',
    status: 'Live',
    featured: true,
    
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center'
    ],
    
    metrics: {
      timeSaved: '25+ hours/week',
      efficiency: '80% faster responses',
      roi: '250% increase in qualified leads'
    },
    
    technologies: ['n8n', 'HubSpot API', 'OpenAI', 'Webhooks', 'PostgreSQL'],
    integrations: ['HubSpot', 'Salesforce', 'Pipedrive', 'Slack', 'Teams'],
    complexity: 'Complex',
    
    challenge: 'Sales team was spending too much time on unqualified leads, missing high-value prospects, and response times were inconsistent.',
    solution: 'Implemented AI-powered lead scoring that analyzes 15+ data points to automatically qualify and route leads to specialists based on industry, company size, and buying intent.',
    results: [
      'Increased qualified lead conversion by 65%',
      'Reduced response time from 4 hours to 15 minutes',
      'Improved sales team efficiency by 80%',
      'Generated $2M+ in additional pipeline'
    ],
    
    createdAt: '2024-02-10',
    updatedAt: '2024-06-25',
    client: 'SaaS Growth Co',
    industry: 'B2B SaaS',
    duration: '4 weeks',
    
    tags: ['AI', 'CRM', 'lead-scoring', 'automation', 'sales'],
    isPublic: true,
    viewCount: 892,
    likes: 67
  },
  
  {
    id: 'social-media-pipeline',
    title: 'AI Content Generation Pipeline',
    subtitle: 'Automated content creation and distribution',
    description: 'Intelligent content pipeline that generates, schedules, and publishes content across multiple social platforms.',
    longDescription: 'A sophisticated content automation system that uses AI to generate engaging social media content, automatically schedules posts for optimal engagement times, and distributes content across multiple platforms while maintaining brand consistency.',
    category: 'Marketing',
    status: 'Live',
    featured: false,
    
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=center'
    ],
    
    metrics: {
      timeSaved: '20+ hours/week',
      efficiency: '5x content output',
      roi: '400% engagement increase'
    },
    
    technologies: ['n8n', 'OpenAI GPT-4', 'Twitter API', 'Buffer', 'Canva API'],
    integrations: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'Buffer'],
    complexity: 'Medium',
    
    challenge: 'Marketing team struggled to maintain consistent social media presence across platforms while creating quality, engaging content.',
    solution: 'Built an AI-powered content pipeline that generates platform-specific content, optimizes posting times, and maintains brand voice consistency across all channels.',
    results: [
      'Increased content output by 500%',
      'Improved engagement rates by 400%',
      'Reduced content creation time by 85%',
      'Maintained consistent brand voice across platforms'
    ],
    
    createdAt: '2024-03-05',
    updatedAt: '2024-06-15',
    client: 'Digital Marketing Agency',
    industry: 'Marketing',
    duration: '2 weeks',
    
    tags: ['AI', 'content-generation', 'social-media', 'automation', 'marketing'],
    isPublic: true,
    viewCount: 634,
    likes: 45
  }
];

export const getWorkflowById = (id: string): Workflow | undefined => {
  return workflows.find(workflow => workflow.id === id);
};

export const getWorkflowsByCategory = (category: string): Workflow[] => {
  return workflows.filter(workflow => workflow.category === category);
};

export const getFeaturedWorkflows = (): Workflow[] => {
  return workflows.filter(workflow => workflow.featured);
};

export const getPublicWorkflows = (): Workflow[] => {
  return workflows.filter(workflow => workflow.isPublic);
}; 