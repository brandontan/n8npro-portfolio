import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";
import MinimalNavigation from "@/components/MinimalNav";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Lazy load heavy components
const IndustryAutomationHub = lazy(() => import("@/components/IndustryAutomationHub"));
const Activities = lazy(() => import("@/components/Activities"));

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
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <IndustryAutomationHub />
        </Suspense>
      </section>
      <section id="activities">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Activities />
        </Suspense>
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
