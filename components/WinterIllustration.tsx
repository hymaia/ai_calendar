
import React from 'react';

const WinterIllustration: React.FC<{ day: number }> = ({ day }) => {
  const week = Math.ceil(day / 7);
  
  const skyGradients = {
    night: "url(#nightSky)",
    dawn: "url(#dawnSky)",
    midday: "url(#middaySky)",
    sunset: "url(#sunsetSky)",
    daylight: "url(#daySky)"
  };

  const currentSky = 
    (week === 1 || week === 5) ? skyGradients.night : 
    week === 2 ? skyGradients.dawn : 
    week === 3 ? skyGradients.midday : 
    week === 4 ? skyGradients.sunset : skyGradients.daylight;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#fafaf8] overflow-hidden">
      {/* Texture papier grainée */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <svg viewBox="0 0 200 240" className="w-full h-full max-w-[180px] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1c2c" />
            <stop offset="100%" stopColor="#3b5e8c" />
          </linearGradient>
          
          <linearGradient id="dawnSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff9a9e" />
            <stop offset="100%" stopColor="#fecfef" />
          </linearGradient>

          <linearGradient id="middaySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a90e2" />
            <stop offset="100%" stopColor="#87ceeb" />
          </linearGradient>

          {/* Coucher de soleil multicouche et doux */}
          <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a1c4fd" />
            <stop offset="20%" stopColor="#dcd6f7" />
            <stop offset="45%" stopColor="#ffb7b7" />
            <stop offset="75%" stopColor="#ffcc33" />
            <stop offset="100%" stopColor="#f48fb1" />
          </linearGradient>

          <linearGradient id="daySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a1c4fd" />
            <stop offset="100%" stopColor="#c2e9fb" />
          </linearGradient>
          
          <filter id="watercolor">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>

          <filter id="birdGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="white" floodOpacity="0.6" />
          </filter>

          <filter id="steamBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <filter id="noseGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ciel en arrière-plan (Fenêtre) */}
        <path d="M45 165 L45 70 Q45 30 100 30 Q155 30 155 70 L155 165 Z" fill={currentSky} filter="url(#watercolor)" />
        
        {/* Détails célestes décoratifs (Nuit) */}
        {(week === 1 || week === 5) && (
          <g opacity="0.5">
            <circle cx="75" cy="55" r="1" fill="white" />
            <circle cx="125" cy="45" r="1.5" fill="white" />
            <circle cx="100" cy="40" r="0.8" fill="white" />
            <circle cx="140" cy="80" r="1" fill="white" />
          </g>
        )}

        {/* Cadre de fenêtre physique */}
        <path d="M45 165 L45 70 Q45 30 100 30 Q155 30 155 70 L155 165" stroke="#f2f2f2" strokeWidth="6" fill="none" />
        <line x1="100" y1="30" x2="100" y2="165" stroke="#f2f2f2" strokeWidth="4" />
        <line x1="45" y1="105" x2="155" y2="105" stroke="#f2f2f2" strokeWidth="4" />
        
        {/* Rebord de la fenêtre */}
        <rect x="30" y="165" width="140" height="8" fill="#ffffff" rx="2" />

        {/* SEMAINE 1 : LE CHAT */}
        {week === 1 && (
          <g transform="translate(0, 5)">
            <g className="animate-[steam_3s_infinite]" opacity="0.6" filter="url(#steamBlur)">
               <path d="M162 135 Q165 120 160 110" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
               <path d="M172 135 Q168 120 174 110" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
            <g className="animate-[breathe_5s_ease-in-out_infinite]">
              <ellipse cx="100" cy="168" rx="40" ry="4" fill="#000" opacity="0.05" />
              <path d="M60 160 Q55 185 65 210" stroke="#9b8375" strokeWidth="8" strokeLinecap="round" fill="none" className="animate-[sleepingTail_4s_infinite]" />
              <path d="M55 165 Q55 125 105 125 Q145 125 150 150 Q150 165 115 165 L65 165 Z" fill="#9b8375" />
              <circle cx="130" cy="152" r="16" fill="#9b8375" />
              <path d="M115 145 L110 135 L125 140 Z" fill="#9b8375" />
              <path d="M140 145 L145 135 L130 140 Z" fill="#9b8375" />
              <g stroke="#3e2b20" strokeWidth="1" fill="none" opacity="0.6">
                <path d="M124 154 Q128 157 132 154" />
                <path d="M136 154 Q140 157 144 154" />
              </g>
            </g>
          </g>
        )}

        {/* SEMAINE 2 : LE CHIEN */}
        {week === 2 && (
          <g>
            <path d="M60 210 Q60 175 100 175 Q140 175 140 210 L140 230 Q100 240 60 230 Z" fill="#d35400" opacity="0.9" />
            <g transform="translate(0, 5)">
              <path d="M75 190 Q75 140 100 140 Q125 140 125 190 Q125 210 100 210 Q75 210 75 190" fill="#f8f8f2" />
              <ellipse cx="105" cy="195" rx="12" ry="8" fill="#333" opacity="0.8" />
              <path d="M85 145 Q85 125 100 125 Q115 125 115 145 Z" fill="#f8f8f2" />
              <path d="M100 210 Q100 225 105 220" stroke="#f8f8f2" strokeWidth="6" strokeLinecap="round" fill="none" className="animate-[wag_2s_ease-in-out_infinite]" />
            </g>
          </g>
        )}

        {/* SEMAINE 3 : LE LAPIN */}
        {week === 3 && (
          <g transform="translate(10, 0)">
            <path d="M60 215 Q60 190 80 190 Q100 190 100 215 Q100 225 80 225 Q60 225 60 215" fill="#c4a484" />
            <circle cx="62" cy="218" r="5" fill="#fff" className="animate-[tailFlick_0.6s_infinite]" />
            <g transform="translate(95, 190)" className="animate-[munchMunch_0.25s_infinite]">
              <circle cx="0" cy="0" r="19" fill="#c4a484" />
              <circle cx="12" cy="4" r="6" fill="#ffb7b7" opacity="0.4" filter="url(#watercolor)" />
              <g className="animate-[earWiggle_1.2s_infinite]">
                <path d="M-6 -15 Q-15 -45 -3 -42 L6 -15" fill="#c4a484" />
                <path d="M6 -15 Q15 -45 24 -42 L12 -15" fill="#c4a484" />
              </g>
              <g stroke="#333" strokeWidth="1.8" fill="none" strokeLinecap="round">
                <path d="M8 -5 Q11 -9 14 -5" />
                <path d="M1 -5 Q4 -9 7 -5" />
              </g>
              <g transform="translate(14, 12) rotate(-8)">
                <path d="M0 0 L30 6 L0 14 Z" fill="#e67e22" />
                <path d="M-2 2 L-18 -2 M-2 7 L-18 7 M-2 12 L-18 16" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          </g>
        )}

        {/* SEMAINE 4 : LE CACATOÈS */}
        {week === 4 && (
          <g transform="translate(100, 30)" className="animate-[parrotSwing_3.5s_ease-in-out_infinite]" filter="url(#birdGlow)">
            <g stroke="#8d6e63" strokeWidth="1.2" opacity="0.4">
              <line x1="-25" y1="0" x2="-20" y2="120" />
              <line x1="25" y1="0" x2="20" y2="120" />
            </g>
            <rect x="-26" y="120" width="52" height="5" fill="#5d4037" rx="2" />
            <g transform="translate(0, 120)">
               <g stroke="#7f8c8d" strokeWidth="2.5" strokeLinecap="round">
                 <line x1="-5" y1="0" x2="-3" y2="-8" />
                 <line x1="5" y1="0" x2="3" y2="-8" />
               </g>
               <path d="M0 0 L-8 35 L8 35 Z" fill="#ffffff" />
               <path d="M0 5 L-5 30 L5 30 Z" fill="#fff9c4" opacity="0.6" />
               <ellipse cx="0" cy="-25" rx="14" ry="24" fill="#ffffff" />
               <path d="M-13 -35 Q-18 -25 -13 -10 Q-8 -25 -13 -35" fill="#f5f5f5" />
               <path d="M13 -35 Q18 -25 13 -10 Q8 -25 13 -35" fill="#f5f5f5" />
               <g transform="translate(0, -45)">
                 <g className="animate-[earWiggle_2s_infinite]">
                   <path d="M-2 -10 Q-10 -30 2 -28 Q-2 -22 2 -10" fill="#fdd835" />
                   <path d="M2 -10 Q10 -35 15 -25 Q8 -20 2 -10" fill="#fdd835" />
                   <path d="M5 -5 Q15 -20 18 -10 Q10 -10 5 -5" fill="#fdd835" />
                 </g>
                 <circle cx="0" cy="0" r="15" fill="#ffffff" />
                 <circle cx="6" cy="-2" r="2.5" fill="#2c3e50" />
                 <circle cx="7" cy="-3" r="0.8" fill="#ffffff" />
                 <path d="M10 2 Q22 2 15 12 Q10 14 10 5 Z" fill="#34495e" />
                 <circle cx="6" cy="6" r="3" fill="#ffcdd2" opacity="0.3" filter="url(#watercolor)" />
               </g>
            </g>
          </g>
        )}

        {/* SEMAINE 5 : LE RENNE AU NEZ ROUGE */}
        {week >= 5 && (
          <g transform="translate(100, 165)">
            <g className="animate-[breathe_6s_infinite]">
              {/* Corps */}
              <path d="M-35 0 Q-35 -40 0 -40 Q35 -40 35 0 Z" fill="#8d6e63" />
              
              {/* Tête */}
              <g transform="translate(0, -35)">
                {/* Bois */}
                <g stroke="#5d4037" strokeWidth="3" strokeLinecap="round" fill="none">
                  <path d="M-8 -15 Q-15 -35 -25 -30 M-12 -25 Q-20 -35 -15 -45" />
                  <path d="M8 -15 Q15 -35 25 -30 M12 -25 Q20 -35 15 -45" />
                </g>
                
                <ellipse cx="0" cy="0" rx="22" ry="25" fill="#8d6e63" />
                <ellipse cx="0" cy="8" rx="16" ry="12" fill="#a1887f" opacity="0.6" />
                
                {/* Yeux */}
                <circle cx="-7" cy="-4" r="2" fill="#2c3e50" />
                <circle cx="7" cy="-4" r="2" fill="#2c3e50" />
                
                {/* NEZ ROUGE CLIGNOTANT */}
                <g className="animate-[noseBlink_2s_infinite]" filter="url(#noseGlow)">
                  <circle cx="0" cy="10" r="6" fill="#e53935" />
                  <circle cx="2" cy="8" r="1.5" fill="white" opacity="0.6" />
                </g>
              </g>
            </g>
          </g>
        )}

        {/* Tasse (S1 & S2 uniquement) */}
        {week <= 2 && (
          <g transform="translate(155, 155) scale(0.65)">
             <path d="M0 0 H18 Q22 0 22 4 V18 Q22 22 18 22 H0 V0" fill={week === 1 ? "#ae2b20" : "#2980b9"} />
             <path d="M22 5 Q30 5 30 11 Q30 17 22 17" stroke={week === 1 ? "#ae2b20" : "#2980b9"} strokeWidth="3" fill="none" />
          </g>
        )}
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes steam {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.8; transform: translateY(-12px) scale(1.1); }
          100% { transform: translateY(-28px) scale(1.4); opacity: 0; }
        }
        @keyframes sleepingTail {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes munchMunch {
          0%, 100% { transform: translate(95px, 190px) rotate(0deg); }
          50% { transform: translate(95px, 192px) rotate(-1deg); }
        }
        @keyframes earWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes tailFlick {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2) translateX(-1px); }
        }
        @keyframes wag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes parrotSwing {
          0%, 100% { transform: translate(100px, 30px) rotate(-10deg); }
          50% { transform: translate(100px, 30px) rotate(10deg); }
        }
        @keyframes noseBlink {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px red); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 10px red); }
        }
      `}} />
    </div>
  );
};

export default WinterIllustration;
