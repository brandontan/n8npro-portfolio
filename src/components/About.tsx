import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, TrendingUp } from "lucide-react";

export const About = () => {

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 fluid-gradient opacity-50"></div>
      <div className="absolute top-20 right-20 w-64 h-64 liquid-blob liquid-morph" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="glass-card mb-4 px-4 py-2">About</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Save Cost. Save Time. Grow Revenue.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-primary font-medium text-lg mb-4">
                  Why Choose AIFlows (formerly known as n8npro):
                </p>
                <p>
                  <strong>Specialized Focus:</strong> Exclusively n8n (open-source intelligent automation platform) and AI integration, not generic automation consulting.
                </p>
                <p>
                  <strong>De-risking:</strong> Free MVP typically completed within one week to justify actual build.
                </p>
                <p>
                  <strong>Technical Depth:</strong> Integration with OpenAI and Anthropic APIs and much more.
                </p>
                <p>
                  <strong>Proven ROI:</strong> Work directly with business owners to identify high-impact automation opportunities via MVP. Build, test, and deploy solutions that actually deliver results.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 glass-card rounded-2xl animate-float"></div>
            <div className="absolute -bottom-8 left-1/3 w-16 h-16 glass-card rounded-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Main image */}
            <div className="relative glass-card rounded-3xl p-3 animate-pulse-glow">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=600"
                alt="Developer at work"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-3 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
