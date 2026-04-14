import React, { useEffect, useRef } from 'react';

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

const AboutSection = () => {
  const titleRef = useReveal();
  const textRef = useReveal(0.1);
  const cardsRef = useReveal(0.1);

  const highlights = [
    { icon: '🎯', title: 'Problem Solver', desc: 'Turning complex challenges into elegant, intuitive solutions.' },
    { icon: '⚡', title: 'Performance First', desc: 'Obsessed with building fast, optimized user experiences.' },
    { icon: '🎨', title: 'Design-Driven', desc: 'Bridging the gap between stunning visuals and clean code.' },
    { icon: '🚀', title: 'Always Learning', desc: 'Continuously exploring new technologies and best practices.' },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-badge">About Me</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
          }}>
            Crafting Digital{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Experiences
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '72px',
        }}>
          {/* Avatar & decorative */}
          <div ref={textRef} className="reveal-left" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Glow ring */}
              <div style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
                zIndex: 0,
                opacity: 0.7,
                filter: 'blur(8px)',
              }} />
              {/* Avatar container */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: '280px',
                height: '320px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(168,85,247,0.15))',
                border: '1px solid rgba(79,142,247,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  fontSize: '5rem',
                  lineHeight: '1',
                }}>👨‍💻</div>
                <div style={{
                  padding: '8px 20px',
                  background: 'rgba(79,142,247,0.1)',
                  border: '1px solid rgba(79,142,247,0.25)',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#4f8ef7',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '1px',
                }}>
                  Frontend Developer
                </div>
                {/* Floating badges */}
                {[
                  { text: 'React', pos: { top: '16px', right: '-20px' }, color: '#4f8ef7' },
                  { text: 'JS', pos: { bottom: '60px', left: '-24px' }, color: '#a855f7' },
                  { text: 'CSS', pos: { bottom: '20px', right: '-20px' }, color: '#4f8ef7' },
                ].map((badge, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    ...badge.pos,
                    padding: '6px 14px',
                    background: 'rgba(15,15,15,0.9)',
                    border: `1px solid ${badge.color}40`,
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: badge.color,
                    fontFamily: 'Inter, sans-serif',
                    backdropFilter: 'blur(10px)',
                    animation: `float-badge-${i} ${3 + i}s ease-in-out infinite`,
                    boxShadow: `0 0 15px ${badge.color}30`,
                  }}>
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div ref={textRef} className="reveal-right">
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.9',
              color: 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '24px',
            }}>
              I'm <strong style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Mohamed Nasr</strong>, a passionate Frontend Developer with a deep love for crafting seamless, beautiful web experiences. With a strong foundation in JavaScript and React, I bridge the gap between design and engineering.
            </p>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.9',
              color: 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '32px',
            }}>
              I specialize in building real-world applications that are not just functional, but truly memorable. From dynamic dashboards to pixel-perfect landing pages, I approach every project with precision, creativity, and purpose.
            </p>

            {/* Tech keywords */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs', 'Responsive Design', 'Vite'].map(tech => (
                <span key={tech} style={{
                  padding: '6px 16px',
                  background: 'rgba(79,142,247,0.08)',
                  border: '1px solid rgba(79,142,247,0.2)',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#4f8ef7',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(79,142,247,0.18)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(79,142,247,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(79,142,247,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div ref={cardsRef} className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}>
          {highlights.map((item, i) => (
            <div
              key={i}
              className="glass glass-hover"
              style={{
                padding: '28px 24px',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{item.icon}</div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}>{item.title}</h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                fontFamily: 'Inter, sans-serif',
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-badge-0 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes float-badge-1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes float-badge-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      `}</style>
    </section>
  );
};

export default AboutSection;
