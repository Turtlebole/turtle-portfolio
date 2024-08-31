import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ProjectCards from './ProjectCards';

const CarouselContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
`;

const ProjectCarousel = ({ projects, handleProjectClick }) => {
    const carouselRef = useRef(null);

    useEffect(() => {
        if (carouselRef.current) {
            gsap.fromTo(
                carouselRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power2.inOut' }
            );
        }
    }, [projects]);

    return (
        <CarouselContainer ref={carouselRef}>
            {projects.slice(0, 3).map((project, index) => (
                <ProjectCards
                    key={index}
                    project={project}
                    handleProjectClick={handleProjectClick}
                />
            ))}
        </CarouselContainer>
    );
};

export default ProjectCarousel;
