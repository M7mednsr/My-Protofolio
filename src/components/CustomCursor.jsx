import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = '1';
    ring.style.opacity = '1';

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Hover effects on interactive elements
    const onEnter = () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(79,142,247,0.8)';
      ring.style.background = 'rgba(79,142,247,0.08)';
    };
    const onLeave = () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(79,142,247,0.5)';
      ring.style.background = 'transparent';
    };

    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-99999 opacity-0 transition-opacity duration-300 bg-linear-to-br from-[#4f8ef7] to-[#a855f7] shadow-[0_0_10px_rgba(79,142,247,0.8)]"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-[1.5px] border-[#4f8ef780] pointer-events-none z-99999 opacity-0 transition-all duration-300 ease-out"
      />
    </>
  );
};

export default CustomCursor;
