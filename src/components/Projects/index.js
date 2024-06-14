import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Wrapper, Title, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle';
import ProjectCarousel from '../Cards/ProjectCarousel';
import { projects } from '../../data/constants';

const Projects = ({ setOpenModal }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate();

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768); 
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call this function to set the initial state
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

    const handleProjectClick = (project) => {
        navigate(`/project/${project.id}`, { state: { project } });
    };

    return (
        <Container id="projects">
            <Wrapper>
                <Title>Projects</Title>
                <ProjectCarousel
                    projects={projects.slice(startIndex, startIndex + (isMobileView ? 1 : 3))}
                    handleProjectClick={handleProjectClick} // Pass the handler here
                />
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
