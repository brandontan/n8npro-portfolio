import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CaseStudy = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-muted/5 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-48 h-48 liquid-blob liquid-morph opacity-10"></div>
      
      <div className="container mx-auto px-4">


        <div className="max-w-4xl mx-auto space-y-12">
          {/* The Challenge */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">The Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                I was hired to handle lead management - manually researching prospects, copying data between Clay and Apollo, 
                crafting personalized emails, then moving everything through multiple platforms.
              </p>
              <p className="text-muted-foreground">
                <strong>Reality check:</strong> Two weeks of 12-hour days doing the same repetitive tasks. 
                60+ hours per week of pure manual grind that could be done by a computer.
              </p>
            </CardContent>
          </Card>

          {/* The Solution */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">The Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Instead of continuing the manual grind, I discovered n8n and decided to automate everything. 
                I built a complete workflow that:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Automatically researched prospects using Clay and Apollo APIs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Generated personalized emails based on prospect data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Moved leads through the entire pipeline automatically
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  Synchronized data across all platforms in real-time
                </li>
              </ul>
            </CardContent>
          </Card>



          {/* The Results */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-xl text-green-600">The Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                <strong>What used to take 60+ hours per week now runs completely automatically.</strong> 
                The client's lead generation went from being a bottleneck to their biggest growth driver.
              </p>
              <p className="text-muted-foreground">
                That's when I realized I'd accidentally found my specialty: building workflows that eliminate 
                the tedious work that's killing productivity.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <p className="text-green-800 font-medium text-center">
                  🎯 This is the kind of transformation I can build for your business too.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-6 pt-8">
            <h3 className="text-2xl font-bold">Ready for Your Own Success Story?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Let's discuss how I can automate your manual processes and free up your time for what matters most.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" onClick={scrollToContact}>
              Let's Build Your Automation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 