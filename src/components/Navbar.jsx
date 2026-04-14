import React, { useState, useEffect } from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-400 ease-in-out ${scrolled ? 'py-[14px] bg-[#0f0f0fd9] backdrop-blur-[20px] border-b border-white/5' : 'py-[22px] bg-transparent'}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="bg-transparent border-none cursor-pointer flex items-center gap-2.5 no-underline"
        >
          <div className="w-9 h-9 bg-linear-to-br from-[#4f8ef7] to-[#a855f7] rounded-[10px] flex items-center justify-center text-[16px] font-extrabold text-white font-['Inter',sans-serif] shadow-[0_0_20px_rgba(79,142,247,0.4)]">M</div>
          <span className="text-[1.1rem] font-bold font-['Inter',sans-serif] bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">Mohamed</span>
        </button>

        {/* Desktop Nav */}
        <div className="desktop-nav flex items-center gap-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`bg-transparent rounded-full px-5 py-2 cursor-pointer text-[0.9rem] font-medium font-['Inter',sans-serif] transition-all duration-300 ${activeSection === link.id ? 'border border-[#4f8ef74d] text-[#4f8ef7] bg-[#4f8ef714]' : 'border border-transparent text-(--text-secondary) hover:text-[#f8f8ff] hover:border-white/15'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 cursor-pointer flex items-center justify-center text-[1.1rem] transition-all duration-300 text-(--text-primary) hover:bg-[#4f8ef726] hover:border-[#4f8ef766]"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hire Me Button */}
          <a
            href="mailto:m7mednsr999@gmail.com"
            id="hire-me-btn"
            className="btn-primary py-[9px] px-[22px] text-[0.85rem]"
          >
            <span>Hire Me</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn-elem hidden w-10 h-10 rounded-[10px] border border-white/10 bg-white/5 cursor-pointer flex-col items-center justify-center gap-[5px] transition-all duration-300"
          >
            {[0, 1, 2].map(i => (
              <span key={i} className="block w-5 h-[2px] bg-(--text-primary) rounded-[2px] transition-all duration-300" />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0f0f0ff7] backdrop-blur-[20px] border-b border-white/5 px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`border-none rounded-[10px] px-4 py-3.5 cursor-pointer text-[1rem] font-medium font-['Inter',sans-serif] text-left transition-all duration-200 ${activeSection === link.id ? 'bg-[#4f8ef714] text-[#4f8ef7]' : 'bg-transparent text-(--text-primary)'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn-elem { display: flex !important; }
          #hire-me-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
