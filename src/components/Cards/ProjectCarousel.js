import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectCards from './ProjectCards';

const CarouselContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
`;

const ProjectCarousel = ({ numberOfProjects,projects, handleProjectClick }) => {
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        if(numberOfProjects.length > startIndex + 3){
            console.log(numberOfProjects.length)
            setStartIndex(startIndex + 3);
        }
    };

    const handlePrev = () => {
        setStartIndex(Math.max(startIndex - 3, 0));
    };

    return (
        <CarouselContainer>
            {projects.slice(startIndex, startIndex + 3).map((project, index) => (
                <ProjectCards
                    key={index}
                    project={project}
                    handleProjectClick={handleProjectClick} // Pass the handler here
                />
            ))}
            {/*{startIndex > 0 && (*/}
            {/*    <button onClick={handlePrev}>{'<'}</button>*/}
            {/*)}*/}
            {/*{startIndex + 3 < projects.length && (*/}
            {/*    <button onClick={handleNext}>{'>'}</button>*/}
            {/*)}*/}
        </CarouselContainer>
    );
};

export default ProjectCarousel;
