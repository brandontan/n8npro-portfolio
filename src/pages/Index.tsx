import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import IndustryAutomationHub from "@/components/IndustryAutomationHub";
import { Contact } from "@/components/Contact";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";
import MinimalNavigation from "@/components/MinimalNav";
import Activities from "@/components/Activities";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Normal behavior - scroll to top
    window.scrollTo(0, 0);
    
    // Debug: Check if we're in dev mode
    console.log('Is development mode:', import.meta.env.DEV);
    console.log('Environment:', import.meta.env.MODE);
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <MinimalNavigation />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="industry">
        <IndustryAutomationHub />
      </section>
      {/* Show activities section only in development */}
      {import.meta.env.DEV && (
        <section id="activities">
          <Activities />
        </section>
      )}
      <section id="contact">
        <ReCaptchaProvider>
          <Contact />
        </ReCaptchaProvider>
      </section>
    </div>
  );
};

export default Index;
