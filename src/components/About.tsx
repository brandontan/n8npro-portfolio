import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, TrendingUp } from "lucide-react";

export const About = () => {
  const stats = [
    { icon: Clock, value: "60+", label: "Hours Saved Weekly" },
    { icon: TrendingUp, value: "100%", label: "Automation Success" },
    { icon: Award, value: "n8n", label: "Platform Specialist" },
    { icon: Users, value: "Real", label: "World Experience" },
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
              <Badge variant="outline" className="glass-card mb-4 px-4 py-2">My Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From Manual Grind to Smart Automation
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  My journey into AI automation wasn't planned. I was hired to handle lead management for a client—manually researching prospects, copying data between Clay and Apollo, crafting personalized emails, then moving everything through multiple platforms.
                </p>
                <p>
                  After two weeks of 12-hour days doing the same repetitive tasks, I had enough. I discovered n8n and decided to automate everything instead of continuing the manual grind.
                </p>
                <p className="text-primary font-medium">
                  <strong>The result?</strong> What used to take 60+ hours per week now runs automatically. The client's lead generation went from a bottleneck to their biggest growth driver.
                </p>
                <p>
                  I realized I'd accidentally found my specialty: <strong>building workflows that eliminate the tedious work that's killing your productivity.</strong>
                </p>
                <p>
                  <strong>My advantage:</strong> I've been in your shoes. I know what it's like to be buried in manual processes, so I build automation that actually solves real problems—not just impressive demos.
                </p>
                <p>
                  I focus on lead qualification systems, CRM integrations, and multi-step automations that let you focus on growing your business instead of managing endless spreadsheets and copy-paste tasks.
                </p>
                <p className="text-primary font-medium">
                  Because time saved is more time you can spend with the people who matter most. ❤️
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
