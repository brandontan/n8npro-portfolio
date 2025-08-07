import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
  const projects = [
    {
      title: "E-commerce Order Automation",
      description: "Complete order processing workflow that can automatically handle orders, inventory updates, and customer notifications. Significantly reduce processing time.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      tags: ["Automation", "Shopify", "Email", "Slack"],
      metrics: "Save hours weekly",
      category: "E-commerce"
    },
    {
      title: "CRM Lead Qualification System",
      description: "Intelligent lead scoring and routing system that can automatically qualify prospects and assign them to the right sales team members.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      tags: ["AI Automation", "HubSpot", "Lead Scoring", "CRM"],
      metrics: "Faster responses",
      category: "Sales"
    },
    {
      title: "Social Media Content Pipeline",
      description: "Automated content creation and distribution system that can generate, schedule, and publish content across multiple platforms.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      tags: ["Content Automation", "AI Writing", "Social Media", "Buffer"],
      metrics: "Increase content output",
      category: "Marketing"
    },
    {
      title: "Financial Reporting Dashboard",
      description: "Real-time financial data aggregation from multiple sources with automated report generation and stakeholder notifications.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      tags: ["Report Automation", "QuickBooks", "Data Sync", "PDF"],
      metrics: "Eliminate manual reports",
      category: "Finance"
    },
    {
      title: "Customer Support Ticket Router",
      description: "Smart ticket classification and routing system that can automatically categorize support requests and assign them to specialized agents.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
      tags: ["Support Automation", "Zendesk", "AI Routing", "Teams"],
      metrics: "Faster resolution",
      category: "Support"
    },
    {
      title: "Inventory Management System",
      description: "Automated inventory tracking and reordering system with predictive analytics for optimal stock levels.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=center",
      tags: ["Inventory Automation", "Database", "Alerts", "Analytics"],
      metrics: "Reduce costs",
      category: "Operations"
    },
  ];

  return (
    <section id="projects" className="pt-20 pb-8 bg-muted/5" itemScope itemType="https://schema.org/Service">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" itemProp="name">
            Automate Repetitive Tasks - Save 60+ Hours Weekly
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" itemProp="description">
            Stop wasting time on manual data entry and repetitive work. We build AI-powered automation workflows that connect your apps, 
            eliminate busywork, and let you focus on growing your business. Free proof of concept included.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden" itemScope itemType="https://schema.org/Product">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width="400"
                  height="300"
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
                <CardTitle className="text-xl group-hover:text-primary transition-colors" itemProp="name">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm" itemProp="description">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
