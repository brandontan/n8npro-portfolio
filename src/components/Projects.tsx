import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";

export const Projects = () => {
  const projects = [
    {
      title: "E-commerce Order Automation",
      description: "Complete order processing workflow that automatically handles orders, inventory updates, and customer notifications. Reduced processing time by 90%.",
      image: getStorageUrl("ecommerce-automation.jpg"),
      tags: ["n8n", "Shopify API", "Email", "Slack"],
      metrics: "Saved 35 hours/week",
      category: "E-commerce"
    },
    {
      title: "CRM Lead Qualification System",
      description: "Intelligent lead scoring and routing system that automatically qualifies prospects and assigns them to the right sales team members.",
      image: getStorageUrl("crm-lead.jpg"),
      tags: ["n8n", "HubSpot", "AI", "Webhooks"],
      metrics: "80% faster lead response",
      category: "Sales"
    },
    {
      title: "Social Media Content Pipeline",
      description: "Automated content creation and distribution system that generates, schedules, and publishes content across multiple platforms.",
      image: getStorageUrl("social-media.jpg"),
      tags: ["n8n", "OpenAI", "Twitter API", "Buffer"],
      metrics: "5x content output increase",
      category: "Marketing"
    },
    {
      title: "Financial Reporting Dashboard",
      description: "Real-time financial data aggregation from multiple sources with automated report generation and stakeholder notifications.",
      image: getStorageUrl("financial-dashboard.jpg"),
      tags: ["n8n", "QuickBooks", "Google Sheets", "PDF"],
      metrics: "Zero manual reporting",
      category: "Finance"
    },
    {
      title: "Customer Support Ticket Router",
      description: "Smart ticket classification and routing system that automatically categorizes support requests and assigns them to specialized agents.",
      image: getStorageUrl("support-tickets.jpg"),
      tags: ["n8n", "Zendesk", "NLP", "Teams"],
      metrics: "60% faster resolution",
      category: "Support"
    },
    {
      title: "Inventory Management System",
      description: "Automated inventory tracking and reordering system with predictive analytics for optimal stock levels.",
      image: getStorageUrl("inventory.jpg"),
      tags: ["n8n", "PostgreSQL", "Alerts", "Analytics"],
      metrics: "40% cost reduction",
      category: "Operations"
    },
  ];

  return (
    <section className="py-20 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured n8n Automation Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world automation solutions that have transformed business operations 
            and delivered measurable results for my clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/90 text-white">
                    {project.metrics}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Demo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
