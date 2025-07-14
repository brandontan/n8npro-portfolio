import React from 'react';
import { 
  Database, Cloud, Zap, CheckCircle, Webhook, Sparkles, Mail, BarChart,
  FileText, Calendar, Clock, Users, DollarSign, Package, ShoppingCart,
  Brain, Globe, Send, Bell, ChevronRight, Activity, Lock, Calculator
} from 'lucide-react';

interface WorkflowNode {
  icon: string;
  label: string;
}

interface AnimatedWorkflowProps {
  workflow?: WorkflowNode[];
  color?: string;
}

// Icon mapping
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
};

export default function AnimatedWorkflow({ 
  workflow,
  color = '#8b5cf6' 
}: AnimatedWorkflowProps) {
  // If no workflow provided, don't render anything
  if (!workflow || workflow.length === 0) {
    return null;
  }

  // Convert color from Tailwind class to hex if needed
  const getColorHex = (colorClass: string) => {
    const colorMap: { [key: string]: string } = {
      'blue': '#3b82f6',
      'purple': '#8b5cf6',
      'green': '#10b981',
      'orange': '#f97316',
      'red': '#ef4444',
      'gray': '#6b7280',
      'bg-blue-500': '#3b82f6',
      'bg-purple-500': '#8b5cf6',
      'bg-green-500': '#10b981',
      'bg-orange-500': '#f97316',
      'bg-red-500': '#ef4444',
      'bg-gray-500': '#6b7280',
    };
    
    const colorName = colorClass.replace('bg-', '').replace('-500', '');
    return colorMap[colorClass] || colorMap[colorName] || '#8b5cf6';
  };

  const themeColor = color.startsWith('#') ? color : getColorHex(color);

  return (
    <div className="relative w-full h-24 flex items-center justify-between px-2 overflow-hidden">
      {/* SVG for marching ants connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          {/* Define the marching ants pattern */}
          <pattern id={`ants-${themeColor.replace('#', '')}`} patternUnits="userSpaceOnUse" width="8" height="1">
            <rect x="0" y="0" width="4" height="1" fill={themeColor} />
            <rect x="4" y="0" width="4" height="1" fill="transparent" />
          </pattern>
        </defs>
        
        {/* Draw lines between nodes */}
        {workflow.map((_, index) => {
          if (index === workflow.length - 1) return null;
          const nodeWidth = 100 / workflow.length;
          const startX = nodeWidth * index + nodeWidth / 2;
          const endX = nodeWidth * (index + 1) + nodeWidth / 2;
          
          return (
            <line
              key={`line-${index}`}
              x1={`${startX}%`}
              y1="20px"
              x2={`${endX}%`}
              y2="20px"
              stroke={`url(#ants-${themeColor.replace('#', '')})`}
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-march"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="relative z-10 flex items-center justify-between w-full h-full">
        {workflow.map((node, index) => {
          const IconComponent = iconMap[node.icon] || Zap;
          return (
            <div key={index} className="flex flex-col items-center gap-1 justify-start h-full">
              <div 
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-lg animate-pulse-gentle flex-shrink-0"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  backgroundColor: `${themeColor}20`,
                  borderColor: `${themeColor}40`,
                }}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              
              <span className="text-[10px] text-white/60 font-medium text-center leading-tight max-w-[70px] min-h-[24px] flex items-center">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes march {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 8;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .animate-march {
          animation: march 1s linear infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}