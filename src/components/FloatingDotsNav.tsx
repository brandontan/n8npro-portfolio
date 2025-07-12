import { useEffect, useState } from 'react';

export function FloatingDotsNav() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-4">
        {sections.map(({ id, label }) => (
          <li key={id} className="group relative">
            <button
              onClick={() => scrollToSection(id)}
              className="block p-2"
              aria-label={`Navigate to ${label}`}
            >
              <span className="relative flex items-center">
                {/* Dot */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeSection === id
                      ? 'w-3 h-3 md:w-3 md:h-3 bg-primary shadow-lg shadow-primary/50'
                      : 'w-3 h-3 md:w-2 md:h-2 bg-white/20 hover:bg-white/40 hover:scale-125'
                  }`}
                />
                
                {/* Label on hover - desktop only */}
                <span className="absolute right-8 px-3 py-1 glass-card rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                  <span className="text-sm font-medium text-white">{label}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}