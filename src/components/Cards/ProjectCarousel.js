import React, { useState, useRef, useEffect } from 'react';
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

const ProjectCarousel = ({ numberOfProjects, projects, handleProjectClick }) => {
    const [startIndex, setStartIndex] = useState(0);
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

    const handleNext = () => {
        if (numberOfProjects.length > startIndex + 3) {
            setStartIndex(startIndex + 3);
        }
    };

    const handlePrev = () => {
        setStartIndex(Math.max(startIndex - 3, 0));
    };

    return (
        <CarouselContainer ref={carouselRef}>
            {projects.slice(startIndex, startIndex + 3).map((project, index) => (
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
