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
  background: ${({ theme }) => theme.card_light + '20'};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 32px;
    margin-top: 12px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 30px;
  }
`;

const Button = styled.button`
  font-size: 16px;
  padding: 12px 24px;
  background: ${({ active, theme }) => active ? theme.primary + '20' : 'transparent'};
  color: ${({ active, theme }) => active ? theme.primary : theme.text_primary};
  border: 1.8px solid ${({ active, theme }) => active ? theme.primary : theme.text_primary + '50'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.primary + '10'};
    border: 1.8px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  width: 100%;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    padding: 10px 0;
  }
`;

const Skill = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_primary + '15'};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);

  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
    border: 1px solid ${({ theme }) => theme.primary + '50'};
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 8px;
  }
`;

const SkillImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.card_light};
  padding: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    padding: 6px;
  }
`;

const SkillName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Skills = () => {
  const [activeButton, setActiveButton] = useState('frontend');
  const skillsRef = useRef([]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filteredSkills = skills.filter(skill => 
    skill.title.toLowerCase() === activeButton.toLowerCase()
  );

  useEffect(() => {
    if (skillsRef.current.length > 0) {
      gsap.to(skillsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, [activeButton]);

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Technical Proficiency</Title>
        <Desc>
          Showcasing my expertise across various technologies and tools
        </Desc>
        <ButtonContainer>
          {['Frontend', 'Backend', 'Database'].map((btn) => (
            <Button
              key={btn}
              active={activeButton === btn.toLowerCase()}
              onClick={() => handleButtonClick(btn.toLowerCase())}
            >
              {btn}
            </Button>
          ))}
        </ButtonContainer>
        <SkillsContainer>
          {filteredSkills.flatMap((skill, skillIndex) =>
            skill.skills.map((item, index) => (
              <Skill
                key={item.name}
                ref={el => (skillsRef.current[skillIndex * skill.skills.length + index] = el)}
              >
                <SkillImage src={item.image} alt={item.name} />
                <SkillName>{item.name}</SkillName>
              </Skill>
            ))
          )}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
