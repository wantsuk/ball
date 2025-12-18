
import React, { useMemo } from 'react';

const BackgroundEffects: React.FC = () => {
  const sparkles = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 10,
    duration: Math.random() * 4 + 4,
  })), []);

  const petals = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 10,
    rotation: Math.random() * 360,
  })), []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#faf5ff]">
      {/* Bright Pastel Nebula Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe] via-[#fdf2f8] to-[#f5f3ff]"></div>
      
      {/* Floating Nebula Clouds */}
      <div className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-pink-200/20 blur-[120px] rounded-full animate-drift"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-sky-200/20 blur-[120px] rounded-full animate-drift" style={{ animationDelay: '-10s' }}></div>
      <div className="absolute top-[20%] right-[-20%] w-[80vw] h-[80vw] bg-violet-200/20 blur-[120px] rounded-full animate-drift" style={{ animationDelay: '-5s' }}></div>

      {/* Subtle Dust/Galaxy Pattern */}
      <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Floating Sparkles */}
      {sparkles.map(s => (
        <div 
          key={`sparkle-${s.id}`}
          className="absolute bg-white rounded-full opacity-0 animate-shimmer"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: `0 0 ${s.size * 6}px white`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        ></div>
      ))}

      {/* Drifting Rose Petals */}
      {petals.map(p => (
        <div 
          key={`petal-${p.id}`}
          className="absolute text-pink-400/20"
          style={{
            top: '-50px',
            left: p.left,
            width: `${p.size}px`,
            animation: `petal-fall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ transform: `rotate(${p.rotation}deg)` }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(100px, 50px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes petal-fall {
          0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(450deg) translateX(100px); opacity: 0; }
        }
        .animate-shimmer {
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .animate-drift {
          animation: drift 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundEffects;
