import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '800',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 0 20px rgba(79,142,247,0.35)',
            }}>M</div>
            <div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Mohamed Nasr</div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b6b80',
                fontFamily: 'Inter, sans-serif',
              }}>Frontend Developer</div>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {links.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontFamily: 'Inter, sans-serif',
                  color: '#6b6b80',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4f8ef7'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b6b80'; }}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontSize: '0.82rem',
            color: '#6b6b80',
            fontFamily: 'Inter, sans-serif',
          }}>
            © {year} Mohamed Nasr. Built with{' '}
            <span style={{ color: '#4f8ef7', fontWeight: '600' }}>React</span> &{' '}
            <span style={{ color: '#a855f7', fontWeight: '600' }}>passion</span>.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href="https://github.com/M7mednsr"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github"
              style={{ color: '#6b6b80', transition: 'color 0.2s ease', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f8f8ff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6b6b80'; }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-nasr-7730a7296"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin"
              style={{ color: '#6b6b80', transition: 'color 0.2s ease', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0077b5'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6b6b80'; }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
