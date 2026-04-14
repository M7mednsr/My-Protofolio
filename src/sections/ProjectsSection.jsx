import React, { useRef, useEffect, useState } from 'react';

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

const projects = [
  {
    id: 1,
    title: 'Blogging Platform',
    description: 'A comprehensive blogging website where users can share posts, thoughts, or articles. Features state management with Redux and a responsive UI using Tailwind CSS.',
    tech: ['React.js', 'Tailwind CSS', 'Redux Toolkit', 'JSON Server'],
    emoji: '📝',
    gradient: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(168,85,247,0.1))',
    borderColor: 'rgba(79,142,247,0.3)',
    glowColor: 'rgba(79,142,247,0.2)',
    github: 'https://github.com/M7mednsr/Blogging-Platform',
    demo: 'https://github.com/M7mednsr/Blogging-Platform',
    tag: 'Blog App',
  },
  {
    id: 2,
    title: 'Revive Healthy Food App',
    description: 'A responsive, pixel-perfect frontend for a healthy food and nutrition application. Implements complex UI layouts mirroring professional Figma designs.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'HTML5'],
    emoji: '🥗',
    gradient: 'linear-gradient(135deg, rgba(79,247,157,0.15), rgba(79,142,247,0.1))',
    borderColor: 'rgba(79,247,157,0.3)',
    glowColor: 'rgba(79,247,157,0.2)',
    github: 'https://github.com/Revive-Graduation-Project/Revive-Front-End',
    demo: 'https://github.com/Revive-Graduation-Project/Revive-Front-End',
    tag: 'Web App',
  },
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const revealRef = useReveal(0.1);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={revealRef}
      className="reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          borderRadius: '24px',
          background: hovered ? project.gradient : 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: hovered ? `1px solid ${project.borderColor}` : '1px solid var(--border-color)',
          boxShadow: hovered ? `0 20px 60px ${project.glowColor}, 0 0 0 1px ${project.borderColor}` : 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: hovered
            ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
          overflow: 'hidden',
          cursor: 'default',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Card top */}
        <div style={{
          padding: '28px 28px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: hovered ? `${project.borderColor}` : 'rgba(255,255,255,0.05)',
            border: `1px solid ${project.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            transition: 'all 0.3s ease',
            boxShadow: hovered ? `0 0 20px ${project.glowColor}` : 'none',
          }}>
            {project.emoji}
          </div>
          <span style={{
            padding: '5px 14px',
            background: hovered ? `${project.borderColor}` : 'rgba(255,255,255,0.04)',
            border: `1px solid ${project.borderColor}`,
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: '700',
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
          }}>
            {project.tag}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '0 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            letterSpacing: '-0.5px',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
            flex: 1,
          }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.tech.map(t => (
              <span key={t} style={{
                padding: '4px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50px',
                fontSize: '0.72rem',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                fontFamily: 'Inter, sans-serif',
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-github-${project.id}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '0.83rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </a>
            <a
              href={project.demo}
              id={`project-demo-${project.id}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.83rem',
                fontWeight: '600',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(79,142,247,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const titleRef = useReveal();

  return (
    <section
      id="projects"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-badge">Portfolio</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            Featured{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Projects
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
            A selection of real-world projects showcasing my skills in building modern web applications.
          </p>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '64px' }}>
          <a
            href="https://github.com/M7mednsr"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-github"
            className="btn-secondary"
            style={{ display: 'inline-flex' }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
