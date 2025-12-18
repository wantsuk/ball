
import React from 'react';
import { GachaItem } from '../types';

interface OrbProps {
  item: GachaItem;
  isHighlight: boolean;
  isWinner: boolean;
}

const Orb: React.FC<OrbProps> = ({ item, isHighlight, isWinner }) => {
  return (
    <div 
      className={`absolute transition-all duration-700 ease-out flex flex-col items-center group z-20`}
      style={{ 
        left: `${item.position.x}%`, 
        top: `${item.position.y}%`, 
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-56 h-56 md:w-64 md:h-64">
        {/* Enchanted Outer Glow */}
        <div className={`absolute inset-[-15%] rounded-full blur-[45px] transition-all duration-1000 ${
          isWinner ? 'bg-white opacity-100 scale-125' : 
          isHighlight ? 'bg-white opacity-60 animate-pulse' : 
          'bg-pink-400 opacity-20 group-hover:opacity-40'
        }`}></div>

        {/* Crystal Orb Container */}
        <div 
          className={`relative w-full h-full rounded-full border-[3px] border-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${isHighlight ? 'scale-110 rotate-2' : 'hover:scale-105'}`}
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 60%, rgba(0,0,0,0.1) 100%)`,
            boxShadow: `inset 0 0 60px ${item.color}99, 0 0 20px rgba(255,255,255,0.5)`,
          }}
        >
          {/* Internal Aurora Pattern */}
          <div 
            className="absolute inset-0 rounded-full opacity-50 mix-blend-screen transition-opacity duration-1000 aurora-glow"
            style={{ 
              background: `radial-gradient(circle at center, ${item.color} 0%, transparent 85%)`,
            }}
          ></div>

          {/* Sparkling Silver Patterns */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <path d="M50 0 L50 100 M0 50 L100 50" stroke="currentColor" strokeWidth="0.1" />
                <circle cx="25" cy="25" r="1" fill="white" className="animate-pulse" />
                <circle cx="75" cy="75" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
             </svg>
          </div>

          {/* Extra Large Bold Font */}
          <span className="relative z-10 text-white font-bold text-center px-4 text-4xl md:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] break-words leading-none max-w-[95%] select-none">
            {item.name}
          </span>
          
          {/* Specular Glints */}
          <div className="absolute top-[10%] left-[15%] w-[35%] h-[20%] bg-white/60 rounded-full rotate-[-45deg] blur-[2px]"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[10%] h-[10%] bg-white/40 rounded-full blur-[3px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Orb;
