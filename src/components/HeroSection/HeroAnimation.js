import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 100;

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
                    size: Math.random() * 2 + 0.5,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Use contrasting colors based on the theme
            const particleColor = theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = particleColor;
            ctx.strokeStyle = particleColor;
            ctx.lineWidth = 1;

            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Update particle position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Check if the particle is out of bounds and reset its position
                if (particle.x > canvas.width || particle.x < 0) {
                    particle.speedX *= -1;
                }
                if (particle.y > canvas.height || particle.y < 0) {
                    particle.speedY *= -1;
                }
            });
        };

        const animate = () => {
            drawParticles();
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        createParticles();
        animate();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [theme]); // Ensure useEffect runs when theme changes

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ParticleBackground;
