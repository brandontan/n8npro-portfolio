import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ReCaptchaProvider>
        <Contact />
      </ReCaptchaProvider>
      <Chatbot />
    </div>
  );
};

export default Index;
