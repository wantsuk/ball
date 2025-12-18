
import React from 'react';
import { GachaItem } from '../types';

interface AdminPanelProps {
  items: GachaItem[];
  onUpdateItem: (id: string, updates: Partial<GachaItem>) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ items, onUpdateItem }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-3xl border-t-4 border-pink-200 p-8 z-40 relative">
      <div className="max-w-[110rem] mx-auto flex flex-col gap-6">
        {/* Header with clear separation */}
        <div className="flex items-center justify-between border-b-2 border-pink-100 pb-4">
           <div className="flex items-center space-x-3">
             <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
             <h3 className="text-pink-600 uppercase text-xs tracking-[0.5em] font-bold">Fortune Weaver Panel</h3>
           </div>
           <div className="text-pink-300 text-[10px] font-bold tracking-widest uppercase">Destiny Synchronized</div>
        </div>
        
        {/* Compact & Accessible Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col space-y-4 p-5 bg-pink-50/50 rounded-3xl border border-pink-100 hover:shadow-lg transition-all group">
              {/* Item Name Editor */}
              <div className="flex flex-col">
                <label className="text-[10px] text-pink-400 uppercase mb-2 font-bold tracking-widest">Orb Title</label>
                <input 
                  type="text" 
                  value={item.name}
                  onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                  className="bg-white border-2 border-pink-100 rounded-2xl px-4 py-2 text-pink-700 text-sm font-bold focus:outline-none focus:border-pink-400 transition-colors font-gaegu w-full shadow-sm"
                  placeholder="Rename Fate..."
                />
              </div>
              {/* Probability Editor */}
              <div className="flex flex-col">
                <label className="text-[10px] text-pink-400 uppercase mb-2 font-bold tracking-widest">Fate Odds (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    value={item.weight}
                    onChange={(e) => onUpdateItem(item.id, { weight: Math.max(0, Math.min(100, Number(e.target.value))) })}
                    className="w-full bg-white border-2 border-pink-100 rounded-2xl px-4 py-2 text-pink-700 text-sm font-bold focus:outline-none focus:border-pink-400 transition-colors font-gaegu shadow-sm"
                  />
                  <span className="absolute right-4 top-2 text-pink-400 text-sm font-bold">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual Indicator of Panel Base */}
      <div className="h-12 w-full flex justify-center items-center mt-6">
        <span className="text-pink-200 text-[10px] tracking-[1em] uppercase font-bold">End of Weaver Panel</span>
      </div>
    </div>
  );
};

export default AdminPanel;
