import React from 'react';
import { useTheme } from 'styled-components';

const TurtleLogo = () => {
  const theme = useTheme();
  
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shell */}
      <ellipse 
        cx="60" 
        cy="60" 
        rx="40" 
        ry="35" 
        fill={theme.primary} 
        stroke={theme.text_primary} 
        strokeWidth="3"
      />
      
      {/* Shell pattern */}
      <path 
        d="M60 30 L70 45 L85 50 L70 65 L75 80 L60 75 L45 80 L50 65 L35 50 L50 45 Z" 
        fill={theme.colored_detail} 
        stroke={theme.text_primary} 
        strokeWidth="2"
      />
      
      {/* Head */}
      <circle 
        cx="85" 
        cy="60" 
        r="12" 
        fill={theme.primary} 
        stroke={theme.text_primary} 
        strokeWidth="3"
      />
      
      {/* Eye */}
      <circle 
        cx="90" 
        cy="56" 
        r="3" 
        fill={theme.text_primary}
      />
      
      {/* Legs */}
      <path 
        d="M30 45 L20 35" 
        stroke={theme.text_primary} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M30 75 L20 85" 
        stroke={theme.text_primary} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M80 35 L90 25" 
        stroke={theme.text_primary} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path 
        d="M80 85 L90 95" 
        stroke={theme.text_primary} 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      
      {/* Tail */}
      <path 
        d="M25 60 Q15 60 10 65" 
        stroke={theme.text_primary} 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none"
      />
    </svg>
  );
};

export default TurtleLogo; 