import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 100;
        let animationFrameId;
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        };

        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        let resizeTimeout;

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    baseX: Math.random() * canvas.width,
                    baseY: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 1.5 - 0.75,
                    speedY: Math.random() * 1.5 - 0.75,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particleColor = theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = particleColor;

            particles.forEach(particle => {
                // Calculate distance from the mouse and move particles slightly towards the cursor
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const moveDistance = Math.max(100 - distance, 0) / 20; // Adjust movement intensity

                particle.x += dx * moveDistance * 0.01;
                particle.y += dy * moveDistance * 0.01;

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around the canvas edges
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                ctx.globalAlpha = particle.opacity;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1.0;
        };

        const animate = () => {
            drawParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        window.addEventListener('resize', debouncedResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        createParticles();
        animate();

        return () => {
            window.removeEventListener('resize', debouncedResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default ParticleBackground;
