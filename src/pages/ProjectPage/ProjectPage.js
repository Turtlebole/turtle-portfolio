import React, { useEffect } from 'react';
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
    const project = state?.project || {};

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const projectInfo = [
        { icon: <FaCalendar />, label: 'Timeline', value: project.date || '2024' },
        { icon: <FaCode />, label: 'Type', value: project.type || 'Web Application' },
        { icon: <FaTools />, label: 'Role', value: project.role || 'Full Stack Developer' },
        { icon: null, label: 'Status', value: project.status || 'Completed' }
    ];

    return (
        <PageContainer>
            {/* Decorative elements */}
            <FloatingElement size="140px" blur="30px" opacity="0.3" top="15%" left="5%" bg="rgba(71, 7, 234, 0.2)" />
            <FloatingElement size="160px" blur="25px" opacity="0.2" bottom="10%" right="8%" bg="rgba(71, 7, 234, 0.15)" />
            <FloatingElement size="90px" blur="15px" opacity="0.2" top="30%" right="20%" bg="rgba(71, 7, 234, 0.1)" />
            <FloatingElement size="180px" blur="40px" opacity="0.15" top="60%" left="15%" bg="rgba(71, 7, 234, 0.08)" />
            
            <BackButton onClick={() => navigate('/')}>
                <FaArrowLeft /> Back
            </BackButton>
            
            {!state?.project ? (
                <div style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 2 }}>
                    <h2>No project data available.</h2>
                </div>
            ) : (
                <InnerContainer>
                    <LeftContainer>
                        <ProjectHeader>
                            <ProjectTitle>{project.title}</ProjectTitle>
                            <ProjectSubtitle>{project.category || 'Full Stack Development Project'}</ProjectSubtitle>
                        </ProjectHeader>

                        <InfoSection>
                            {projectInfo.map((info, index) => (
                                <InfoItem key={index}>
                                    <InfoLabel>
                                        {info.icon}
                                        {info.label}
                                    </InfoLabel>
                                    <InfoValue>{info.value}</InfoValue>
                                </InfoItem>
                            ))}
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
                                {(project.images?.length > 0) ? 
                                    project.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <ProjectImage src={image} alt={`${project.title} ${index + 1}`} loading="lazy" />
                                        </SwiperSlide>
                                    )) : (
                                    <SwiperSlide>
                                        <ProjectImage src="https://i.imgur.com/um67xkT.png" alt="Default Project Image" loading="lazy" />
                                    </SwiperSlide>
                                )}
                            </StyledSwiper>
                        </ImageContainer>
                    </RightContainer>
                </InnerContainer>
            )}
        </PageContainer>
    );
};

export default ProjectPage;
