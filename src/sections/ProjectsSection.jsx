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
    demo: 'https://blogging-platform-rouge-eta.vercel.app',
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
      className="reveal h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="group relative rounded-3xl backdrop-blur-md overflow-hidden flex flex-col h-full cursor-default transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          background: hovered ? project.gradient : 'var(--bg-card)',
          border: hovered ? `1px solid ${project.borderColor}` : '1px solid var(--border-color)',
          boxShadow: hovered ? `0 20px 60px ${project.glowColor}, 0 0 0 1px ${project.borderColor}` : 'none',
          transform: hovered
            ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        }}
      >
        {/* Card top */}
        <div className="pt-7 px-7 pb-0 flex justify-between items-start mb-5">
          <div
            className="w-14 h-14 rounded-2xl border flex items-center justify-center text-[1.8rem] transition-all duration-300"
            style={{
              background: hovered ? `${project.borderColor}` : 'rgba(255,255,255,0.05)',
              borderColor: project.borderColor,
              boxShadow: hovered ? `0 0 20px ${project.glowColor}` : 'none',
            }}
          >
            {project.emoji}
          </div>
          <span
            className="px-[14px] py-[5px] border rounded-full text-[0.7rem] font-bold text-(--text-secondary) font-['Inter',sans-serif] tracking-[1px] uppercase transition-all duration-300"
            style={{
              background: hovered ? `${project.borderColor}` : 'rgba(255,255,255,0.04)',
              borderColor: project.borderColor,
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Content */}
        <div className="px-7 pb-7 flex-1 flex flex-col">
          <h3 className="text-[1.25rem] font-bold font-['Inter',sans-serif] text-(--text-primary) mb-3 tracking-[-0.5px]">
            {project.title}
          </h3>
          <p className="text-[0.88rem] text-(--text-secondary) leading-[1.7] font-['Inter',sans-serif] mb-6 flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[0.72rem] font-semibold text-(--text-secondary) font-['Inter',sans-serif]">
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-github-${project.id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-[0.83rem] font-semibold text-(--text-primary) font-['Inter',sans-serif] no-underline transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </a>
            <a
              href={project.demo}
              id={`project-demo-${project.id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-linear-to-br from-[#4f8ef7] to-[#a855f7] rounded-xl text-[0.83rem] font-semibold text-white font-['Inter',sans-serif] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(79,142,247,0.4)]"
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
      className="py-[120px] px-6 bg-(--bg-primary) relative overflow-hidden"
    >
      <div 
        className="absolute top-[30%] -right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-[72px]">
          <div className="section-badge">Portfolio</div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold font-['Inter',sans-serif] tracking-[-1px] text-(--text-primary) mb-4">
            Featured{' '}
            <span className="bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">
              Projects
            </span>
          </h2>
          <p className="text-[1rem] text-(--text-secondary) font-['Inter',sans-serif] max-w-[480px] mx-auto leading-[1.7]">
            A selection of real-world projects showcasing my skills in building modern web applications.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 items-start">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="reveal text-center mt-16">
          <a
            href="https://github.com/M7mednsr"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-github"
            className="btn-secondary inline-flex items-center gap-2"
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
