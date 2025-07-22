import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import ModernActivities from "@/components/ModernActivities";
import IndustryAutomationHub from "@/components/IndustryAutomationHub";
import { Contact } from "@/components/Contact";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";
import MinimalNavigation from "@/components/MinimalNav";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if we have a hash in the URL
    if (window.location.hash === '#activities') {
      // Wait for the page to render then scroll to activities
      setTimeout(() => {
        const activitiesSection = document.getElementById('activities');
        if (activitiesSection) {
          activitiesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Normal behavior - scroll to top
      window.scrollTo(0, 0);
    }
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
      <section id="activities">
        <ModernActivities />
      </section>
      <section id="industry">
        <IndustryAutomationHub />
      </section>
      <section id="contact">
        <ReCaptchaProvider>
          <Contact />
        </ReCaptchaProvider>
      </section>
    </div>
  );
};

export default Index;
