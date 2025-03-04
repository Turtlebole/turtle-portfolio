import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HeroAnimation = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Safety check
        
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        // Configuration
        const config = {
            // Enhanced color palette for light theme
            baseColor: theme === 'light' ? '70, 80, 100' : '220, 220, 220', // Soft blue-gray for light theme
            accentColor: theme === 'light' ? '212, 182, 117' : '212, 182, 117', // Gold color (D4B675)
            secondaryColor: theme === 'light' ? '120, 140, 180' : '180, 180, 200', // Soft periwinkle for light theme
            tertiaryColor: theme === 'light' ? '90, 110, 140' : '150, 150, 170', // Deeper blue-gray for light theme
            
            waveCount: 5,
            waveAmplitude: 35,
            waveFrequency: 0.008,
            opacity: theme === 'light' ? 0.6 : 0.7, // Slightly reduced opacity for light theme
            scrollSpeed: 0.5,
            parallaxFactor: 0.4,
            verticalOffset: 0.08
        };

        // Handle window resize
        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        // Wave class
        class Wave {
            constructor(index, total) {
                this.index = index;
                this.total = total;
                
                // Enhanced color selection for more visual interest
                if (index % 3 === 0) {
                    this.color = config.baseColor;
                } else if (index % 3 === 1) {
                    this.color = config.accentColor;
                } else {
                    this.color = index % 2 === 0 ? config.secondaryColor : config.tertiaryColor;
                }
                
                this.points = [];
                
                // Parallax factors - waves in front are more opaque and move faster
                const depthFactor = index / total;
                
                // Adjusted opacity for light theme
                this.opacity = theme === 'light' 
                    ? 0.08 + (1 - depthFactor) * 0.35 // Lower base opacity for light theme
                    : 0.1 + (1 - depthFactor) * 0.4;
                
                // Amplitude varies with depth - front waves have larger amplitude
                this.amplitude = config.waveAmplitude * (0.6 + (1 - depthFactor) * 0.7);
                
                this.scrollOffset = 0;
                
                // Parallax effect - front waves move faster than back waves
                this.speed = config.scrollSpeed * (0.6 + (1 - depthFactor) * 0.8);
                
                // Vertical position - create overlapping effect with parallax
                this.verticalPosition = 0.5 + (index - total / 2) * config.verticalOffset;
                
                // Phase offset for varied wave patterns
                this.phaseOffset = index * Math.PI * 0.5;
                
                // GSAP animation for the amplitude
                this.amplitudeVariation = { value: 0.9 + Math.random() * 0.2 };
                gsap.to(this.amplitudeVariation, {
                    value: 1.1 + Math.random() * 0.3,
                    duration: 2 + index * 0.7 + Math.random() * 2,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true
                });
                
                // GSAP animation for vertical position to create subtle floating effect
                this.verticalShift = { value: 0 };
                gsap.to(this.verticalShift, {
                    value: 10 * (1 - depthFactor),
                    duration: 4 + Math.random() * 3,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.2
                });
            }
            
            generatePoints(width, height) {
                this.points = [];
                // Create more points than needed to allow for scrolling
                const segments = Math.ceil(width / 5) * 2; 
                const totalWidth = width * 2; // Double the width for seamless scrolling
                
                for (let i = 0; i <= segments; i++) {
                    const x = (i / segments) * totalWidth - width / 2; // Start before viewport
                    this.points.push({
                        x: x,
                        y: height * this.verticalPosition,
                        originalX: x, // Store original x position
                        originalY: height * this.verticalPosition
                    });
                }
            }
            
            update(width, height, deltaTime) {
                // Update scroll offset
                this.scrollOffset += this.speed * deltaTime;
                
                // Reset scroll when we've moved one full width
                if (this.scrollOffset > width) {
                    this.scrollOffset = 0;
                }
                
                // Calculate center Y with vertical shift for floating effect
                const centerY = height * this.verticalPosition + this.verticalShift.value;
                
                this.points.forEach((point, i) => {
                    // Apply scrolling
                    point.x = point.originalX - this.scrollOffset;
                    
                    // Wrap points that go off-screen left back to the right
                    if (point.x < -width / 2) {
                        point.x += width * 2;
                    }
                    
                    // Calculate wave height with phase offset for varied patterns
                    const normalizedX = point.x * config.waveFrequency;
                    
                    // Primary wave
                    let y = Math.sin(normalizedX + this.phaseOffset) * 
                            this.amplitude * this.amplitudeVariation.value;
                    
                    // Secondary wave with different frequency
                    y += Math.sin(normalizedX * 1.5 + this.phaseOffset * 0.8) * 
                         (this.amplitude * 0.4);
                    
                    // Third wave component for more complexity
                    y += Math.sin(normalizedX * 0.6 - this.phaseOffset * 0.3) * 
                         (this.amplitude * 0.3);
                    
                    point.y = centerY + y;
                });
            }
            
            draw(ctx, width, height) {
                // Only draw points that are within or near the viewport
                const visiblePoints = this.points.filter(point => 
                    point.x >= -100 && point.x <= width + 100
                );
                
                if (visiblePoints.length < 2) return;
                
                ctx.beginPath();
                
                // Start from bottom left
                ctx.moveTo(0, height);
                
                // Draw to first point
                ctx.lineTo(visiblePoints[0].x, visiblePoints[0].y);
                
                // Draw curve through all points
                for (let i = 0; i < visiblePoints.length - 1; i++) {
                    const currentPoint = visiblePoints[i];
                    const nextPoint = visiblePoints[i + 1];
                    
                    // Calculate control points for smooth curve
                    const controlX = (currentPoint.x + nextPoint.x) / 2;
                    const controlY = (currentPoint.y + nextPoint.y) / 2;
                    
                    ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, controlX, controlY);
                }
                
                // Draw to last point
                const lastPoint = visiblePoints[visiblePoints.length - 1];
                ctx.lineTo(lastPoint.x, lastPoint.y);
                
                // Complete the shape
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                
                // Enhanced gradient with more color stops for better blending
                const gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
                
                if (theme === 'light') {
                    // More subtle gradient for light theme
                    gradient.addColorStop(0, `rgba(${this.color}, 0)`);
                    gradient.addColorStop(0.3, `rgba(${this.color}, ${this.opacity * 0.5})`);
                    gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
                    gradient.addColorStop(0.7, `rgba(${this.color}, ${this.opacity * 0.5})`);
                    gradient.addColorStop(1, `rgba(${this.color}, 0)`);
                } else {
                    // Original gradient for dark theme
                    gradient.addColorStop(0, `rgba(${this.color}, 0)`);
                    gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
                    gradient.addColorStop(1, `rgba(${this.color}, 0)`);
                }
                
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
        
        let waves = [];
        let lastTime = 0;
        
        const init = () => {
            // Clear any existing GSAP animations
            gsap.killTweensOf("*");
            
            waves = [];
            for (let i = 0; i < config.waveCount; i++) {
                const wave = new Wave(i, config.waveCount);
                wave.generatePoints(canvas.width, canvas.height);
                waves.push(wave);
            }
            
            lastTime = performance.now();
        };

        const animate = (currentTime) => {
            const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
            lastTime = currentTime;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw waves from back to front for proper layering
            for (let i = waves.length - 1; i >= 0; i--) {
                waves[i].update(canvas.width, canvas.height, deltaTime);
                waves[i].draw(ctx, canvas.width, canvas.height);
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        init();
        animationFrameId = requestAnimationFrame(animate);

        window.addEventListener('resize', () => {
            resize();
            init();
        });

        // Clean up function to ensure proper cleanup
        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            gsap.killTweensOf("*"); // Clean up GSAP animations
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: theme === 'light' ? 0.7 : 0.8,
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'all 0.3s ease'
            }}
            aria-hidden="true"
        />
    );
};

export default HeroAnimation;
