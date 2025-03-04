import React, { useRef, useEffect } from 'react';

const LightweightParticles = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        
        // Configuration
        const config = {
            particleCount: 80,
            particleColor: theme === 'light' ? '0, 0, 0' : '255, 255, 255',
            primaryColor: theme === 'light' ? '212, 182, 117' : '212, 182, 117', // Gold color (D4B675)
            lineColor: theme === 'light' ? '0, 0, 0' : '255, 255, 255',
            particleRadius: 1.5,
            lineWidth: 0.8,
            lineDistance: 200,
            mouseDistance: 150,
            particleSpeed: 0.5,
            mouseRadius: 120,
            maxConnections: 5,
            baseOpacity: 0.5
        };

        // Handle window resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = Math.random() * config.particleSpeed - config.particleSpeed/2;
                this.vy = Math.random() * config.particleSpeed - config.particleSpeed/2;
                this.radius = config.particleRadius;
                this.connections = 0;
                this.color = Math.random() > 0.85 ? config.primaryColor : config.particleColor;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }

            update() {
                this.connections = 0;
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            particles.forEach(particle => particle.connections = 0);

            for (let i = 0; i < particles.length; i++) {
                const distances = [];
                
                for (let j = 0; j < particles.length; j++) {
                    if (i !== j) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < config.lineDistance) {
                            distances.push({
                                particleIndex: j,
                                distance: distance
                            });
                        }
                    }
                }

                distances.sort((a, b) => a.distance - b.distance);
                
                distances.slice(0, config.maxConnections).forEach(({ particleIndex, distance }) => {
                    const particle2 = particles[particleIndex];
                    
                    if (particles[i].connections < config.maxConnections && 
                        particle2.connections < config.maxConnections) {
                        
                        const opacity = (1 - (distance / config.lineDistance)) * config.baseOpacity;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${config.lineColor}, ${opacity})`;
                        ctx.lineWidth = config.lineWidth;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particle2.x, particle2.y);
                        ctx.stroke();

                        particles[i].connections++;
                        particle2.connections++;
                    }
                });
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseRadius) {
                    const force = (config.mouseRadius - distance) / config.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 3;
                    particle.y -= Math.sin(angle) * force * 3;
                }
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        init();
        animate();

        window.addEventListener('resize', () => {
            resize();
            init();
        });
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
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
                opacity: 0.7,
                pointerEvents: 'none'
            }}
        />
    );
};

export default LightweightParticles;
