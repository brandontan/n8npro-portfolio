import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";

import { CaseStudy } from "@/components/CaseStudy";
// import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CaseStudy />
      <Contact />
      <Chatbot />
    </div>
  );
};

export default Index;
