import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaCalendar, FaCode, FaTools } from 'react-icons/fa';
import {
    PageContainer,
    InnerContainer,
    LeftContainer,
    RightContainer,
    ImageContainer,
    Img,
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
    GitHubLink
} from './ProjectStyle';

const ProjectPage = () => {
    const { state } = useLocation();
    const project = state?.project;

    if (!project) {
        return <div>No project data available.</div>;
    }

    return (
        <PageContainer>
            <InnerContainer>
                <LeftContainer>
                    <ProjectHeader>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectSubtitle>Full Stack Development Project</ProjectSubtitle>
                    </ProjectHeader>

                    <InfoSection>
                        <InfoItem>
                            <InfoLabel>
                                <FaCalendar style={{ marginRight: '8px' }} />
                                Timeline
                            </InfoLabel>
                            <InfoValue>{project.date || '2024'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>
                                <FaCode style={{ marginRight: '8px' }} />
                                Type
                            </InfoLabel>
                            <InfoValue>{project.type || 'Web Application'}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>
                                <FaTools style={{ marginRight: '8px' }} />
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
                        {project.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </Tags>

                    {project.github && (
                        <Links>
                            <GitHubLink 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <FaGithub /> View Source Code
                            </GitHubLink>
                        </Links>
                    )}
                </LeftContainer>

                <RightContainer>
                    <ImageContainer>
                        <Img src={project.image} alt={project.title} />
                    </ImageContainer>
                </RightContainer>
            </InnerContainer>
        </PageContainer>
    );
};

export default ProjectPage;
