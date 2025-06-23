import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Layers } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      skills: [
        { name: "AI-powered Decision Engines", level: 85 },
        { name: "Dynamic Content Generation", level: 78 },
        { name: "Intelligent Routing & Scoring", level: 82 },
        { name: "NLU/NLP Processing", level: 75 },
      ],
    },
    {
      icon: Zap,
      title: "Automation & Integration",
      skills: [
        { name: "Workflow Orchestration", level: 90 },
        { name: "API Integration & Webhooks", level: 88 },
        { name: "Data Pipeline Automation", level: 85 },
        { name: "Real-time Event Processing", level: 80 },
      ],
    },
    {
      icon: Layers,
      title: "AI Tools & Platforms",
      skills: [
        { name: "Large Language Models (LLMs)", level: 82 },
        { name: "RAG Systems & Vector DBs", level: 75 },
        { name: "CRM & Business Tool Integration", level: 88 },
        { name: "AI Model Deployment & APIs", level: 78 },
      ],
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 fluid-gradient opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 liquid-blob liquid-morph" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="glass-card mb-4 px-4 py-2">My Expertise</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI Automation Engineering Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Specialized skills in building intelligent automation systems that combine AI decision-making 
            with robust workflow orchestration to eliminate manual processes and drive business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="glass-card hover:glass-button transition-all duration-500 group animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 glass-card rounded-2xl group-hover:scale-110 transition-transform">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-primary font-bold text-sm min-w-[40px] text-right">{skill.level}%</span>
                    </div>
                    <div className="relative bg-muted/30 rounded-full h-3 overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
