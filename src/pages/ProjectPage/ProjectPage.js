import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGithub, FaCalendar, FaCode, FaTools, FaArrowLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
    PageContainer,
    InnerContainer,
    LeftContainer,
    RightContainer,
    ImageContainer,
    StyledSwiper,
    ProjectImage,
    ProjectHeader,
    ProjectTitle,
    ProjectSubtitle,
    Divider,
    InfoSection,
    InfoItem,
    InfoLabel,
    InfoValue,
    Description,
    Tags,
    Tag,
    Links,
    GitHubLink,
    BackButton,
    FloatingElement
} from './ProjectStyle';

const ProjectPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const project = state?.project;

    if (!project) {
        return (
            <PageContainer>
                <FloatingElement size="140px" blur="30px" opacity="0.3" top="15%" left="5%" bg="rgba(71, 7, 234, 0.2)" />
                <FloatingElement size="160px" blur="25px" opacity="0.2" bottom="10%" right="8%" bg="rgba(71, 7, 234, 0.15)" />
                
                <InnerContainer>
                    <div style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 2 }}>
                        <h2>No project data available.</h2>
                        <BackButton onClick={() => navigate('/')}>
                            <FaArrowLeft /> Back to Home
                        </BackButton>
                    </div>
                </InnerContainer>
            </PageContainer>
        );
    }

    const handleBack = () => {
        navigate('/');
    };

    return (
        <PageContainer>
            <FloatingElement size="140px" blur="30px" opacity="0.3" top="15%" left="5%" bg="rgba(71, 7, 234, 0.2)" />
            <FloatingElement size="160px" blur="25px" opacity="0.2" bottom="10%" right="8%" bg="rgba(71, 7, 234, 0.15)" />
            <FloatingElement size="90px" blur="15px" opacity="0.2" top="30%" right="20%" bg="rgba(71, 7, 234, 0.1)" />
            
            <BackButton onClick={handleBack}>
                <FaArrowLeft /> Back
            </BackButton>
            
            <InnerContainer>
                <LeftContainer>
                    <ProjectHeader>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectSubtitle>{project.category || 'Full Stack Development Project'}</ProjectSubtitle>
                    </ProjectHeader>

                    <InfoSection>
                        <InfoItem>
                            <InfoLabel>
                                <FaCalendar />
                                Timeline
                            </InfoLabel>
                            <InfoValue>{project.date || '2024'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>
                                <FaCode />
                                Type
                            </InfoLabel>
                            <InfoValue>{project.type || 'Web Application'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>
                                <FaTools />
                                Role
                            </InfoLabel>
                            <InfoValue>{project.role || 'Full Stack Developer'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Status</InfoLabel>
                            <InfoValue>{project.status || 'Completed'}</InfoValue>
                        </InfoItem>
                    </InfoSection>

                    <Divider />

                    <Description>{project.description}</Description>

                    <Tags>
                        {project.tags?.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </Tags>

                    <Links>
                        {project.github && (
                            <GitHubLink 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <FaGithub /> View Source Code
                            </GitHubLink>
                        )}
                        {project.webapp && (
                            <GitHubLink 
                                href={project.webapp} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                primary
                            >
                                <FaCode /> Live Demo
                            </GitHubLink>
                        )}
                    </Links>
                </LeftContainer>

                <RightContainer>
                    <ImageContainer>
                        <StyledSwiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            loop={project.images?.length > 1}
                        >
                            {project.images?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <ProjectImage src={image} alt={`${project.title} ${index + 1}`} loading="lazy" />
                                </SwiperSlide>
                            ))}
                            {(!project.images || project.images.length === 0) && (
                                <SwiperSlide>
                                    <ProjectImage src="https://i.imgur.com/um67xkT.png" alt="Default Project Image" loading="lazy" />
                                </SwiperSlide>
                            )}
                        </StyledSwiper>
                    </ImageContainer>
                </RightContainer>
            </InnerContainer>
        </PageContainer>
    );
};

export default ProjectPage;
