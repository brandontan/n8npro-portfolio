import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
  const projects = [
    {
      title: "E-commerce Order Automation",
      description: "Complete order processing workflow that can automatically handle orders, inventory updates, and customer notifications. Potential to reduce processing time by 90%.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      tags: ["n8n", "Shopify API", "Email", "Slack"],
      metrics: "Save 35+ hours/week",
      category: "E-commerce"
    },
    {
      title: "CRM Lead Qualification System",
      description: "Intelligent lead scoring and routing system that can automatically qualify prospects and assign them to the right sales team members.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      tags: ["n8n", "HubSpot", "AI", "Webhooks"],
      metrics: "80% faster responses",
      category: "Sales"
    },
    {
      title: "Social Media Content Pipeline",
      description: "Automated content creation and distribution system that can generate, schedule, and publish content across multiple platforms.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      tags: ["n8n", "OpenAI", "Twitter API", "Buffer"],
      metrics: "5x content output",
      category: "Marketing"
    },
    {
      title: "Financial Reporting Dashboard",
      description: "Real-time financial data aggregation from multiple sources with automated report generation and stakeholder notifications.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      tags: ["n8n", "QuickBooks", "Google Sheets", "PDF"],
      metrics: "Eliminate manual reports",
      category: "Finance"
    },
    {
      title: "Customer Support Ticket Router",
      description: "Smart ticket classification and routing system that can automatically categorize support requests and assign them to specialized agents.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
      tags: ["n8n", "Zendesk", "NLP", "Teams"],
      metrics: "60% faster resolution",
      category: "Support"
    },
    {
      title: "Inventory Management System",
      description: "Automated inventory tracking and reordering system with predictive analytics for optimal stock levels.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=center",
      tags: ["n8n", "PostgreSQL", "Alerts", "Analytics"],
      metrics: "40% cost reduction",
      category: "Operations"
    },
  ];

  return (
    <section id="projects" className="pt-20 pb-8 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            n8n Automation Solutions I Can Build
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Potential automation projects that can transform your business operations 
            and deliver measurable results. Let's discuss which solution fits your needs.
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
