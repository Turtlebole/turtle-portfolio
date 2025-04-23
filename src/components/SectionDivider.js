import React from 'react';
import styled from 'styled-components';

const DividerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: -20px;
  margin-bottom: -20px;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    height: 30px;
    margin-top: -15px;
    margin-bottom: -15px;
  }
`;

const SectionDivider = ({ theme }) => {
  return <DividerContainer theme={theme} />;
};

export default SectionDivider; 