
import React, { useState, useCallback, useRef } from 'react';
import { GACHA_ITEMS } from './constants';
import { GachaItem } from './types';
import Orb from './components/Orb';
import AdminPanel from './components/AdminPanel';
import RewardModal from './components/RewardModal';
import BackgroundEffects from './components/BackgroundEffects';

const App: React.FC = () => {
  const [items, setItems] = useState<GachaItem[]>(GACHA_ITEMS);
  const [isPulling, setIsPulling] = useState(false);
  const [reward, setReward] = useState<GachaItem | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playSparkleSound = () => {
    if (!soundOn) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  const playVictorySound = () => {
    if (!soundOn) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const now = ctx.currentTime;
    
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.1, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.5);
    });
  };

  const handleUpdateItem = (id: string, updates: Partial<GachaItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const pullFate = useCallback(() => {
    if (isPulling) return;
    
    initAudio();
    playSparkleSound();
    setIsPulling(true);
    setReward(null);
    setShowReward(false);

    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
    if (totalWeight <= 0) {
      setIsPulling(false);
      alert("Add probability to weave your destiny!");
      return;
    }

    let random = Math.random() * totalWeight;
    let selectedItem = items[0];
    for (const item of items) {
      if (random < item.weight) {
        selectedItem = item;
        break;
      }
      random -= item.weight;
    }

    setTimeout(() => {
      setReward(selectedItem);
      setShowReward(true);
      setIsPulling(false);
      playVictorySound();
    }, 1200);
  }, [items, isPulling, soundOn]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      <BackgroundEffects />

      {/* Top Interface */}
      <div className="w-full flex justify-between items-start p-6 z-50">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-6xl font-mystical text-pink-600 drop-shadow-sm">
            Oracle of Fate
          </h1>
          <p className="text-pink-400 font-bold uppercase tracking-[0.3em] text-[10px] ml-1">
            Woven in Light
          </p>
        </div>

        <button 
          onClick={() => setSoundOn(!soundOn)}
          className="p-3 bg-white/40 backdrop-blur-md rounded-full border border-pink-200 shadow-sm hover:bg-white/60 transition-all active:scale-90"
          title={soundOn ? "Mute Sound" : "Unmute Sound"}
        >
          {soundOn ? (
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          ) : (
            <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
          )}
        </button>
      </div>

      {/* Main Gacha Area */}
      <section className="relative w-full max-w-[100rem] h-[65vh] md:h-[70vh] flex items-center justify-center z-10">
        <div className="relative w-full h-full max-h-[800px]">
          {items.map((item) => (
            <Orb 
              key={item.id} 
              item={item} 
              isHighlight={isPulling}
              isWinner={reward?.id === item.id && showReward}
            />
          ))}
        </div>
      </section>

      {/* Center Action Button */}
      <div className="relative -mt-12 mb-20 z-30">
        <button 
          onClick={pullFate}
          disabled={isPulling}
          className={`group relative transition-all duration-500 active:scale-90 ${isPulling ? 'opacity-40 grayscale pointer-events-none' : 'hover:scale-110'}`}
        >
          <div className="absolute inset-[-40%] bg-pink-300/30 blur-3xl rounded-full scale-110 animate-pulse"></div>
          
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
             <svg viewBox="0 0 200 200" className="absolute inset-0 drop-shadow-[0_4px_15px_rgba(255,100,160,0.4)]">
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#ff9ec3', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path 
                  fill="url(#heartGrad)"
                  stroke="#db2777"
                  strokeWidth="3"
                  d="M100 170c-10-10-85-80-85-115 0-25 20-40 40-40 15 0 35 10 45 25 10-15 30-25 45-25 20 0 40 15 40 40 0 35-75 105-85 115z"
                />
             </svg>
             <span className="relative z-10 text-pink-700 font-bold text-sm md:text-lg text-center px-4 leading-tight uppercase tracking-tighter">
                PULL YOUR<br/>FATE
             </span>
          </div>
        </button>
      </div>

      {/* Spacing for Admin Panel */}
      <div className="h-20 w-full" />

      {/* Admin Panel Area */}
      <AdminPanel items={items} onUpdateItem={handleUpdateItem} />

      {/* Reward Popup */}
      {showReward && reward && (
        <RewardModal 
          item={reward} 
          onClose={() => setShowReward(false)} 
        />
      )}
    </div>
  );
};

export default App;
