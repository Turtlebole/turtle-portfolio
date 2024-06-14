import React, { useState, useEffect } from 'react';
import { Container, Wrapper, Title, Desc, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle';
import ProjectCarousel from '../Cards/ProjectCarousel';
import { projects } from '../../data/constants';

const Projects = ({ openModal, setOpenModal }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768); 
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNext = () => {
        setStartIndex(startIndex + (isMobileView ? 1 : 3));
    };

    const handlePrev = () => {
        setStartIndex(Math.max(startIndex - (isMobileView ? 1 : 3), 0));
    };

    return (
        <Container id="projects">
            <Wrapper>
                <Title>Projects</Title>
                <ProjectCarousel projects={projects.slice(startIndex, startIndex + (isMobileView ? 1 : 3))} setOpenModal={setOpenModal} />
                <ToggleButtonGroup>
                    <ToggleButton onClick={handlePrev} disabled={startIndex === 0}>{'<'}</ToggleButton>
                    <ToggleButton onClick={handleNext} disabled={startIndex + (isMobileView ? 1 : 3) >= projects.length}>{'>'}</ToggleButton>
                </ToggleButtonGroup>
                <Divider />
            </Wrapper>
        </Container>
    );
};

export default Projects;
