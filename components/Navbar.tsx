'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          Rangi Ho
        </button>
        
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-1">
          {['About', 'Experience', 'Projects', 'Activities'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())} 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="flex flex-col px-4 py-4 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {['About', 'Experience', 'Projects', 'Activities'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="py-3 text-left text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
