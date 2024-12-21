import React, { useRef, useEffect } from 'react';

const HeroAnimation = ({ theme }) => {
    const canvasRef = useRef(null);
    const particles = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const config = {
            particleCount: 100,
            particleColor: theme === 'light' ? '255, 0, 0' : '255, 0, 0', 
            lineColor: theme === 'light' ? '255, 0, 0' : '255, 0, 0',
            particleRadius: 2,
            lineWidth: 1,
            lineDistance: 150,
            mouseDistance: 200,
            particleSpeed: 1.5, 
            mouseRadius: 150,
            maxConnections: 3,
            baseOpacity: 0.6
        };

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
                this.pulse = 0;
                this.pulseSpeed = 0.05;
            }

            draw() {
                this.pulse += this.pulseSpeed;
                const pulseFactor = Math.sin(this.pulse) * 0.5 + 1;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * pulseFactor, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${config.particleColor}, ${config.baseOpacity * pulseFactor})`;
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
            particles.current = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.current.push(new Particle());
            }
        };

        const connectParticles = () => {
            particles.current.forEach(particle => particle.connections = 0);

            for (let i = 0; i < particles.current.length; i++) {
                const distances = [];
                
                for (let j = 0; j < particles.current.length; j++) {
                    if (i !== j) {
                        const dx = particles.current[i].x - particles.current[j].x;
                        const dy = particles.current[i].y - particles.current[j].y;
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
                    const particle2 = particles.current[particleIndex];
                    
                    if (particles.current[i].connections < config.maxConnections && 
                        particle2.connections < config.maxConnections) {
                        
                        const opacity = (1 - (distance / config.lineDistance)) * config.baseOpacity;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${config.lineColor}, ${opacity})`;
                        ctx.lineWidth = config.lineWidth;
                        ctx.moveTo(particles.current[i].x, particles.current[i].y);
                        ctx.lineTo(particle2.x, particle2.y);
                        ctx.stroke();

                        particles.current[i].connections++;
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

            particles.current.forEach(particle => {
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
            
            particles.current.forEach(particle => {
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
                opacity: 0.8,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at center, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0) 70%)'
            }}
        />
    );
};

export default HeroAnimation;
