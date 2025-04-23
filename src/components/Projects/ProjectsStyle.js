import styled from 'styled-components';
import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0;
    
    @media (max-width: 768px) {
        padding: 30px 0;
    }
    
    @media (max-width: 480px) {
        padding: 20px 0;
    }
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 24px;
`;

export const Title = styled.h2`
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

export const Subtitle = styled.p`
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

export const TimelineContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 75px 0 40px;
    height: 700px;
    
    @media (max-width: 768px) {
        padding: 60px 0 30px;
        height: 650px;
    }
    
    @media (max-width: 480px) {
        padding: 50px 0 20px;
        height: 600px;
    }
`;

export const TimelineLine = styled.div`
    position: absolute;
    top: 155px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, 
        transparent 0%,
        ${({ theme }) => theme.primary}30 10%, 
        ${({ theme }) => theme.primary}60 50%,
        ${({ theme }) => theme.primary}30 90%,
        transparent 100%
    );
    z-index: 1;
    box-shadow: 0 0 8px ${({ theme }) => theme.primary}20;
`;

export const SlideContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    margin-top: 25px;
    opacity: 0;
    animation: ${fadeIn} 0.5s ease forwards;
    animation-delay: 0.2s;
`;

export const Pin = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.bg};
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    z-index: 2;
    margin: 0;
    transform: translateY(-50%);
    box-shadow: 0 0 10px ${({ theme }) => theme.primary}60;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 0 15px ${({ theme }) => theme.primary}80;
    }

    &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 25px;
        background: linear-gradient(
            to bottom,
            ${({ theme }) => theme.primary},
            ${({ theme }) => theme.primary}30
        );
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: ${({ theme }) => theme.primary};
        border-radius: 50%;
        box-shadow: 0 0 8px ${({ theme }) => theme.primary};
        animation: pulse 2s infinite;
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}80;
            }
            70% {
                box-shadow: 0 0 0 6px ${({ theme }) => theme.primary}00;
            }
            100% {
                box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}00;
            }
        }
    }
`;

export const PinDate = styled.div`
    padding: 8px 16px;
    background: ${({ theme }) => theme.card || theme.bgLight};
    color: ${({ theme }) => theme.primary};
    border: 1.5px solid ${({ theme }) => theme.primary}50;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 15px;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        background: ${({ theme }) => theme.primary}15;
    }
`;

export const CardWrapper = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: center;
    perspective: 1000px;
    padding: 0 8px;
`;

export const ProjectCard = styled.div`
    width: 330px;
    height: 480px;
    background: ${({ theme }) => theme.card || theme.bgLight};
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    
    border: 2px solid ${({ theme }) => theme.primary}30;
    
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        border-color: ${({ theme }) => theme.primary};
    }
`;

export const ProjectImageContainer = styled.div`
    width: 100%;
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    margin-bottom: 8px;
    flex-shrink: 0;
    
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: ${({ theme }) => theme.primary}10;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    ${ProjectCard}:hover &::after {
        opacity: 1;
    }
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.3s ease;
    
    ${ProjectCard}:hover & {
        transform: scale(1.05);
    }
`;

export const ProjectContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
    width: 100%;
    overflow: hidden;
`;

export const ProjectMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ProjectCategory = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}15;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 500;
`;

export const ProjectTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 0;
`;

export const ProjectDescription = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    margin: 0;
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 42px;
    flex-shrink: 0;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 16px;
    width: 100%;
    min-height: 100px;
`;

export const Tag = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
    background: ${({ theme }) => theme.bgLight || 'rgba(255, 255, 255, 0.05)'};
    padding: 5px 12px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    margin-bottom: 8px;
    
    &::before {
        content: '#';
        font-size: 11px;
        color: ${({ theme }) => theme.primary};
        margin-right: 4px;
    }
    
    &:hover {
        background: ${({ theme }) => theme.primary}15;
        color: ${({ theme }) => theme.primary};
    }
`;

export const ViewButton = styled.div`
    width: 100%;
    padding: 10px;
    background: ${({ theme }) => theme.primary}10;
    color: ${({ theme }) => theme.primary};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    transition: all 0.3s ease;
    margin-top: 6px;
    flex-shrink: 0;
    
    ${ProjectCard}:hover & {
        background: ${({ theme }) => theme.primary};
        color: white;
    }
`;

export const CarouselControls = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 30px;
`;

export const CarouselButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.card};
        transform: scale(1.1);
    }
    
    &:disabled {
        background: ${({ theme }) => theme.card};
        color: ${({ theme }) => theme.text_secondary}50;
        border-color: ${({ theme }) => theme.text_secondary}20;
        cursor: not-allowed;
        transform: scale(1);
    }

    svg {
        font-size: 20px;
    }
`;

export const CarouselDots = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
`;

export const CarouselDot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ active, theme }) => 
        active ? theme.primary : theme.primary + '20'};
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.2);
    }
`;