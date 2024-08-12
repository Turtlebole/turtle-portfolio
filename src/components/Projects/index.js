import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Wrapper, Title, CarouselWrapper, ToggleButtonGroup, ToggleButton, Divider, LeftArrowSVG, RightArrowSVG, LeftArrowPath, RightArrowPath } from './ProjectsStyle';
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
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNext = () => {
        if(projects.length > startIndex + (isMobileView ? 1 : 3)) {
            setStartIndex(startIndex + (isMobileView ? 1 : 3));
        } else {
            setStartIndex(0);
        }
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
                <CarouselWrapper>
                    <ProjectCarousel
                        numberOfProjects={projects}
                        projects={projects.slice(startIndex, startIndex + (isMobileView ? 1 : 3))}
                        handleProjectClick={handleProjectClick}
                    />
                    <ToggleButtonGroup>
                        <ToggleButton onClick={handlePrev} disabled={startIndex === 0}>
                            <LeftArrowSVG>
                                <LeftArrowPath />
                            </LeftArrowSVG>
                        </ToggleButton>
                        <ToggleButton onClick={handleNext} disabled={startIndex + (isMobileView ? 1 : 3) >= projects.length}>
                            <RightArrowSVG>
                                <RightArrowPath />
                            </RightArrowSVG>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </CarouselWrapper>
                <Divider />
            </Wrapper>
        </Container>
    );
};

export default Projects;
