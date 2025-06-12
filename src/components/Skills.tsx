
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Database, Globe, Cpu } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      icon: Zap,
      title: "Automation Platforms",
      skills: [
        { name: "n8n", level: 95 },
        { name: "Zapier", level: 85 },
        { name: "Make.com", level: 80 },
        { name: "Power Automate", level: 75 },
      ],
    },
    {
      icon: Database,
      title: "Databases & APIs",
      skills: [
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 80 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 75 },
      ],
    },
    {
      icon: Globe,
      title: "Web Technologies",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "React", level: 75 },
      ],
    },
    {
      icon: Cpu,
      title: "Business Tools",
      skills: [
        { name: "CRM Integration", level: 95 },
        { name: "Email Marketing", level: 90 },
        { name: "Data Analysis", level: 85 },
        { name: "Process Optimization", level: 90 },
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
            Technical Skills & Specializations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive skill set focused on delivering robust automation solutions 
            that scale with your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={skill.level} className="h-2 glass-card" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
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
