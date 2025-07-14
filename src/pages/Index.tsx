import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import IndustryAutomationHub from "@/components/IndustryAutomationHub";
import { Contact } from "@/components/Contact";
import { ReCaptchaProvider } from "@/components/ReCaptchaProvider";
import MinimalNavigation from "@/components/MinimalNav";

const Index = () => {
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
      <section id="contact">
        <ReCaptchaProvider>
          <Contact />
        </ReCaptchaProvider>
      </section>
    </div>
  );
};

export default Index;
