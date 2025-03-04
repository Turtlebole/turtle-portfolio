import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { skills } from '../../data/constants';
import { gsap } from 'gsap';

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
  grid-template-columns: repeat(8, 120px);
  gap: 20px;
  justify-content: center;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 120px);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 120px);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 100px);
    gap: 16px;
  }
  
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 100px);
  }
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }
`;

const SkillName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 5px;
  background: ${({ theme }) => theme.text_primary + '20'};
  border-radius: 8px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ level, animated }) => animated ? `${level}%` : '0'};
    background: ${({ theme }) => theme.primary};
    border-radius: 8px;
    transition: width 1s ease;
  }
  
  @media (max-width: 600px) {
    height: 4px;
    margin-top: 8px;
  }
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  padding: 20px 12px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid ${({ theme }) => theme.text_primary + '10'};
  opacity: 0;
  transform: translateY(20px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}10,
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.primary + '60'};
    
    &::before {
      opacity: 1;
    }
    
    ${SkillIcon} {
      transform: scale(1.15);
      filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2));
    }
    
    ${SkillName} {
      color: ${({ theme }) => theme.primary};
      transform: translateY(-2px);
    }
    
    ${SkillLevel}::after {
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.primary},
        ${({ theme }) => theme.primary}CC
      );
      animation: none;
    }
  }
  
  @media (max-width: 600px) {
    width: 100px;
    padding: 16px 10px;
  }
`;

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [animatedSkills, setAnimatedSkills] = useState({});
  const skillsRef = useRef(null);
  const cardsRef = useRef([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset refs for new tab
    cardsRef.current = [];
    
    // If this tab hasn't been animated yet, animate it
    if (!animatedSkills[tab]) {
      setTimeout(() => {
        setAnimatedSkills(prev => ({
          ...prev,
          [tab]: true
        }));
      }, 100);
    }
  };

  const filteredSkills = skills.find(skill => 
    skill.title.toLowerCase() === activeTab.toLowerCase()
  );

  useEffect(() => {
    // Animate cards when they appear
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.5,
          ease: "power3.out"
        }
      );
    }
    
    // Initialize animation for the first tab
    if (!animatedSkills[activeTab]) {
      setTimeout(() => {
        setAnimatedSkills(prev => ({
          ...prev,
          [activeTab]: true
        }));
      }, 500);
    }
  }, [activeTab, filteredSkills]);

  return (
    <Container id="skills" ref={skillsRef}>
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
          <SkillsGrid key={activeTab}>
            {filteredSkills?.skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                ref={el => cardsRef.current[index] = el}
              >
                <SkillIcon>
                  <img src={skill.image} alt={skill.name} />
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel 
                  level={skill.level || 85}
                  animated={animatedSkills[activeTab]}
                />
              </SkillCard>
            ))}
          </SkillsGrid>
        </SkillsGridContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;