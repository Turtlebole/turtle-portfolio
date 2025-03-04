import React from 'react';
import {
    ProjectCard,
    ProjectImageContainer,
    ProjectImage,
    ProjectContent,
    ProjectTitle,
    ProjectDescription,
    Tags,
    Tag,
    ProjectMeta,
    ProjectCategory
} from '../Projects/ProjectsStyle';
import styled from 'styled-components';

const ViewOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, 
        ${({ theme }) => theme.primary}CC, 
        ${({ theme }) => theme.primary}00);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
    font-weight: 500;
    font-size: 16px;
    
    ${ProjectCard}:hover & {
        opacity: 1;
    }
`;

const ProjectCards = React.memo(({ project, handleProjectClick }) => {
    const handleClick = () => handleProjectClick(project);
    
    const mainCategory = project.category || "Project";
    
    const imageUrl = project.images && project.images.length > 0 
        ? project.images[0] 
        : 'https://i.imgur.com/um67xkT.png';

    const projectTags = project.tags || [];
    
    const displayTags = projectTags.slice(0, 4);
    const hasMoreTags = projectTags.length > 4;

    return (
        <ProjectCard onClick={handleClick}>
            <ProjectImageContainer>
                <ProjectImage src={imageUrl} alt={project.title} loading="lazy" />
            </ProjectImageContainer>
            <ProjectContent>
                <ProjectMeta>
                    <ProjectCategory>{mainCategory}</ProjectCategory>
                </ProjectMeta>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <Tags>
                    {displayTags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                    {hasMoreTags && <Tag>+{projectTags.length - 4}</Tag>}
                </Tags>
            </ProjectContent>
            <ViewOverlay>View details</ViewOverlay>
        </ProjectCard>
    );
});

export default ProjectCards;
