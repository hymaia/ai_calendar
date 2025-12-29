
import React from 'react';
import { COLORS } from '../constants';

const ChaletIcon: React.FC<{ color?: string; size?: string }> = ({ color = COLORS.HE_BLUE, size = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15L15 45H85L50 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 45V80H75V45" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="44" y="65" width="12" height="15" stroke={color} strokeWidth="1.5" />
    <path d="M5 45L50 10L95 45" stroke={COLORS.HE_YELLOW} strokeWidth="1" strokeLinecap="round" />
    <circle cx="50" cy="30" r="2" fill={COLORS.HE_YELLOW} opacity="0.5" />
  </svg>
);

export default ChaletIcon;
