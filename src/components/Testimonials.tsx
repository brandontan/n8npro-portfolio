
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      content: "This developer completely transformed our sales process. The n8n automation they built saved us 40+ hours per week and increased our conversion rate by 65%. Exceptional work!",
      author: "Sarah Johnson",
      role: "VP of Sales",
      company: "TechStartup Inc.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?auto=format&fit=crop&w=150&h=150"
    },
    {
      content: "The inventory automation system they developed has been a game-changer. We went from manual tracking to fully automated reordering with predictive analytics. ROI was immediate.",
      author: "Michael Chen",
      role: "Operations Director",
      company: "Global Logistics Co.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150"
    },
    {
      content: "Outstanding technical expertise and communication. They delivered a complex CRM integration that our internal team couldn't figure out. Highly recommend for any automation needs.",
      author: "Emily Rodriguez",
      role: "CTO",
      company: "FinanceFlow",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 fluid-gradient opacity-40"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 liquid-blob liquid-morph" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="glass-card mb-4 px-4 py-2">Client Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Clients Say About My Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real feedback from business leaders who have experienced the impact 
            of intelligent automation on their operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card hover:glass-button transition-all duration-500 group relative animate-float" style={{ animationDelay: `${index * 0.7}s` }}>
              <CardContent className="p-8">
                {/* Quote icon with glass effect */}
                <div className="glass-card rounded-2xl p-3 w-fit mb-6">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                <blockquote className="text-foreground mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="glass-card rounded-full p-1">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
