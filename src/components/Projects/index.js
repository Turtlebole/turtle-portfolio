import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Wrapper, Title,
    TimelineContainer, TimelineLine, SlideContent, Pin, PinDate, CardWrapper
} from './ProjectsStyle'; 
import ProjectCards from '../Cards/ProjectCards';
import { projects } from '../../data/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ParallaxLineArt from '../ParallaxLineArt';

const Projects = () => {
    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate();
    const [theme] = useState(() => {
        // Get theme from localStorage or default to 'dark'
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? (JSON.parse(savedTheme) ? 'dark' : 'light') : 'dark';
    });

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleProjectClick = (project) => {
        navigate(`/project/${project.id}`, { state: { project } });
    };

    return (
        <Container id="projects">
            <ParallaxLineArt theme={theme} />
            <Wrapper>
                <Title>Projects</Title>
                <TimelineContainer>
                    <TimelineLine />
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={isMobileView ? 1 : 3}
                        navigation={{
                            nextEl: null,
                            prevEl: null
                        }}
                        grabCursor={true}
                        style={{ height: '600px' }}
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <SlideContent>
                                    <PinDate>{project.date}</PinDate>
                                    <Pin />
                                    <CardWrapper>
                                        <ProjectCards 
                                            project={project} 
                                            handleProjectClick={handleProjectClick}
                                        />
                                    </CardWrapper>
                                </SlideContent>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </TimelineContainer>
            </Wrapper>
        </Container>
    );
};

export default Projects;
