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
      el.classList.remove('opacity-0', 'translate-y-[30px]');
      el.classList.add('opacity-100', 'translate-y-0');
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
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-(--bg-primary)"
    >
      <ParticleCanvas />

      {/* Gradient blobs */}
      <div 
        className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)' }}
      />

      <div
        ref={sectionRef}
        className="relative z-10 text-center px-6 max-w-[800px] opacity-0 translate-y-[30px] transition-all duration-1000 ease-out"
      >
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 py-2 px-5 bg-[#4f8ef714] border border-[#4f8ef733] rounded-full text-[0.8rem] font-semibold text-[#4f8ef7] tracking-[2px] uppercase mb-7"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] inline-block shadow-[0_0_8px_#4f8ef7]" />
          Available for Work
        </div>

        {/* Name */}
        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black font-['Inter',sans-serif] leading-[1.1] tracking-[-2px] mb-4 text-(--text-primary)">
          Hi, I'm{' '}
          <span className="bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">
            Mohamed Nasr
          </span>
        </h1>

        {/* Typing effect */}
        <div className="text-[clamp(1.2rem,3vw,1.8rem)] font-semibold font-['Inter',sans-serif] h-10 mb-6 flex items-center justify-center gap-2">
          <span className="text-(--text-secondary)">I'm a</span>
          <span className="bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text">
            {typedText}
          </span>
          <span 
            className="inline-block w-[2px] h-[1.4rem] bg-linear-to-b from-[#4f8ef7] to-[#a855f7] rounded-sm"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        </div>

        {/* Tagline */}
        <p className="text-[clamp(0.95rem,2vw,1.15rem)] text-(--text-secondary) leading-[1.8] max-w-[580px] mx-auto mb-12 font-['Inter',sans-serif]">
          Crafting immersive digital experiences through clean code,
          thoughtful design, and a relentless passion for building
          products that users love.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            id="hero-view-projects"
            className="btn-primary"
            onClick={scrollToProjects}
          >
            <div className="flex items-center gap-2">
              <span>View Projects</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
        <div className="flex gap-10 justify-center mt-16 flex-wrap">
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '2', label: 'Projects Built' },
            { value: '100%', label: 'Passion' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[2rem] font-extrabold font-['Inter',sans-serif] bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text leading-none">
                {stat.value}
              </div>
              <div className="text-[0.8rem] text-(--text-muted) font-['Inter',sans-serif] mt-1.5 tracking-[1px] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <span className="text-[0.7rem] text-(--text-muted) tracking-[2px] uppercase font-['Inter',sans-serif]">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/10 rounded-xl flex justify-center py-1">
          <div 
            className="w-1 h-2 bg-linear-to-b from-[#4f8ef7] to-[#a855f7] rounded-sm"
            style={{ animation: 'scrollDot 2s ease-in-out infinite' }}
          />
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
