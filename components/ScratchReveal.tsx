
import React, { useRef, useEffect, useState } from 'react';

interface ScratchRevealProps {
  onReveal: () => void;
  isUnlocked: boolean;
  children: React.ReactNode;
}

const ScratchReveal: React.FC<ScratchRevealProps> = ({ onReveal, isUnlocked, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Premium Frosted Texture
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#f8fafc');
    grad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fine Noise
    for (let i = 0; i < 4000; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
    
    // Frost Lines
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPressed || isRevealed || !isUnlocked) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    // Check Reveal Progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 40) {
      if (pixels[i] === 0) transparent++;
    }

    if (transparent / (pixels.length / 40) > 0.4) {
      setIsRevealed(true);
      onReveal();
    }
  };

  return (
    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden glass transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
      {/* Revealed Content */}
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/40">
        <div className={`transition-all duration-1000 ${isRevealed ? 'scale-100 opacity-100' : 'scale-90 opacity-0 blur-md'}`}>
          {children}
        </div>
      </div>

      {/* Frost Layer */}
      {!isRevealed && (
        <>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-1000 ${!isUnlocked ? 'grayscale brightness-90' : 'hover:brightness-105'}`}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseMove={handleMove}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onTouchMove={handleMove}
          />
          {isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 shadow-xl border border-white">
                 Wipe to Reveal
               </span>
            </div>
          )}
        </>
      )}

      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] z-30 pointer-events-none">
          <div className="bg-white/60 p-4 rounded-2xl shadow-sm border border-white">
            <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchReveal;
