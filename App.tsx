
import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import ScratchReveal from './components/ScratchReveal';
import SleepingAnimal from './components/SleepingAnimal';
import { DayData } from './types';
import { CALENDAR_DAYS, WEEKDAYS, TARGET_YEAR, TARGET_MONTH, isWeekendOrHoliday } from './constants';

// Resolve public assets explicitly so Vite serves them correctly
const HOME_LOGO = new URL('/logos/HomeExchange_logo.png', import.meta.url).href;
const NOTION_LOGO = new URL('/logos/Notion-logo.svg.png', import.meta.url).href;

const App: React.FC = () => {
  const [days, setDays] = useState<DayData[]>(CALENDAR_DAYS);
  // Simulation de la date au 16 Janvier 2026
  const [todayDate] = useState(16);
  const [today] = useState(new Date(2026, 0, todayDate));

  const isAvailable = (dayNum: number) => {
    return dayNum <= todayDate;
  };

  const handleReveal = (dayNum: number) => {
    setDays(prev => prev.map(d => d.day === dayNum ? { ...d, isUnlocked: true } : d));
  };

  const firstDayOfMonth = new Date(TARGET_YEAR, TARGET_MONTH, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7; 

  // Charger le mapping YAML /days.yml (public) si présent pour remplacer title/url par jour
  useEffect(() => {
    let cancelled = false;
    const parseDaysYAML = (text: string) => {
      // simple YAML-ish parser: extract top-level year/month and list of day items
      const lines = text.split(/\r?\n/).map(l => l.replace(/^\s+|\s+$/g, ''));
      let yamlYear: number | null = null;
      let yamlMonth: number | null = null;
      const items: { id?: number; title?: string; url?: string }[] = [];
      let current: { id?: number; title?: string; url?: string } | null = null;

      for (const raw of lines) {
        if (!raw) continue;
        const mYear = raw.match(/^year:\s*(\d+)/i);
        if (mYear) { yamlYear = Number(mYear[1]); continue; }
        const mMonth = raw.match(/^month:\s*(\d+)/i);
        if (mMonth) { yamlMonth = Number(mMonth[1]); continue; }

        if (raw.startsWith('-')) {
          if (current && current.id) items.push(current);
          current = {};
          const m = raw.match(/-\s*id:\s*(\d+)/);
          if (m) current.id = Number(m[1]);
        } else if (current) {
          const mId = raw.match(/^id:\s*(\d+)/);
          if (mId) { current.id = Number(mId[1]); continue; }
          const mTitle = raw.match(/^title:\s*(".*"|'.*'|.+)$/);
          if (mTitle) { current.title = mTitle[1].replace(/^['"]|['"]$/g, ''); continue; }
          const mUrl = raw.match(/^url:\s*(".*"|'.*'|.+)$/);
          if (mUrl) { current.url = mUrl[1].replace(/^['"]|['"]$/g, ''); continue; }
        }
      }
      if (current && current.id) items.push(current);
      const map: Record<number, { title?: string; url?: string }> = {};
      for (const it of items) if (it.id) map[it.id] = { title: it.title, url: it.url };
      return { year: yamlYear, month: yamlMonth, map };
    };

    fetch('/days.yml').then(res => {
      if (!res.ok) throw new Error('no yaml');
      return res.text();
    }).then(text => {
      if (cancelled) return;
      try {
        const parsed = parseDaysYAML(text);
        // YAML month is 1-based in file; TARGET_MONTH is 0-based
        if (parsed.year === TARGET_YEAR && (parsed.month === null || parsed.month - 1 === TARGET_MONTH)) {
          setDays(prev => prev.map(d => ({
            ...d,
            title: parsed.map[d.day]?.title || d.title,
            notionUrl: parsed.map[d.day]?.url || d.notionUrl
          })));
        } else {
          console.debug('days.yml year/month mismatch; not applying mapping');
        }
      } catch (e) {
        console.debug('days.yml parse failed', e);
      }
    }).catch(() => {
      // no days.yml — ignore
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center pb-48">
      <Snowfall />

      {/* Hero Section */}
      <header className="relative z-10 w-full max-w-6xl px-8 pt-24 pb-16 text-center flex flex-col items-center">
        <div className="animate-float mb-10">
           <div className="glass p-6 rounded-[3rem] shadow-xl shadow-blue-500/5 flex items-center gap-6">
             <div className="flex items-center">
               <img
                 src={HOME_LOGO}
                 alt="HomeExchange"
                 className="h-10 w-auto object-contain"
               />
             </div>
             <div className="h-12 w-[1.5px] bg-slate-200/50" />
             <div className="flex items-center">
                <img
                  src={NOTION_LOGO}
                  alt="Notion"
                  className="w-10 h-10 object-contain"
                />
             </div>
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
            Un calendrier de l'après pour découvrir les features de Notion AI un peu tous les jours.
            <br />
            <span className="text-sm font-medium text-slate-400 mt-2 block italic">Prolongez le plaisir des fêtes en explorant de nouvelles fonctionnalités chaque jour.</span>
          </p>
        </div>
      </header>

      {/* Calendar Grid Container - Wide for full screen */}
      <main className="relative z-10 w-full max-w-[1440px] px-8 lg:px-16">
        <div className="grid grid-cols-7 gap-6 mb-12">
          {WEEKDAYS.map(wd => (
            <div key={wd} className="text-center py-3 border-b-2 border-slate-50">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">{wd}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-6">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="aspect-square rounded-3xl bg-slate-50/5 border border-slate-50/20" />
          ))}

          {days.map((day) => {
            const available = isAvailable(day.day);
            const quietMode = isWeekendOrHoliday(TARGET_YEAR, TARGET_MONTH, day.day);
            const isToday = day.day === todayDate;
            
            // Calculer la semaine pour déterminer si c'est la nuit
            const calendarRow = Math.floor((startOffset + day.day - 1) / 7);
            const week = calendarRow + 1;
            const isNight = week === 1 || week === 5;
            const textColor = isNight ? 'text-white' : 'text-[#1d1d1f]';

            return (
              <div key={day.day} className="flex flex-col gap-4 group">
                <div className="flex items-center justify-between px-3">
                  <span className={`text-[12px] font-black tracking-widest ${available ? 'text-slate-900' : 'text-slate-200'}`}>
                    {day.day.toString().padStart(2, '0')}
                  </span>
                </div>

                {quietMode ? (
                  <div className="hover:scale-[1.02] transition-transform duration-700">
                    <SleepingAnimal day={day.day} />
                  </div>
                ) : (
                  <ScratchReveal 
                    onReveal={() => handleReveal(day.day)} 
                    isUnlocked={available}
                    isOpened={day.isUnlocked}
                    isToday={isToday}
                    day={day.day}
                    startOffset={startOffset}
                  >
                    <div className="flex flex-col items-center text-center w-full">
                      <h4 className={`text-[14px] font-bold ${textColor} mb-2 leading-tight px-1 line-clamp-3 min-h-[3rem] flex items-center justify-center`}>
                        {day.title}
                      </h4>
                      {/* (no music icon) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Ouvrir une URL spécifique au jour de la semaine si nécessaire
                          window.open(day.notionUrl, '_blank');
                        }}
                        className={`w-auto px-4 py-2 ${isNight ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30' : 'bg-[#1d1d1f] hover:bg-black text-white'} text-[9px] font-black uppercase tracking-[0.2em] rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-black/5 mt-1`}
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

      {/* Footer removed as requested */}
    </div>
  );
};

export default App;
