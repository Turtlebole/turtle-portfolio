import styled from 'styled-components';
import { Swiper } from 'swiper/react';

// Floating decorative elements
export const FloatingElement = styled.div`
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

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: ${({ theme }) => theme.bg};
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-top: 100px;
    box-sizing: border-box;
    overflow-x: hidden;
    position: relative;

    @media (min-width: 961px) {
        padding: 40px;
        padding-top: 120px;
    }
    
    @media (max-width: 480px) {
        padding: 16px;
        padding-top: 90px;
    }
`;

export const BackButton = styled.button`
    position: absolute;
    top: 100px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    border: none;
    padding: 10px 16px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;

    &:hover {
        transform: translateY(-3px);
        background: ${({ theme }) => theme.primary};
        color: white;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        top: 80px;
        left: 20px;
        font-size: 14px;
        padding: 8px 12px;
    }
    
    @media (max-width: 480px) {
        top: 70px;
        left: 16px;
        font-size: 13px;
        padding: 6px 10px;
    }
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 1400px;
    width: 100%;
    gap: 30px;
    margin-top: 40px;
    position: relative;
    z-index: 1;

    @media (min-width: 961px) {
        flex-direction: row;
        gap: 40px;
        justify-content: center;
        min-height: calc(100vh - 220px);
    }
    
    @media (max-width: 768px) {
        margin-top: 30px;
    }
    
    @media (max-width: 480px) {
        gap: 24px;
        margin-top: 24px;
    }
`;

export const LeftContainer = styled.div`
    background-color: ${({ theme }) => theme.card};
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.primary}30;
    transition: all 0.3s ease;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
        margin: 10px 0;
    }
    
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.primary}40;
        border-radius: 20px;
        border: 2px solid ${({ theme }) => theme.card};
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.primary}80;
    }

    &:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        border-color: ${({ theme }) => theme.primary}60;
    }

    @media (min-width: 961px) {
        flex: 0.4;
        order: 1;
        max-height: 100%;
    }

    @media (max-width: 960px) {
        order: 2;
        padding: 24px;
        max-width: none;
    }
    
    @media (max-width: 480px) {
        padding: 20px;
        gap: 18px;
        border-radius: 16px;
    }
`;

export const RightContainer = styled.div`
    width: 100%;
    display: flex;
    align-self: stretch;
    
    @media (min-width: 961px) {
        flex: 0.6;
        order: 2;
        max-width: 800px;
        max-height: 100%;
    }

    @media (max-width: 960px) {
        order: 1;
        height: 400px;
    }
    
    @media (max-width: 480px) {
        height: 300px;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    flex: 1;
    overflow: hidden;
    background: ${({ theme }) => theme.card};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.primary}30;
    transition: all 0.3s ease;
    display: flex;
    position: relative;
    
    &:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        border-color: ${({ theme }) => theme.primary}60;
    }

    @media (max-width: 960px) {
        height: 100%;
    }
    
    @media (max-width: 480px) {
        border-radius: 16px;
    }
`;

export const StyledSwiper = styled(Swiper)`
    height: 100%;
    width: 100%;

    .swiper-slide {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .swiper-button-next,
    .swiper-button-prev {
        color: white;
        background: ${({ theme }) => theme.primary}CC;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &:after {
            font-size: 20px;
        }
        &:hover {
            background: ${({ theme }) => theme.primary};
            transform: scale(1.1);
        }
        
        @media (max-width: 480px) {
            width: 32px;
            height: 32px;
            &:after {
                font-size: 16px;
            }
        }
    }

    .swiper-pagination-bullet {
        background: white;
        opacity: 0.7;
    }

    .swiper-pagination-bullet-active {
        background: ${({ theme }) => theme.primary};
        opacity: 1;
    }
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.02);
    }
`;

export const ProjectHeader = styled.div`
    margin-bottom: 8px;
`;

export const ProjectTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 8px;
    line-height: 1.2;
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.text_primary} 0%,
        ${({ theme }) => theme.primary} 50%,
        ${({ theme }) => theme.text_primary} 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientText 6s ease infinite;
    
    @keyframes gradientText {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @media (max-width: 768px) {
        font-size: 28px;
    }
    
    @media (max-width: 480px) {
        font-size: 24px;
    }
`;

export const ProjectSubtitle = styled.p`
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    font-weight: 500;
    background: ${({ theme }) => theme.primary}15;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    
    @media (max-width: 480px) {
        font-size: 14px;
        padding: 3px 10px;
    }
`;

export const Divider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.text_secondary + '20'};
    margin: 8px 0;
    
    @media (max-width: 480px) {
        margin: 6px 0;
    }
`;

export const InfoSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    
    @media (max-width: 480px) {
        gap: 12px;
    }
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    @media (max-width: 480px) {
        gap: 4px;
    }
`;

export const InfoLabel = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    display: flex;
    align-items: center;
    gap: 8px;
    
    svg {
        color: ${({ theme }) => theme.primary};
        font-size: 16px;
    }
    
    @media (max-width: 480px) {
        font-size: 13px;
        
        svg {
            font-size: 14px;
        }
    }
`;

export const InfoValue = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

export const Description = styled.p`
    font-size: 16px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    margin: 0;
    
    @media (max-width: 768px) {
        font-size: 15px;
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
        line-height: 1.5;
    }
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    @media (max-width: 480px) {
        gap: 8px;
    }
`;

export const Tag = styled.span`
    font-size: 14px;
    background: ${({ theme }) => theme.bgLight || theme.secondary + '20'};
    color: ${({ theme }) => theme.text_secondary};
    padding: 6px 14px;
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.primary}20;
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        padding: 5px 12px;
        border-radius: 10px;
    }
`;

export const Links = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
    
    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
    }
`;

export const GitHubLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${({ primary, theme }) => 
        primary ? 
        `linear-gradient(135deg, ${theme.primary}, ${theme.colored_detail || theme.primary})` : 
        theme.card_light || theme.bgLight};
    color: ${({ primary, theme }) => primary ? '#fff' : theme.text_primary};
    padding: 10px 16px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    text-decoration: none;
    text-align: center;
    border: ${({ primary, theme }) => primary ? 'none' : `1px solid ${theme.text_secondary}20`};
    box-shadow: ${({ primary, theme }) => primary ? `0 5px 15px ${theme.primary}40` : 'none'};
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transition: 0.5s;
    }

    svg {
        font-size: 18px;
        transition: transform 0.3s ease;
    }

    &:hover {
        transform: translateY(-3px);
        background: ${({ primary, theme }) => 
            primary ? 
            `linear-gradient(135deg, ${theme.primary}, ${theme.colored_detail || theme.primary})` : 
            theme.primary}15;
        color: ${({ primary, theme }) => primary ? '#fff' : theme.primary};
        box-shadow: ${({ primary, theme }) => 
            primary ? 
            `0 8px 20px ${theme.primary}40` : 
            `0 5px 15px rgba(0, 0, 0, 0.1)`};
        
        &::before {
            left: 100%;
        }
        
        svg {
            transform: translateX(3px);
        }
    }
    
    @media (max-width: 768px) {
        padding: 8px 14px;
        font-size: 15px;
        
        svg {
            font-size: 16px;
        }
    }
    
    @media (max-width: 480px) {
        padding: 8px 12px;
        font-size: 14px;
        border-radius: 10px;
        
        svg {
            font-size: 15px;
        }
    }
`;
