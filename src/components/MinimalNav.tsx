'use client'

import { useState, useEffect } from 'react'

interface NavItem {
  id: string
  label: string
  href: string
}

const baseNavItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'industry', label: 'Solutions', href: '#industry' },
]

// Add activities only in development
const devNavItems: NavItem[] = import.meta.env.DEV 
  ? [...baseNavItems, { id: 'activities', label: 'Activities', href: '#activities' }]
  : baseNavItems;

const navItems: NavItem[] = [
  ...devNavItems,
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export default function DotsNavigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDotClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-4 py-3 rounded-full backdrop-blur-sm bg-black/10 border border-white/10">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          const isHovered = hoveredDot === item.id
          
          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredDot(item.id)}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {/* Label - appears on hover */}
              <div
                className={`absolute -top-8 px-2 py-1 text-xs font-medium text-white bg-black/80 rounded transition-all duration-200 whitespace-nowrap ${
                  isHovered
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
              >
                {item.label}
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80" />
              </div>

              {/* Dot */}
              <button
                onClick={() => handleDotClick(item.href)}
                className={`rounded-full transition-all duration-300 ease-out cursor-pointer ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[hsl(217,91%,60%)]'
                    : isHovered
                    ? 'w-3.5 h-3.5 bg-white/80'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Navigate to ${item.label}`}
              />
            </div>
          )
        })}
      </div>
    </nav>
  )
}