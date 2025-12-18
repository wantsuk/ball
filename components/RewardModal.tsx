
import React from 'react';
import { GachaItem } from '../types';

interface RewardModalProps {
  item: GachaItem;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/20 backdrop-blur-2xl animate-in fade-in duration-500">
      
      {/* Particle Blast */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {Array.from({ length: 48 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-[3px] h-[3px] bg-pink-400 rounded-full animate-blast shadow-[0_0_8px_white]"
            style={{
              transform: `rotate(${i * 7.5}deg) translateY(0)`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-sm p-14 bg-white rounded-[60px] shadow-[0_40px_100px_rgba(255,100,160,0.15)] flex flex-col items-center text-center space-y-12 border-[8px] border-pink-50 animate-in zoom-in duration-300">
        
        <div className="space-y-2">
            <h3 className="text-pink-500 uppercase tracking-[0.6em] text-[11px] font-bold">Destiny Chosen</h3>
            <div className="h-[2px] w-20 bg-pink-100 mx-auto rounded-full"></div>
        </div>
        
        <div className="relative w-48 h-48">
           <div className="absolute inset-[-15%] rounded-full bg-pink-100/40 blur-3xl animate-pulse"></div>
           <div className="absolute inset-0 rounded-full border-[12px] border-pink-50 scale-110"></div>
           
           <div 
             className="relative w-full h-full rounded-full border-2 border-pink-200 flex items-center justify-center shadow-inner overflow-hidden"
             style={{ background: `radial-gradient(circle at center, white 20%, ${item.color}33 100%)` }}
           >
              <svg viewBox="0 0 100 100" className="w-24 h-24 text-pink-600 drop-shadow-[0_4px_15px_rgba(219,39,119,0.3)]">
                 <path 
                   fill="currentColor"
                   d="M50 10 L61 39 L92 39 L67 58 L77 88 L50 70 L23 88 L33 58 L8 39 L39 39 Z" 
                 />
              </svg>
           </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-pink-800 font-bold text-5xl md:text-7xl tracking-tighter leading-none">
            {item.name}
          </h2>
          <p className="text-pink-400/80 font-bold text-sm tracking-widest uppercase">
            Your Fate Awaits
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-6 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-[32px] transition-all active:scale-95 shadow-2xl shadow-pink-100 uppercase tracking-[0.5em] text-xs"
        >
          Accept Destiny
        </button>
      </div>

      <style>{`
        @keyframes blast {
          0% { transform: rotate(var(--tw-rotate)) translateY(0); opacity: 1; height: 3px; width: 3px; }
          100% { transform: rotate(var(--tw-rotate)) translateY(-500px); opacity: 0; height: 140px; width: 1.5px; }
        }
        .animate-blast {
          animation: blast 1.5s cubic-bezier(0, .6, .4, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default RewardModal;
