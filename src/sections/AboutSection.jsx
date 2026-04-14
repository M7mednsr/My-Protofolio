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
      className="py-[120px] px-6 bg-(--bg-primary) relative overflow-hidden"
    >
      {/* Background decoration */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-[72px]">
          <div className="section-badge">About Me</div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold font-['Inter',sans-serif] leading-[1.2] tracking-[-1px] text-(--text-primary)">
            Crafting Digital{' '}
            <span className="bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">
              Experiences
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 items-center mb-[72px]">
          {/* Avatar & decorative */}
          <div ref={textRef} className="reveal-left flex justify-center">
            <div className="relative inline-block">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-[28px] bg-linear-to-br from-[#4f8ef7] to-[#a855f7] z-0 opacity-70 blur-md" />
              {/* Avatar container */}
              <div 
                className="relative z-10 w-[280px] h-[320px] rounded-[24px] border border-[#4f8ef74d] flex flex-col items-center justify-center gap-3 backdrop-blur-md"
                style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(168,85,247,0.15))' }}
              >
                <div className="text-[5rem] leading-none">👨‍💻</div>
                <div className="py-2 px-5 bg-[#4f8ef71a] border border-[#4f8ef740] rounded-full text-[0.8rem] font-semibold text-[#4f8ef7] font-['Inter',sans-serif] tracking-[1px]">
                  Frontend Developer
                </div>
                {/* Floating badges */}
                {[
                  { text: 'React', pos: { top: '16px', right: '-20px' }, color: '#4f8ef7' },
                  { text: 'JS', pos: { bottom: '60px', left: '-24px' }, color: '#a855f7' },
                  { text: 'CSS', pos: { bottom: '20px', right: '-20px' }, color: '#4f8ef7' },
                ].map((badge, i) => (
                  <div key={i} 
                    className="absolute px-3.5 py-1.5 bg-[#0f0f0fe6] rounded-full text-[0.75rem] font-bold font-['Inter',sans-serif] backdrop-blur-md"
                    style={{
                      ...badge.pos,
                      border: `1px solid ${badge.color}40`,
                      color: badge.color,
                      animation: `float-badge-${i} ${3 + i}s ease-in-out infinite`,
                      boxShadow: `0 0 15px ${badge.color}30`,
                    }}
                  >
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div ref={textRef} className="reveal-right">
            <p className="text-[1.05rem] leading-[1.9] text-(--text-secondary) font-['Inter',sans-serif] mb-6">
              I'm <strong className="text-(--text-primary) font-bold">Mohamed Nasr</strong>, a passionate Frontend Developer with a deep love for crafting seamless, beautiful web experiences. With a strong foundation in JavaScript and React, I bridge the gap between design and engineering.
            </p>
            <p className="text-[1.05rem] leading-[1.9] text-(--text-secondary) font-['Inter',sans-serif] mb-8">
              I specialize in building real-world applications that are not just functional, but truly memorable. From dynamic dashboards to pixel-perfect landing pages, I approach every project with precision, creativity, and purpose.
            </p>

            {/* Tech keywords */}
            <div className="flex flex-wrap gap-2.5">
              {['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs', 'Responsive Design', 'Vite'].map(tech => (
                <span 
                  key={tech} 
                  className="px-4 py-1.5 bg-[#4f8ef714] border border-[#4f8ef733] rounded-full text-[0.8rem] font-semibold text-[#4f8ef7] font-['Inter',sans-serif] transition-all duration-300 cursor-default hover:bg-[#4f8ef72e] hover:shadow-[0_0_15px_rgba(79,142,247,0.2)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div ref={cardsRef} className="reveal grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="glass glass-hover p-7 rounded-[20px] transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-[2rem] mb-3.5">{item.icon}</div>
              <h3 className="text-[1rem] font-bold font-['Inter',sans-serif] text-(--text-primary) mb-2">
                {item.title}
              </h3>
              <p className="text-[0.85rem] text-(--text-secondary) leading-[1.6] font-['Inter',sans-serif]">
                {item.desc}
              </p>
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
