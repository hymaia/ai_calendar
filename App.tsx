
import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import ScratchReveal from './components/ScratchReveal';
import ChaletIcon from './components/ChaletIcon';
import SleepingAnimal from './components/SleepingAnimal';
import { DayData } from './types';
import { CALENDAR_DAYS, WEEKDAYS, TARGET_YEAR, TARGET_MONTH, isWeekendOrHoliday } from './constants';

const App: React.FC = () => {
  const [days, setDays] = useState<DayData[]>(CALENDAR_DAYS);
  const [today] = useState(new Date());

  const getDayDetails = (dayNum: number) => {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    if (currentYear > TARGET_YEAR) return true;
    if (currentYear === TARGET_YEAR && currentMonth > TARGET_MONTH) return true;
    return currentYear === TARGET_YEAR && currentMonth === TARGET_MONTH && currentDate >= dayNum;
  };

  const handleReveal = (dayNum: number) => {
    setDays(prev => prev.map(d => d.day === dayNum ? { ...d, isUnlocked: true } : d));
  };

  const firstDayOfMonth = new Date(TARGET_YEAR, TARGET_MONTH, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7; 

  return (
    <div className="min-h-screen relative flex flex-col items-center pb-48">
      <Snowfall />

      {/* Hero Section */}
      <header className="relative z-10 w-full max-w-6xl px-8 pt-24 pb-16 text-center flex flex-col items-center">
        <div className="animate-float mb-10">
           <div className="glass p-8 rounded-[3rem] shadow-xl shadow-blue-500/5">
             <ChaletIcon size="w-16 h-16" />
           </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 bg-slate-200" />
            <h2 className="text-[12px] uppercase tracking-[0.5em] font-black text-blue-500/70">HomeExchange • After-Calendar</h2>
            <span className="h-[1px] w-10 bg-slate-200" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#1d1d1f] leading-none">
            January <span className="text-blue-600 font-extralight italic">2026</span>
          </h1>
          <p className="text-[#86868b] text-xl font-light max-w-2xl mx-auto pt-6 leading-relaxed">
            Un nouveau secret Notion AI chaque jour.
            <br />
            <span className="text-sm font-medium text-slate-400 mt-2 block italic">Découvrez de nouveaux animaux chaque semaine à votre fenêtre.</span>
          </p>
        </div>
      </header>

      {/* Calendar Grid Container */}
      <main className="relative z-10 w-full max-w-7xl px-8 lg:px-16">
        {/* Strict 7-column header */}
        <div className="grid grid-cols-7 gap-6 mb-12">
          {WEEKDAYS.map(wd => (
            <div key={wd} className="text-center py-3 border-b-2 border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">{wd}</span>
            </div>
          ))}
        </div>

        {/* The 7-column Calendar Grid */}
        <div className="grid grid-cols-7 gap-6">
          {/* Fill empty leading days */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="aspect-square rounded-3xl bg-slate-50/5 border border-slate-50/20" />
          ))}

          {days.map((day) => {
            const available = getDayDetails(day.day);
            const quietMode = isWeekendOrHoliday(TARGET_YEAR, TARGET_MONTH, day.day);

            return (
              <div key={day.day} className="flex flex-col gap-4 group">
                {/* Day Number Label */}
                <div className="flex items-center justify-between px-3">
                  <span className={`text-[12px] font-black tracking-widest ${available ? 'text-slate-900' : 'text-slate-200'}`}>
                    {day.day.toString().padStart(2, '0')}
                  </span>
                  {available && !quietMode && !day.isUnlocked && (
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    </div>
                  )}
                </div>

                {quietMode ? (
                  <div className="hover:scale-[1.02] transition-transform duration-700">
                    <SleepingAnimal day={day.day} />
                  </div>
                ) : (
                  <ScratchReveal onReveal={() => handleReveal(day.day)} isUnlocked={available}>
                    <div className="flex flex-col items-center text-center w-full p-2">
                      <div className="w-14 h-14 mb-6 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-inner">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h4 className="text-[14px] font-bold text-[#1d1d1f] mb-3 leading-tight px-3 line-clamp-2">
                        {day.title}
                      </h4>
                      <p className="text-[9px] text-slate-400 mb-6 uppercase tracking-[0.3em] font-black">Notion AI Skill</p>
                      <button
                        onClick={() => window.open(day.notionUrl, '_blank')}
                        className="w-full py-3.5 px-4 bg-[#1d1d1f] hover:bg-black text-white text-[9px] font-black uppercase tracking-[0.25em] rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-black/5"
                      >
                        Explore
                      </button>
                    </div>
                  </ScratchReveal>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Elegant Fixed Nav */}
      <footer className="fixed bottom-12 z-50">
        <div className="glass px-10 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-12 border border-white/50">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
               <span className="text-white font-black text-xl">N</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">HomeExchange</span>
                <span className="text-base font-bold text-blue-900">After-Calendar</span>
             </div>
          </div>
          
          <div className="h-10 w-[1px] bg-slate-200" />
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group/top"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover/top:text-blue-600 transition-colors">Remonter</span>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/top:bg-blue-50 transition-all border border-slate-100">
              <svg className="w-4 h-4 text-slate-400 group-hover/top:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
