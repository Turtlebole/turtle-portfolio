import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 150;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    baseSize: Math.random() * 2 + 1,
                    speedX: Math.random() * 1.5 - 0.75,
                    speedY: Math.random() * 1.5 - 0.75,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        };

        const drawParticles = (mouseX, mouseY) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particleColor = theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = particleColor;
            ctx.strokeStyle = particleColor;

            particles.forEach(particle => {
                const dx = particle.x - mouseX;
                const dy = particle.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                const scale = 1 - Math.min(distance / maxDistance, 1);
                particle.size = particle.baseSize + scale * 3;

                ctx.globalAlpha = particle.opacity;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x > canvas.width || particle.x < 0) {
                    particle.speedX *= -1;
                }
                if (particle.y > canvas.height || particle.y < 0) {
                    particle.speedY *= -1;
                }
            });

            ctx.globalAlpha = 1.0;
        };

        const animate = (mouseX, mouseY) => {
            drawParticles(mouseX, mouseY);
            requestAnimationFrame(() => animate(mouseX, mouseY));
        };

        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        createParticles();
        animate(mouseX, mouseY);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [theme]);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ParticleBackground;
