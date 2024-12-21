import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faUsers, 
  faTicketAlt 
} from '@fortawesome/free-solid-svg-icons';
import { PartyDetails } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin-top: 0;
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

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 52px;
  color: ${({ theme }) => theme.primary};
  position: relative;
`;

const PartyDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1000px;
  margin-top: 30px;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.colored_detail};
  box-shadow: rgba(76, 81, 109, 0.15) 0px 4px 18px;
  border-radius: 16px;
  padding: 24px;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px -10px ${({ theme }) => `${theme.primary}40`};
    border-color: ${({ theme }) => theme.primary};
  }

  &:hover::before {
    transform: translateX(0);
  }
`;

const DetailIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => `${theme.primary}20`};
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
  }
  
  ${DetailCard}:hover & {
    transform: scale(1.1) rotate(10deg);
    
    &::after {
      transform: scale(1);
    }
  }
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const DetailTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  transition: transform 0.3s ease;

  ${DetailCard}:hover & {
    transform: translateX(5px);
    color: ${({ theme }) => theme.primary};
  }
`;

const DetailText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  transition: transform 0.3s ease;

  ${DetailCard}:hover & {
    transform: translateX(5px);
  }
`;

const PartyInfo = () => {
  const detailsRef = useRef([]);

  const iconMap = {
    faCalendarAlt,
    faMapMarkerAlt,
    faUsers,
    faTicketAlt
  };

  useEffect(() => {
    const tl = gsap.timeline({ 
      defaults: { 
        duration: 0.5, 
        ease: 'power3.out' 
      } 
    });
    
    tl.fromTo(detailsRef.current,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9 
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1, 
        stagger: 0.15, 
        duration: 0.4 
      }
    );
  }, []);

  return (
    <Container id="events">
      <Wrapper>
        <Title>{PartyDetails.title}</Title>
        <PartyDetailsContainer>
          {PartyDetails.details.map((detail, index) => (
            <DetailCard
              key={detail.title}
              ref={el => (detailsRef.current[index] = el)}
            >
              <DetailIcon>
                <FontAwesomeIcon icon={iconMap[detail.icon]} />
              </DetailIcon>
              <DetailContent>
                <DetailTitle>{detail.title}</DetailTitle>
                <DetailText>{detail.text}</DetailText>
              </DetailContent>
            </DetailCard>
          ))}
        </PartyDetailsContainer>
      </Wrapper>
    </Container>
  );
};

export default PartyInfo; 