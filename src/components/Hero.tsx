
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mail, Github, Linkedin, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic background with liquid blobs */}
      <div className="absolute inset-0 fluid-gradient"></div>
      
      {/* Animated liquid blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 liquid-blob liquid-morph"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 liquid-blob liquid-morph" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 liquid-blob liquid-morph" style={{ animationDelay: '4s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="glass-card text-sm px-4 py-2 animate-pulse-glow">
                <Sparkles className="w-4 h-4 mr-2" />
                Available for Freelance
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground block mb-2">I Build</span>
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse block mb-2">
                  Intelligent
                </span>
                <span className="text-foreground block">Automation</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                n8n Automation Specialist | Turning Business Chaos Into Streamlined Workflows
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="glass-button text-lg px-8 py-6 group text-white">
                <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Let's Talk
              </Button>
              <Button variant="outline" size="lg" className="glass-card text-lg px-8 py-6 hover:glass-button">
                View Projects
              </Button>
            </div>

            <div className="flex gap-6 justify-center lg:justify-start">
              <Button variant="ghost" size="icon" className="h-12 w-12 glass-card hover:glass-button">
                <Github className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 glass-card hover:glass-button">
                <Linkedin className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Hero Video with liquid glass effect */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating glass panels */}
              <div className="absolute -top-4 -left-4 w-32 h-32 glass-card rounded-3xl animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 glass-card rounded-2xl animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* Main video container */}
              <div className="relative z-10 glass-card rounded-3xl p-2 animate-pulse-glow">
                <video
                  src="/hero-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-96 object-cover rounded-2xl"
                  style={{ aspectRatio: '16/9' }}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-2 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-2xl"></div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for hire</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="glass-card rounded-full p-3">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};
