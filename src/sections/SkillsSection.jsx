import React, { useEffect, useRef, useState } from 'react';

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};

const skills = [
  { name: 'HTML5', icon: '🌐', level: 95, color: '#e34f26', category: 'Core' },
  { name: 'CSS3', icon: '🎨', level: 92, color: '#1572b6', category: 'Core' },
  { name: 'JavaScript', icon: '⚡', level: 88, color: '#f7df1e', category: 'Core' },
  { name: 'React', icon: '⚛️', level: 85, color: '#61dafb', category: 'Framework' },
  { name: 'Tailwind CSS', icon: '💨', level: 82, color: '#38bdf8', category: 'Framework' },
  { name: 'Git & GitHub', icon: '🐙', level: 80, color: '#4f8ef7', category: 'Tools' },
  { name: 'REST APIs', icon: '🔌', level: 78, color: '#a855f7', category: 'Integration' },
  { name: 'Vite', icon: '📦', level: 75, color: '#646cff', category: 'Tools' },
];

const SkillCard = ({ skill, index }) => {
  const [animated, setAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setTimeout(() => setAnimated(true), index * 100 + 200);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="reveal"
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          padding: '28px 24px',
          borderRadius: '20px',
          background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: hovered
            ? `1px solid ${skill.color}40`
            : '1px solid var(--border-color)',
          boxShadow: hovered ? `0 0 30px ${skill.color}20` : 'none',
          transition: 'all 0.35s ease',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          cursor: 'default',
        }}
      >
        {/* Icon & name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{
              fontSize: '2.2rem',
              marginBottom: '10px',
              filter: hovered ? `drop-shadow(0 0 10px ${skill.color}80)` : 'none',
              transition: 'filter 0.3s ease',
            }}>
              {skill.icon}
            </div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-primary)',
            }}>{skill.name}</h3>
          </div>
          <div style={{
            padding: '4px 12px',
            background: `${skill.color}15`,
            border: `1px solid ${skill.color}30`,
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: '600',
            color: skill.color,
            fontFamily: 'Inter, sans-serif',
          }}>
            {skill.category}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Proficiency</span>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              color: skill.color,
            }}>{skill.level}%</span>
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: animated ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
              borderRadius: '10px',
              transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: animated ? `0 0 10px ${skill.color}60` : 'none',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const titleRef = useReveal();

  return (
    <section
      id="skills"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary, #111114)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.3), transparent)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-badge">My Skills</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            Technologies I{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Master
            </span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}>
            A carefully curated skill set focused on building modern, performant, and beautiful web applications.
          </p>
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
