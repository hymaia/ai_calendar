
import React, { useEffect, useState, useRef } from 'react';
import { SnowParticle } from '../types';

const Snowfall: React.FC = () => {
  const [particles, setParticles] = useState<SnowParticle[]>([]);
  // Fix: Added undefined as an initial value to satisfy TypeScript's requirement for 1 argument when using useRef with a generic type.
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const initialParticles: SnowParticle[] = Array.from({ length: 140 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.25 + 0.12,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(initialParticles);

    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        x: (p.x + Math.sin(p.y * 0.05) * 0.02) % 100
      })));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bg-white rounded-full transition-opacity duration-1000"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: p.size > 3 ? 'blur(1px)' : 'none',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)'
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
