import React from 'react'
import { PageContainer, InnerContainer, SubTitle, ImageContainer, Img, ProjectTitle, LeftContainer, RightContainer, Highlight, Tags, Tag } from './ProjectStyle'
import ProjectImg from '../../images/avatar.jpg'
import { projects } from '../../data/constants';

const ProjectPage = () => {
  return (
    <PageContainer>
           <InnerContainer >
                    <LeftContainer id="Left">
                      <ProjectTitle>About <Highlight>project</Highlight></ProjectTitle>
                      <SubTitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</SubTitle>
                      <Tags><Tag>tag</Tag><Tag>tag</Tag><Tag>tag</Tag><Tag>tag</Tag><Tag>tag</Tag><Tag>tag</Tag><Tag>tag</Tag></Tags>
                    </LeftContainer>
                    <RightContainer id="Right">
                      <ImageContainer>
                        <ProjectTitle>Project <Highlight>Name</Highlight></ProjectTitle>
                        <Img src={ProjectImg} alt="Sample" />
                      </ImageContainer>
                    </RightContainer>
                </InnerContainer>
    </PageContainer>
  );
}

export default ProjectPage
