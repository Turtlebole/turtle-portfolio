import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ParallaxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const Circle = styled.div`
  position: absolute;
  border: 1.5px solid ${props => props.color};
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  opacity: ${props => props.opacity};
  transform: translateZ(0);
  will-change: transform;
`;

const Line = styled.div`
  position: absolute;
  background-color: ${props => props.color};
  opacity: ${props => props.opacity};
  transform: translateZ(0);
  will-change: transform;
  
  ${props => props.horizontal ? `
    height: 1.5px;
    width: ${props.length}%;
    left: ${props.left}%;
    top: ${props.top}%;
  ` : `
    width: 1.5px;
    height: ${props.length}%;
    left: ${props.left}%;
    top: ${props.top}%;
  `}
`;

const ParallaxLineArt = ({ theme = 'dark', isProjectPage = false }) => {
  const elementRefs = useRef([]);
  
  // Set up parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      elementRefs.current.forEach((element, index) => {
        if (element) {
          // Different speeds for different elements
          const speed = 0.015 + (index % 5 * 0.005);
          element.style.transform = `translateY(${scrollY * speed}px)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // More visible colors for both themes
  const lineColor = theme === 'dark' 
    ? 'rgba(120, 140, 255, 0.4)' // Brighter blue for dark theme
    : 'rgba(70, 90, 220, 0.25)';  // Darker blue for light theme
  
  // Define circles with explicit sizes and positions
  const circles = isProjectPage ? [
    // More circles for project page to ensure full coverage
    { size: 800, left: 10, top: 5, opacity: theme === 'dark' ? 0.12 : 0.1 },
    { size: 700, left: 70, top: 10, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { size: 900, left: 50, top: 40, opacity: theme === 'dark' ? 0.11 : 0.09 },
    { size: 600, left: 20, top: 60, opacity: theme === 'dark' ? 0.13 : 0.11 },
    { size: 750, left: 80, top: 70, opacity: theme === 'dark' ? 0.09 : 0.07 },
    { size: 650, left: 30, top: 20, opacity: theme === 'dark' ? 0.11 : 0.09 },
    { size: 550, left: 60, top: 85, opacity: theme === 'dark' ? 0.12 : 0.1 }
  ] : [
    { size: 800, left: 10, top: 5, opacity: theme === 'dark' ? 0.12 : 0.1 },
    { size: 700, left: 70, top: 10, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { size: 900, left: 50, top: 40, opacity: theme === 'dark' ? 0.11 : 0.09 },
    { size: 600, left: 20, top: 60, opacity: theme === 'dark' ? 0.13 : 0.11 },
    { size: 750, left: 80, top: 70, opacity: theme === 'dark' ? 0.09 : 0.07 }
  ];
  
  // Define lines with explicit positions and lengths
  const lines = isProjectPage ? [
    // More lines for project page
    { horizontal: true, length: 80, left: 10, top: 30, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { horizontal: true, length: 70, left: 20, top: 50, opacity: theme === 'dark' ? 0.09 : 0.07 },
    { horizontal: true, length: 90, left: 5, top: 80, opacity: theme === 'dark' ? 0.11 : 0.09 },
    { horizontal: false, length: 70, left: 20, top: 15, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { horizontal: false, length: 80, left: 80, top: 10, opacity: theme === 'dark' ? 0.09 : 0.07 },
    { horizontal: false, length: 60, left: 40, top: 30, opacity: theme === 'dark' ? 0.11 : 0.09 },
    { horizontal: true, length: 85, left: 15, top: 65, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { horizontal: false, length: 75, left: 60, top: 25, opacity: theme === 'dark' ? 0.09 : 0.07 }
  ] : [
    { horizontal: true, length: 80, left: 10, top: 30, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { horizontal: true, length: 70, left: 20, top: 50, opacity: theme === 'dark' ? 0.09 : 0.07 },
    { horizontal: true, length: 90, left: 5, top: 80, opacity: theme === 'dark' ? 0.11 : 0.09 },
    { horizontal: false, length: 70, left: 20, top: 15, opacity: theme === 'dark' ? 0.1 : 0.08 },
    { horizontal: false, length: 80, left: 80, top: 10, opacity: theme === 'dark' ? 0.09 : 0.07 },
    { horizontal: false, length: 60, left: 40, top: 30, opacity: theme === 'dark' ? 0.11 : 0.09 }
  ];
  
  let refIndex = 0;
  
  return (
    <ParallaxContainer>
      {circles.map((circle, index) => (
        <Circle
          key={`circle-${index}`}
          ref={el => elementRefs.current[refIndex++] = el}
          color={lineColor}
          size={circle.size}
          left={circle.left}
          top={circle.top}
          opacity={circle.opacity}
        />
      ))}
      
      {lines.map((line, index) => (
        <Line
          key={`line-${index}`}
          ref={el => elementRefs.current[refIndex++] = el}
          color={lineColor}
          horizontal={line.horizontal}
          length={line.length}
          left={line.left}
          top={line.top}
          opacity={line.opacity}
        />
      ))}
    </ParallaxContainer>
  );
};

export default ParallaxLineArt; 