
import React, { useState, useMemo } from 'react';
import { EVACUATION_PROCEDURES } from '../constants';
import { ChevronLeft, ChevronRight, Users, Plus, Minus, ChevronDown, ChevronRight as ChevronRightIcon } from 'lucide-react';

const CATEGORIES = ['Men', 'Women', 'Transgender', 'Children (<18)'];
const HEALTH_STATUSES = ['Dead', 'Seriously Injured', 'Mildly Injured', 'Not Injured'];
const EVAC_STATUSES = ['Evacuated', 'Being Evacuated', 'Not Yet Evacuated', 'Unaccounted / Missing'];

type HeadcountState = Record<string, number>;

const EvacuationTab: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [view, setView] = useState<'cards' | 'headcount'>('headcount');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  // State is keyed by "Category|Health|Evac"
  const [counts, setCounts] = useState<HeadcountState>(() => {
    const initial: HeadcountState = {};
    CATEGORIES.forEach(c => {
      HEALTH_STATUSES.forEach(h => {
        EVAC_STATUSES.forEach(e => {
          initial[`${c}|${h}|${e}`] = 0;
        });
      });
    });
    return initial;
  });

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % EVACUATION_PROCEDURES.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + EVACUATION_PROCEDURES.length) % EVACUATION_PROCEDURES.length);

  const toggleExpand = (path: string) => {
    setExpanded(prev => ({ ...prev, [path]: !prev[path] }));
  };

  // Helper to get total for a prefix path
  const getSum = (prefix: string) => {
    // Fix: Added explicit type annotation for the accumulator and cast 'val' to number to avoid 'unknown' errors.
    return Object.entries(counts).reduce((acc: number, [key, val]) => {
      return key.startsWith(prefix) ? acc + (val as number) : acc;
    }, 0);
  };

  // Fix: Explicitly typed 'a' and 'b' as numbers in the reduce callback to resolve 'unknown' type comparison errors.
  const grandTotal = useMemo(() => Object.values(counts).reduce((a: number, b: number) => a + b, 0), [counts]);

  // Cascading Increment
  const handleIncrement = (path: string, level: number) => {
    setCounts(prev => {
      const next = { ...prev };
      let targetKey = path;
      
      // If we are at a branch, cascade down to the first available bucket
      // We prioritize "Not Injured" and "Evacuated" for default adds at higher levels
      if (level === 0) { // Category level
        targetKey = `${path}|${HEALTH_STATUSES[3]}|${EVAC_STATUSES[0]}`;
      } else if (level === 1) { // Health level
        targetKey = `${path}|${EVAC_STATUSES[0]}`;
      }
      
      next[targetKey] = (next[targetKey] || 0) + 1;
      return next;
    });
  };

  // Cascading Decrement
  const handleDecrement = (path: string, level: number) => {
    if (getSum(path) === 0) return;

    setCounts(prev => {
      const next = { ...prev };
      
      // Find the first key that starts with this path and has a count > 0
      const keyToDecrement = Object.keys(next).find(k => k.startsWith(path) && next[k] > 0);
      
      if (keyToDecrement) {
        next[keyToDecrement] = next[keyToDecrement] - 1;
      }
      return next;
    });
  };

  const TreeItem: React.FC<{ label: string; path: string; level: number }> = ({ label, path, level }) => {
    const isExpanded = expanded[path];
    const sum = getSum(path);
    const hasChildren = level < 2;

    return (
      <div className="flex flex-col">
        <div className={`flex items-center justify-between p-3 rounded-xl mb-1 transition-all ${
          level === 0 ? 'bg-slate-900 border border-slate-800' : 
          level === 1 ? 'bg-slate-800/40 ml-4' : 'bg-slate-800/20 ml-8'
        }`}>
          <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => hasChildren && toggleExpand(path)}>
            {hasChildren && (
              isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRightIcon className="w-4 h-4 text-slate-500" />
            )}
            <span className={`text-sm font-medium ${level === 0 ? 'text-blue-400 font-bold' : 'text-slate-300'}`}>
              {label}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
              <button 
                onClick={(e) => { e.stopPropagation(); handleDecrement(path, level); }}
                className="p-1.5 hover:bg-slate-800 text-slate-400 active:text-red-500 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <div className="px-3 min-w-[3rem] text-center font-mono text-sm font-bold text-white border-x border-slate-800">
                {sum}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleIncrement(path, level); }}
                className="p-1.5 hover:bg-slate-800 text-slate-400 active:text-emerald-500 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="flex flex-col">
            {(level === 0 ? HEALTH_STATUSES : EVAC_STATUSES).map((sub) => (
              <TreeItem 
                key={`${path}|${sub}`} 
                label={sub} 
                path={`${path}|${sub}`} 
                level={level + 1} 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
      <div className="flex bg-slate-900 p-1 rounded-xl">
        <button 
          onClick={() => setView('cards')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'cards' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
        >
          Procedures
        </button>
        <button 
          onClick={() => setView('headcount')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'headcount' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
        >
          Headcount
        </button>
      </div>

      {view === 'cards' ? (
        <div className="relative h-[450px] flex flex-col justify-center items-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-sm shadow-2xl transition-transform active:scale-95 duration-200">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-2 block">
              {EVACUATION_PROCEDURES[currentCard].type}
            </span>
            <h2 className="text-2xl font-bold mb-6">{EVACUATION_PROCEDURES[currentCard].title}</h2>
            <ul className="space-y-4">
              {EVACUATION_PROCEDURES[currentCard].steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={prevCard} className="p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1">
              {EVACUATION_PROCEDURES.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentCard === i ? 'w-6 bg-blue-500' : 'bg-slate-700'}`} />
              ))}
            </div>
            <button onClick={nextCard} className="p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between mb-4 shadow-lg border-l-4 border-l-blue-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-white">Interactive Headcount</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Expand categories to refine status</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 overflow-hidden">
            {CATEGORIES.map(cat => (
              <TreeItem key={cat} label={cat} path={cat} level={0} />
            ))}
          </div>
          
          {/* Grand Total Section */}
          <div className="mt-6 bg-blue-600 border border-blue-500 rounded-2xl p-5 shadow-xl shadow-blue-900/20 flex items-center justify-between animate-in slide-in-from-bottom duration-500">
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Total Personnel Counted</span>
               <span className="text-sm font-bold text-white opacity-80 italic">Verified at Assembly Points</span>
             </div>
             <div className="text-4xl font-black text-white tabular-nums">
               {grandTotal}
             </div>
          </div>

          <button 
            disabled={grandTotal === 0}
            className={`mt-4 w-full py-4 rounded-xl font-black tracking-widest uppercase transition-all shadow-lg active:scale-95 ${
              grandTotal > 0 ? 'bg-slate-100 text-slate-950 shadow-white/10' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Finalize & Disseminate Report
          </button>
        </div>
      )}
    </div>
  );
};

export default EvacuationTab;
