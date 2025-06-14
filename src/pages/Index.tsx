import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
// import { Projects } from "@/components/Projects";
// import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      {/* Temporarily hidden - Portfolio/Projects section */}
      {/* <Projects /> */}
      {/* Temporarily hidden - Customer Testimonials section */}
      {/* <Testimonials /> */}
      <Contact />
      <Chatbot />
    </div>
  );
};

export default Index;
