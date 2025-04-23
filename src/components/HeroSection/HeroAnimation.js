import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const AnimationContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
    transition: all 0.3s ease;
`;

// SVG container styling
const SVGContainer = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    transition: all 0.3s ease;
`;

// Animated gradient definition
const AnimatedGradient = styled.linearGradient`
    animation: moveGradient 15s ease infinite;
    transition: all 0.3s ease;
    
    @keyframes moveGradient {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

// Animated shapes with custom animations
const AnimatedCircle = styled.circle`
    opacity: ${props => props.opacity || 0.2};
    animation: float-${props => props.id} ${props => props.duration || 20}s ease-in-out infinite;
    animation-delay: ${props => props.delay || 0}s;
    transform-origin: center;
    transition: fill 0.3s ease;
    
    @keyframes float-${props => props.id} {
        0% {
            transform: translate(0, 0) scale(1);
        }
        50% {
            transform: translate(${props => props.moveX || 0}px, ${props => props.moveY || 0}px) scale(${props => props.scale || 1.2});
        }
        100% {
            transform: translate(0, 0) scale(1);
        }
    }
`;

const AnimatedPath = styled.path`
    opacity: ${props => props.opacity || 0.15};
    animation: morph-${props => props.id} ${props => props.duration || 20}s ease-in-out infinite;
    animation-delay: ${props => props.delay || 0}s;
    transform-origin: center;
    transition: fill 0.3s ease;
    
    @keyframes morph-${props => props.id} {
        0% {
            d: path("${props => props.pathStart}");
        }
        50% {
            d: path("${props => props.pathEnd}");
        }
        100% {
            d: path("${props => props.pathStart}");
        }
    }
`;

// Shape blur filter
const BlurFilter = () => (
    <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="40" />
    </filter>
);

const HeroAnimation = ({ theme, themeObject }) => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    
    // Update gradients when theme changes
    useEffect(() => {
        if (!svgRef.current) return;
        
        // Force refresh of gradients on theme change
        const gradients = svgRef.current.querySelectorAll('linearGradient');
        gradients.forEach(gradient => {
            // Trigger repaint by toggling a class
            gradient.classList.add('theme-update');
            setTimeout(() => gradient.classList.remove('theme-update'), 10);
            
            // Update stop colors
            const stops = gradient.querySelectorAll('stop');
            stops.forEach(stop => {
                // Force attribute update to ensure colors repaint
                if (stop.hasAttribute('offset')) {
                    const offset = stop.getAttribute('offset');
                    stop.setAttribute('offset', offset);
                }
            });
        });
    }, [theme, themeObject]);
    
    // Define shapes for the animation
    const shapes = [
        // Morphing blobs
        {
            type: 'path',
            id: 1,
            pathStart: "M120,100 C150,60 280,80 290,110 C300,140 250,190 210,180 C170,170 90,140 120,100",
            pathEnd: "M130,120 C180,80 270,100 280,130 C290,160 220,180 180,170 C140,160 80,160 130,120",
            fill: "url(#gradient1)",
            opacity: 0.12,
            duration: 25,
            delay: 0
        },
        {
            type: 'path',
            id: 2,
            pathStart: "M300,200 C350,150 450,180 460,260 C470,340 390,380 330,360 C270,340 250,250 300,200",
            pathEnd: "M320,220 C370,180 430,220 440,290 C450,360 370,360 310,340 C250,320 270,260 320,220",
            fill: "url(#gradient2)",
            opacity: 0.15,
            duration: 28,
            delay: 1.5
        },
        // Floating circles
        {
            type: 'circle',
            id: 3,
            cx: "65%",
            cy: "30%",
            r: 60,
            fill: "url(#gradient3)",
            opacity: 0.12,
            moveX: -50,
            moveY: 30,
            scale: 1.3,
            duration: 22,
            delay: 2
        },
        {
            type: 'circle',
            id: 4,
            cx: "20%",
            cy: "70%",
            r: 80,
            fill: "url(#gradient4)",
            opacity: 0.08,
            moveX: 60,
            moveY: -40,
            scale: 1.4,
            duration: 26,
            delay: 1
        },
        {
            type: 'circle',
            id: 5,
            cx: "75%",
            cy: "60%",
            r: 40,
            fill: "url(#gradient5)",
            opacity: 0.1,
            moveX: -30,
            moveY: -60,
            scale: 1.2,
            duration: 30,
            delay: 0.5
        }
    ];

    return (
        <AnimationContainer ref={containerRef}>
            <SVGContainer 
                ref={svgRef}
                width="100%" 
                height="100%" 
                viewBox="0 0 800 600" 
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <BlurFilter />
                    
                    {/* Dynamic gradients based on theme */}
                    <AnimatedGradient id="gradient1" gradientTransform="rotate(45)">
                        <stop offset="0%" stopColor={themeObject.primary} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={themeObject.colored_detail} stopOpacity="0.2" />
                    </AnimatedGradient>
                    
                    <AnimatedGradient id="gradient2" gradientTransform="rotate(135)">
                        <stop offset="0%" stopColor={themeObject.primary} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={themeObject.colored_detail} stopOpacity="0.1" />
                    </AnimatedGradient>
                    
                    <AnimatedGradient id="gradient3" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor={themeObject.primary} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={themeObject.text_primary} stopOpacity="0.1" />
                    </AnimatedGradient>
                    
                    <AnimatedGradient id="gradient4" gradientTransform="rotate(180)">
                        <stop offset="0%" stopColor={themeObject.colored_detail} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={themeObject.primary} stopOpacity="0.2" />
                    </AnimatedGradient>
                    
                    <AnimatedGradient id="gradient5" gradientTransform="rotate(225)">
                        <stop offset="0%" stopColor={themeObject.text_primary} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={themeObject.primary} stopOpacity="0.1" />
                    </AnimatedGradient>
                </defs>
                
                <g filter="url(#blur-filter)">
                    {shapes.map((shape) => {
                        if (shape.type === 'circle') {
                            return (
                                <AnimatedCircle
                                    key={shape.id}
                                    id={shape.id}
                                    cx={shape.cx}
                                    cy={shape.cy}
                                    r={shape.r}
                                    fill={shape.fill}
                                    opacity={shape.opacity}
                                    moveX={shape.moveX}
                                    moveY={shape.moveY}
                                    scale={shape.scale}
                                    duration={shape.duration}
                                    delay={shape.delay}
                                />
                            );
                        } else if (shape.type === 'path') {
                            return (
                                <AnimatedPath
                                    key={shape.id}
                                    id={shape.id}
                                    d={shape.pathStart}
                                    fill={shape.fill}
                                    opacity={shape.opacity}
                                    pathStart={shape.pathStart}
                                    pathEnd={shape.pathEnd}
                                    duration={shape.duration}
                                    delay={shape.delay}
                                />
                            );
                        }
                        return null;
                    })}
                </g>
            </SVGContainer>
        </AnimationContainer>
    );
};

export default HeroAnimation;
