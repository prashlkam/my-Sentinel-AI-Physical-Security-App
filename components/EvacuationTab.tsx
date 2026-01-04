
import React, { useState } from 'react';
import { EVACUATION_PROCEDURES, INITIAL_HEADCOUNT } from '../constants';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Users } from 'lucide-react';

const EvacuationTab: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [headcount, setHeadcount] = useState(INITIAL_HEADCOUNT);
  const [view, setView] = useState<'cards' | 'headcount'>('cards');

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % EVACUATION_PROCEDURES.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + EVACUATION_PROCEDURES.length) % EVACUATION_PROCEDURES.length);

  const togglePresence = (id: string) => {
    setHeadcount(prev => prev.map(p => p.id === id ? { ...p, present: !p.present } : p));
  };

  const presentCount = headcount.filter(p => p.present).length;

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500">
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
        <div className="relative h-96 flex flex-col justify-center items-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl transition-transform active:scale-95 duration-200">
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-bold">Total Personnel</h3>
                <p className="text-xs text-slate-400">Mark all present at Assembly Point</p>
              </div>
            </div>
            <div className="text-2xl font-black text-blue-500">
              {presentCount}/{headcount.length}
            </div>
          </div>
          
          <div className="space-y-2">
            {headcount.map(person => (
              <div 
                key={person.id}
                onClick={() => togglePresence(person.id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  person.present 
                    ? 'bg-blue-600/10 border-blue-500/50' 
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <span className={`font-medium ${person.present ? 'text-blue-200' : 'text-slate-400'}`}>{person.name}</span>
                {person.present ? (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-slate-700" />
                )}
              </div>
            ))}
          </div>
          
          <button className="mt-4 w-full bg-blue-600 py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-transform">
            Submit Status Report
          </button>
        </div>
      )}
    </div>
  );
};

export default EvacuationTab;
