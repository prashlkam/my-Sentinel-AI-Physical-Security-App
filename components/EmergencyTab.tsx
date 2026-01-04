
import React, { useState } from 'react';
import { EMERGENCY_CHECKLISTS } from '../constants';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

const EmergencyTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(EMERGENCY_CHECKLISTS.map(c => c.category)));

  return (
    <div className="p-4 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Emergency Guides</h2>
        <p className="text-slate-400 text-sm">Instant protocols for high-stress situations.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
            selectedCategory === null ? 'bg-blue-600 border-blue-600' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          All Scenarios
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
              selectedCategory === cat ? 'bg-blue-600 border-blue-600' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {EMERGENCY_CHECKLISTS.filter(c => !selectedCategory || c.category === selectedCategory).map(guide => (
          <div key={guide.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-slate-800/50 px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                {guide.title}
              </h3>
              <span className="text-[10px] font-black uppercase text-blue-500 tracking-tighter">Essential</span>
            </div>
            
            <div className="p-6 space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Immediate Actions (Dos)</h4>
                </div>
                <ul className="space-y-3">
                  {guide.dos.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="h-px bg-slate-800 w-full" />

              <section>
                <div className="flex items-center gap-2 mb-3 text-rose-400">
                  <XCircle className="w-5 h-5" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Strict Prohibitions (Don'ts)</h4>
                </div>
                <ul className="space-y-3">
                  {guide.donts.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyTab;
