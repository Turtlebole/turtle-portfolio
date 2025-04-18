import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const BannerContainer = styled.div`
  display: ${({ visible }) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1100px;
  padding: 12px 24px;
  background: ${({ theme }) => `linear-gradient(225deg, ${theme.colored_detail}CC, ${theme.primary}CC)`};
  color: ${({ theme }) => theme.text_primary};
  backdrop-filter: blur(12px);
  position: fixed;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  border-radius: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25), 
              inset 0 0 0 1px ${({ theme }) => theme.text_secondary + '20'};
  
  @media screen and (max-width: 768px) {
    padding: 10px 16px;
    flex-direction: column;
    gap: 8px;
    width: 85%;
    top: 85px;
  }
  
  @media screen and (max-width: 480px) {
    top: 80px;
    width: 80%;
    padding: 8px 12px;
  }
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerText = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  
  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  
  &:hover {
    background: ${({ theme }) => theme.text_primary + '20'};
    transform: rotate(90deg);
  }
`;

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(true);
  
  return (
    <BannerContainer visible={visible}>
      <BannerContent>
        <BannerText>
          Hey, welcome to my protfolio website, currently working on [ProjectName] .
        </BannerText>
        <CloseButton onClick={() => setVisible(false)}>
          <FaTimes />
        </CloseButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default AnnouncementBanner; 