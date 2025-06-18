import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Zap, Target, ArrowRight, CheckCircle } from "lucide-react";

export const ValueProposition = () => {
  const painPoints = [
    {
      icon: Clock,
      problem: "Spending 40+ hours/week on manual tasks",
      solution: "Automate 90% of repetitive work",
      impact: "Get your weekends back"
    },
    {
      icon: DollarSign,
      problem: "Missing leads due to slow follow-up",
      solution: "Instant automated lead qualification",
      impact: "Increase conversion by 80%"
    },
    {
      icon: Zap,
      problem: "Data scattered across multiple tools",
      solution: "Unified automated workflows",
      impact: "One source of truth"
    },
    {
      icon: Target,
      problem: "Scaling bottlenecks killing growth",
      solution: "Scale without hiring more staff",
      impact: "Unlimited capacity"
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-40 h-40 liquid-blob liquid-morph opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 liquid-blob liquid-morph opacity-20" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Stop The Manual Grind</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Is This Your Daily Reality?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            You know automation could save you hours, but you're stuck in the manual grind. 
            <span className="text-primary font-semibold"> I've been there.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <Card key={index} className="group border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-3 bg-red-500/10 rounded-full w-fit mx-auto group-hover:bg-green-500/10 transition-colors">
                  <point.icon className="h-6 w-6 text-red-500 group-hover:text-green-500 transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-red-600 group-hover:text-muted-foreground transition-colors">
                    {point.problem}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-red-200 via-muted to-green-200 group-hover:from-green-200 transition-all"></div>
                  <p className="font-semibold text-sm text-green-600 group-hover:text-primary transition-colors">
                    {point.solution}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {point.impact}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Ready to Automate Your Business?</h3>
            <p className="text-muted-foreground">
              Let's discuss how I can eliminate the manual work that's eating up your time.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={scrollToContact}>
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToContact}>
              Get Custom Quote
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            💡 <strong>Free 30-min consultation</strong> - No obligations, just honest advice about your automation potential
          </p>
        </div>
      </div>
    </section>
  );
}; 