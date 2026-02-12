import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'AI Designer', href: '#ai-designer' },
    { name: 'Contact', href: '#contact' },
  ];

  const WHATSAPP_LINK = "https://wa.link/rhm7bw";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-[#0B0F0E]/90 backdrop-blur-2xl py-4 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center md:flex-row">
        
        {/* Left: Logo */}
        <div className="flex justify-start">
          <a href="#home" className="group cursor-pointer h-10 md:h-14 flex items-center">
            <img 
              src="logo.png" 
              alt="Interiorswala" 
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 brightness-110 drop-shadow-md"
            />
          </a>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex justify-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-300 relative group whitespace-nowrap text-white/60 hover:text-[#1FAE9B]`}>
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1FAE9B] transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right: CTA & Toggle */}
        <div className="flex justify-end items-center gap-4">
          <a 
            href={WHATSAPP_LINK} 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-8 py-3 bg-[#1FAE9B] text-white text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white hover:text-[#1FAE9B] transition-all duration-500 shadow-lg shadow-[#1FAE9B]/10"
          >
            Free Consultation
          </a>
          
          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-white hover:text-[#1FAE9B] transition-colors relative z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 bg-[#0B0F0E] z-50 p-8 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif italic tracking-[0.3em] text-white/40 hover:text-[#1FAE9B] transition-colors uppercase whitespace-nowrap"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 px-10 py-4 bg-[#1FAE9B] text-white text-[10px] uppercase tracking-[0.4em] font-bold text-center w-full"
            >
              Free Consultation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;