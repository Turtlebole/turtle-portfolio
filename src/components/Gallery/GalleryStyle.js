import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  padding: 50px 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Heading = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.primary};
  position: relative;
  padding-bottom: 20px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const ImageContainer = styled(motion.div)`
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 20px ${({ theme }) => `${theme.primary}40`};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => `${theme.primary}40`} 0%,
      transparent 100%
    );
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `${theme.bg}f8`};
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  border: 3px solid ${({ theme }) => theme.primary};
  box-shadow: 
    0 0 30px ${({ theme }) => `${theme.primary}40`},
    inset 0 0 30px ${({ theme }) => `${theme.primary}40`};
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  overflow: hidden;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 24px;
  z-index: 1002;
  box-shadow: 0 0 15px ${({ theme }) => `${theme.primary}40`};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
    transform: rotate(180deg);
    box-shadow: 0 0 20px ${({ theme }) => theme.primary};
  }
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  background: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  transform: translateY(-50%);
  z-index: 1002;
  border-radius: 50%;
  box-shadow: 0 0 15px ${({ theme }) => `${theme.primary}40`};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 20px ${({ theme }) => theme.primary};
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: ${props => props.direction === 'prev' ? 'translateX(-5px)' : 'translateX(5px)'};
  }
`;

export const ImageTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => `${theme.bg}cc`};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  margin: 0;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  backdrop-filter: blur(5px);
  
  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

export const ViewMoreButton = styled.button`
  margin: 20px auto;
  padding: 12px 24px;
  background: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px ${({ theme }) => `${theme.primary}40`};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
    transform: translateY(-2px);
    box-shadow: 0 0 20px ${({ theme }) => theme.primary};
  }
`;
