
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
    <section className="py-20 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4">About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforming Business Operations Through Smart Automation
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  With over 5 years of experience in automation and workflow optimization, 
                  I specialize in n8n platform development, helping businesses eliminate 
                  repetitive tasks and streamline their operations.
                </p>
                <p>
                  My expertise spans across sales automation, data processing, API integrations, 
                  and custom workflow development. I've helped companies reduce manual work by 
                  80% and increase productivity dramatically.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=600"
              alt="Developer at work"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
