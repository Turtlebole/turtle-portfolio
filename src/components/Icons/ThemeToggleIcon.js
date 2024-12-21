import React from 'react';
import { useTheme } from 'styled-components';

const ThemeToggleIcon = () => {
  const theme = useTheme();
  
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: 'all 0.3s ease' }}
    >
      {theme.name === 'dark' ? (
        // Sun icon with rays for light mode
        <>
          <circle 
            cx="12" 
            cy="12" 
            r="5" 
            stroke={theme.primary} 
            strokeWidth="2"
            fill="none"
          />
          {/* Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="12"
              y1="12"
              x2={12 + Math.cos(angle * Math.PI / 180) * 8}
              y2={12 + Math.sin(angle * Math.PI / 180) * 8}
              stroke={theme.primary}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${angle} 12 12)`}
              style={{
                transformOrigin: 'center',
                opacity: 0.7
              }}
            />
          ))}
        </>
      ) : (
        // Crescent moon for dark mode
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          stroke={theme.primary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </svg>
  );
};

export default ThemeToggleIcon; 