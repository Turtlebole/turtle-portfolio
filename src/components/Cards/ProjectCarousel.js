import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ProjectCards from './ProjectCards';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CarouselControls, CarouselButton, CarouselDots, CarouselDot } from '../Projects/ProjectsStyle';

const CarouselContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px 10px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    transform: translateY(20px);
    width: 100%;
    max-width: 1100px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    &.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        gap: 20px;
        padding: 15px 10px;
    }
`;

const ProjectCarousel = ({ projects, handleProjectClick }) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const maxIndex = Math.max(0, projects.length - 3);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.classList.add('loaded');
        }
    }, [projects]);

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    };

    const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

    return (
        <>
            <CarouselContainer ref={carouselRef}>
                {visibleProjects.map((project, index) => (
                    <ProjectCards
                        key={index}
                        project={project}
                        handleProjectClick={handleProjectClick}
                    />
                ))}
            </CarouselContainer>
            
            {projects.length > 3 && (
                <>
                    <CarouselControls>
                        <CarouselButton 
                            onClick={handlePrev} 
                            disabled={currentIndex === 0}
                            aria-label="Previous projects"
                        >
                            <FaChevronLeft />
                        </CarouselButton>
                        <CarouselButton 
                            onClick={handleNext} 
                            disabled={currentIndex >= maxIndex}
                            aria-label="Next projects"
                        >
                            <FaChevronRight />
                        </CarouselButton>
                    </CarouselControls>
                    
                    <CarouselDots>
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <CarouselDot 
                                key={index} 
                                active={index === currentIndex}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </CarouselDots>
                </>
            )}
        </>
    );
};

export default ProjectCarousel;
