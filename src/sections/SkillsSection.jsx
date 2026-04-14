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
        className="px-6 py-7 rounded-[20px] backdrop-blur-md bg-(--bg-card) transition-all duration-350ms ease-out hover:-translate-y-1.5 cursor-default hover:bg-(--bg-card-hover) border"
        style={{
          borderColor: hovered ? `${skill.color}40` : 'var(--border-color)',
          boxShadow: hovered ? `0 0 30px ${skill.color}20` : 'none',
        }}
      >
        {/* Icon & name */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <div 
              className="text-[2.2rem] mb-2.5 transition-all duration-300 ease-out"
              style={{ filter: hovered ? `drop-shadow(0 0 10px ${skill.color}80)` : 'none' }}
            >
              {skill.icon}
            </div>
            <h3 className="text-[1rem] font-bold font-['Inter',sans-serif] text-(--text-primary)">
              {skill.name}
            </h3>
          </div>
          <div 
            className="px-3 py-1 border rounded-full text-[0.7rem] font-semibold font-['Inter',sans-serif]"
            style={{
              background: `${skill.color}15`,
              borderColor: `${skill.color}30`,
              color: skill.color,
            }}
          >
            {skill.category}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between mb-2">
            <span className="text-[0.75rem] text-(--text-muted) font-['Inter',sans-serif]">Proficiency</span>
            <span 
              className="text-[0.8rem] font-bold font-['Inter',sans-serif]"
              style={{ color: skill.color }}
            >
              {skill.level}%
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full w-0"
              style={{
                width: animated ? `${skill.level}%` : '0%',
                background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
                transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: animated ? `0 0 10px ${skill.color}60` : 'none',
              }} 
            />
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
      className="py-[120px] px-6 bg-(--bg-secondary,#111114) relative overflow-hidden"
    >
      {/* Decoration */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.3), transparent)' }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }}
      />

      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-[72px]">
          <div className="section-badge">My Skills</div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold font-['Inter',sans-serif] tracking-[-1px] text-(--text-primary) mb-4">
            Technologies I{' '}
            <span className="bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">
              Master
            </span>
          </h2>
          <p className="text-[1rem] text-(--text-secondary) font-['Inter',sans-serif] max-w-[480px] mx-auto leading-[1.7]">
            A carefully curated skill set focused on building modern, performant, and beautiful web applications.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
