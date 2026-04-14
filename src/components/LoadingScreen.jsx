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
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Animated logo */}
      <div style={{
        marginBottom: '40px',
        position: 'relative',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: '900',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 0 60px rgba(79,142,247,0.5), 0 0 100px rgba(168,85,247,0.3)',
          animation: 'pulse-logo 2s ease-in-out infinite',
        }}>
          M
        </div>
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '30px',
          border: '2px solid transparent',
          background: 'linear-gradient(135deg, #4f8ef7, #a855f7) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          animation: 'spin-border 3s linear infinite',
        }} />
      </div>

      <h1 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '8px',
        background: 'linear-gradient(135deg, #4f8ef7, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.5px',
      }}>
        Mohamed Nasr
      </h1>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        color: '#6b6b80',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginBottom: '48px',
      }}>
        Frontend Developer
      </p>

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '3px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, #4f8ef7, #a855f7)',
            borderRadius: '10px',
            transition: 'width 0.15s ease',
            boxShadow: '0 0 10px rgba(79,142,247,0.8)',
          }}
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
