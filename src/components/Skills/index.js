import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { skills } from '../../data/constants';
import ParallaxLineArt from '../ParallaxLineArt';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 80px 0;
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.text_primary} 0%,
    ${({ theme }) => theme.primary} 50%,
    ${({ theme }) => theme.text_primary} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 32px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const TabButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  background: transparent;
  color: ${({ active, theme }) => active ? theme.primary : theme.text_secondary};
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => active ? '80%' : '0'};
    height: 3px;
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    width: ${({ active }) => active ? '80%' : '40%'};
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

const SkillsGridContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  justify-content: center;
  width: 100%;
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
  }
`;

const SkillCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SkillIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const SkillName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ level }) => `${level}%`};
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.primary}CC
    );
    border-radius: 8px;
    transition: width 1s ease;
  }
`;

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const skillsRef = useRef(null);
  const [theme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? (JSON.parse(savedTheme) ? 'dark' : 'light') : 'dark';
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredSkills = skills.find(skill => 
    skill.title.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <Container id="skills" ref={skillsRef}>
      <ParallaxLineArt theme={theme} />
      <Wrapper>
        <SectionTitle>My Tech Stack</SectionTitle>
        <SectionSubtitle>
          These are the technologies I've worked with and am proficient in
        </SectionSubtitle>
        
        <TabsContainer>
          {skills.map((skill) => (
            <TabButton
              key={skill.title}
              active={activeTab === skill.title.toLowerCase()}
              onClick={() => handleTabChange(skill.title.toLowerCase())}
            >
              {skill.title}
            </TabButton>
          ))}
        </TabsContainer>
        
        <SkillsGridContainer>
          <SkillsGrid>
            {filteredSkills?.skills.map((skill) => (
              <SkillCard key={skill.name}>
                <SkillIcon>
                  <img src={skill.image} alt={skill.name} />
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel level={skill.level || 85} />
              </SkillCard>
            ))}
          </SkillsGrid>
        </SkillsGridContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
