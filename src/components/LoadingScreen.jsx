import React, { useEffect, useRef } from 'react';

const LoadingScreen = ({ onDone }) => {
  const barRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.opacity = '0';
            containerRef.current.style.transform = 'scale(1.03)';
            setTimeout(onDone, 600);
          }
        }, 400);
      }
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0f0f0f] flex flex-col items-center justify-center z-9999 transition-all duration-600 ease-in-out"
    >
      {/* Animated logo */}
      <div className="mb-10 relative">
        <div className="w-[80px] h-[80px] rounded-[22px] bg-linear-to-br from-[#4f8ef7] to-[#a855f7] flex items-center justify-center text-[2rem] font-black text-white font-['Inter',sans-serif] shadow-[0_0_60px_rgba(79,142,247,0.5),0_0_100px_rgba(168,85,247,0.3)] animate-[pulse-logo_2s_ease-in-out_infinite]">
          M
        </div>
        <div className="absolute -inset-2 rounded-[30px] border-2 border-transparent bg-[linear-gradient(135deg,#4f8ef7,#a855f7)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] mask-exclude animate-[spin-border_3s_linear_infinite]" />
      </div>

      <h1 className="font-['Inter',sans-serif] text-[1.5rem] font-bold mb-2 bg-linear-to-br from-[#4f8ef7] to-[#a855f7] text-transparent bg-clip-text tracking-[-0.5px]">
        Mohamed Nasr
      </h1>
      <p className="font-['Inter',sans-serif] text-[0.85rem] text-[#6b6b80] tracking-[3px] uppercase mb-12">
        Frontend Developer
      </p>

      {/* Progress bar */}
      <div className="w-[200px] h-[3px] bg-white/5 rounded-[10px] overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-0 bg-linear-to-r from-[#4f8ef7] to-[#a855f7] rounded-[10px] transition-[width] duration-150 ease-in-out shadow-[0_0_10px_rgba(79,142,247,0.8)]"
        />
      </div>

      <style>{`
        @keyframes pulse-logo {
          0%, 100% { box-shadow: 0 0 60px rgba(79,142,247,0.5), 0 0 100px rgba(168,85,247,0.3); }
          50% { box-shadow: 0 0 80px rgba(79,142,247,0.8), 0 0 130px rgba(168,85,247,0.5); }
        }
        @keyframes spin-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
