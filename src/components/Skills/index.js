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
  padding: 60px 0;
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.colored_detail} 50%,
    ${({ theme }) => theme.primary} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientText 6s ease infinite;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 35px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 30px;
    padding: 0 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 25px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    margin-bottom: 25px;
  }
  
  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

const TabButton = styled.button`
  padding: 8px 18px;
  margin: 0 6px 10px;
  font-size: 15px;
  font-weight: 600;
  background: ${({ active, theme }) => active ? `linear-gradient(135deg, ${theme.primary}20, ${theme.colored_detail}30)` : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colored_detail : theme.text_secondary};
  border: 2px solid ${({ active, theme }) => active ? theme.colored_detail : 'transparent'};
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) => active ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    background: ${({ theme, active }) => active ? `linear-gradient(135deg, ${theme.primary}30, ${theme.colored_detail}40)` : `${theme.text_primary}10`};
    color: ${({ theme, active }) => active ? theme.colored_detail : theme.text_primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 7px 16px;
    font-size: 14px;
    margin: 0 4px 8px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 14px;
    font-size: 13px;
    margin: 0 3px 8px;
  }
`;

const SkillsGridContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 1000px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 18px;
  justify-content: center;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px;
  }
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.primary}10, ${theme.colored_detail}15)`};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  
  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }
`;

const SkillName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 12px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid ${({ theme }) => theme.text_primary + '15'};
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
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colored_detail + '60'};
    
    &::before {
      opacity: 1;
    }
    
    ${SkillIcon} {
      transform: scale(1.12);
      background: ${({ theme }) => `linear-gradient(135deg, ${theme.primary}20, ${theme.colored_detail}30)`};
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
      
      img {
        transform: scale(1.12);
      }
    }
    
    ${SkillName} {
      color: ${({ theme }) => theme.colored_detail};
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 768px) {
    padding: 16px 10px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 8px;
  }
`;

// Decorative background elements
const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 10% 20%, ${({ theme }) => theme.primary}05 0%, transparent 20%),
    radial-gradient(circle at 85% 60%, ${({ theme }) => theme.colored_detail}05 0%, transparent 30%);
  z-index: 0;
  pointer-events: none;
`;

// Floating design elements
const FloatingElement = styled.div`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: 50%;
  background: ${props => props.bg || 'rgba(255, 255, 255, 0.03)'};
  filter: blur(${props => props.blur || '15px'});
  opacity: ${props => props.opacity || '0.5'};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  z-index: 0;
  pointer-events: none;
`;

// Empty state when no skills are available
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  
  p {
    font-size: 15px;
    color: ${({ theme }) => theme.text_secondary};
    margin: 12px 0;
  }
`;

// Category counter showing how many skills are in each category
const CategoryCounter = styled.span`
  background: ${({ theme }) => theme.text_primary}20;
  color: ${({ theme }) => theme.text_primary};
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 6px;
  
  @media (max-width: 480px) {
    font-size: 11px;
    padding: 2px 6px;
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
          y: 25,
          rotationX: 8,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          scale: 1,
          stagger: 0.06, 
          duration: 0.6,
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
    
    // Responsive handling - if there's a horizontal scroll, adjust the grid
    const handleResize = () => {
      const gridContainer = document.querySelector('.skills-grid');
      if (gridContainer && gridContainer.scrollWidth > gridContainer.clientWidth) {
        // Adjust columns if needed for very small screens
        if (window.innerWidth < 360) {
          gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(70px, 1fr))';
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, filteredSkills]);

  return (
    <Container id="skills" ref={skillsRef}>
      <BackgroundDecoration />
      
      {/* Decorative floating elements */}
      <FloatingElement size="120px" blur="25px" opacity="0.3" top="15%" left="5%" bg={`${({ theme }) => theme.primary}15`} />
      <FloatingElement size="150px" blur="20px" opacity="0.2" bottom="20%" right="8%" bg={`${({ theme }) => theme.colored_detail}15`} />
      <FloatingElement size="80px" blur="15px" opacity="0.2" top="40%" right="20%" bg={`${({ theme }) => theme.primary}10`} />
      
      <Wrapper>
        <SectionTitle>My Tech Stack</SectionTitle>
        <SectionSubtitle>
          These are the technologies I've worked with and am proficient in.
        </SectionSubtitle>
        
        <TabsContainer>
          {skills.map((skill) => (
            <TabButton
              key={skill.title}
              active={activeTab === skill.title.toLowerCase()}
              onClick={() => handleTabChange(skill.title.toLowerCase())}
            >
              {skill.title}
              <CategoryCounter>{skill.skills.length}</CategoryCounter>
            </TabButton>
          ))}
        </TabsContainer>
        
        <SkillsGridContainer>
          {filteredSkills?.skills.length > 0 ? (
            <SkillsGrid key={activeTab} className="skills-grid">
              {filteredSkills?.skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  ref={el => cardsRef.current[index] = el}
                >
                  <SkillIcon>
                    <img src={skill.image} alt={skill.name} loading="lazy" />
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                </SkillCard>
              ))}
            </SkillsGrid>
          ) : (
            <EmptyState>
              <p>No skills found in this category</p>
            </EmptyState>
          )}
        </SkillsGridContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;