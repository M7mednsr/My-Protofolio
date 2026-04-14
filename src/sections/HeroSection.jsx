import React, { useEffect, useRef, useState } from 'react';
import ParticleCanvas from '../components/ParticleCanvas';

const TYPED_STRINGS = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'JavaScript Expert',
];

const useTypingEffect = (strings, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentString = strings[currentIndex];
    let timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % strings.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText === currentString) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isPaused, strings, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

const HeroSection = () => {
  const typedText = useTypingEffect(TYPED_STRINGS);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      <ParticleCanvas />

      {/* Gradient blobs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div
        ref={sectionRef}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          background: 'rgba(79,142,247,0.08)',
          border: '1px solid rgba(79,142,247,0.2)',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#4f8ef7',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '28px',
          animation: 'float 4s ease-in-out infinite',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4f8ef7', display: 'inline-block', boxShadow: '0 0 8px #4f8ef7' }} />
          Available for Work
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: '900',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          marginBottom: '16px',
          color: 'var(--text-primary)',
        }}>
          Hi, I'm{' '}
          <span style={{
            background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Mohamed Nasr
          </span>
        </h1>

        {/* Typing effect */}
        <div style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: '600',
          fontFamily: 'Inter, sans-serif',
          height: '2.5rem',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>I'm a</span>
          <span style={{
            background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {typedText}
          </span>
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1.4rem',
            background: 'linear-gradient(180deg, #4f8ef7, #a855f7)',
            borderRadius: '2px',
            animation: 'blink 1s step-end infinite',
          }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          maxWidth: '580px',
          margin: '0 auto 48px',
          fontFamily: 'Inter, sans-serif',
        }}>
          Crafting immersive digital experiences through clean code,
          thoughtful design, and a relentless passion for building
          products that users love.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <button
            id="hero-view-projects"
            className="btn-primary"
            onClick={scrollToProjects}
          >
            <span>View Projects</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            id="hero-contact"
            className="btn-secondary"
            onClick={scrollToContact}
          >
            Contact Me
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginTop: '64px',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '2', label: 'Projects Built' },
            { value: '100%', label: 'Passion' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '800',
                fontFamily: 'Inter, sans-serif',
                background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1',
              }}>{stat.value}</div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                fontFamily: 'Inter, sans-serif',
                marginTop: '6px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'float 3s ease-in-out infinite',
        zIndex: 1,
      }}>
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
        }}>Scroll</span>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          padding: '4px 0',
        }}>
          <div style={{
            width: '4px',
            height: '8px',
            background: 'linear-gradient(180deg, #4f8ef7, #a855f7)',
            borderRadius: '2px',
            animation: 'scrollDot 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
