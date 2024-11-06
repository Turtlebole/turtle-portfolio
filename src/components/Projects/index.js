import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Wrapper, Title,
    TimelineContainer, TimelineLine, SlideContent, Pin, PinDate, CardWrapper, ProjectCard,
    Tags, Tag, ProjectContent, ProjectTitle, ProjectDescription
} from './ProjectsStyle'; 
import { projects } from '../../data/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Projects = () => {
    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container id="projects">
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
                                        <ProjectCard onClick={() => navigate(`/project/${project.id}`, { state: { project } })}>
                                            <img src={project.image} alt={project.title} />
                                            <ProjectContent>
                                                <ProjectTitle>{project.title}</ProjectTitle>
                                                <ProjectDescription>{project.description}</ProjectDescription>
                                            </ProjectContent>
                                            <Tags>
                                                {project.tags?.map((tag, idx) => (
                                                    <Tag key={idx}>{tag}</Tag>
                                                ))}
                                            </Tags>
                                        </ProjectCard>
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
