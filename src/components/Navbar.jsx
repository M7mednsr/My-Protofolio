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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '14px 0' : '22px 0',
        background: scrolled
          ? 'rgba(15,15,15,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '800',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 0 20px rgba(79,142,247,0.4)',
          }}>M</div>
          <span style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Mohamed</span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: activeSection === link.id ? '1px solid rgba(79,142,247,0.3)' : '1px solid transparent',
                borderRadius: '50px',
                padding: '8px 20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                color: activeSection === link.id ? '#4f8ef7' : 'var(--text-secondary)',
                background: activeSection === link.id ? 'rgba(79,142,247,0.08)' : 'transparent',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                if (activeSection !== link.id) {
                  e.currentTarget.style.color = '#f8f8ff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }
              }}
              onMouseLeave={e => {
                if (activeSection !== link.id) {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              color: 'var(--text-primary)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(79,142,247,0.15)';
              e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hire Me Button */}
          <a
            href="mailto:m7mednsr999@gmail.com"
            id="hire-me-btn"
            className="btn-primary"
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            <span>Hire Me</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'pointer',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              transition: 'all 0.3s ease',
            }}
            className="mobile-menu-btn-elem"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '20px',
                height: '2px',
                background: 'var(--text-primary)',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(15,15,15,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: activeSection === link.id ? 'rgba(79,142,247,0.08)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 16px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                color: activeSection === link.id ? '#4f8ef7' : 'var(--text-primary)',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
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
