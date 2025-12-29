
import React from 'react';
import WinterIllustration from './WinterIllustration';

const SleepingAnimal: React.FC<{ day: number }> = ({ day }) => {
  return (
    <div className="w-full aspect-square rounded-[2rem] bg-white border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] transition-all duration-700">
      <div className="w-full h-full relative">
        <WinterIllustration day={day} />
      </div>
      
      {/* Label - Minimalist and light */}
      <div className="absolute bottom-5 left-0 right-0 text-center pointer-events-none">
        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.4em]">
          Weekend Calm
        </p>
      </div>
    </div>
  );
};

export default SleepingAnimal;
