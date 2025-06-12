
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, TrendingUp } from "lucide-react";

export const About = () => {
  const stats = [
    { icon: Award, value: "50+", label: "Projects Completed" },
    { icon: Users, value: "30+", label: "Happy Clients" },
    { icon: Clock, value: "2000+", label: "Hours Saved" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 fluid-gradient opacity-50"></div>
      <div className="absolute top-20 right-20 w-64 h-64 liquid-blob liquid-morph" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="glass-card mb-4 px-4 py-2">About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforming Business Operations Through Smart Automation
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With extensive experience in sales automation and workflow optimization, I've evolved into specializing in n8n platform development, helping businesses eliminate repetitive tasks and streamline their operations.
                </p>
                <p>
                  My background includes hands-on experience with Clay, Claude API, Apollo, Instantly, Woodpecker, and Apify for lead management and email automation. Now I focus that automation expertise through n8n's powerful platform to create custom workflows that connect your entire business ecosystem.
                </p>
                <p>
                  <strong>What I bring:</strong> Deep understanding of sales processes, API integrations, and the real-world challenges of scaling automation. I build workflows that actually work in production environments.
                </p>
                <p>
                  From lead qualification to CRM integrations to complex multi-step automations, I create solutions that let you focus on growing your business instead of managing manual processes. Time saved is more time you can spend with loved ones ❤️
                </p>
              </div>
            </div>

            {/* Temporarily hidden - Statistics cards */}
            {/* <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card hover:glass-button transition-all duration-500 group">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
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
