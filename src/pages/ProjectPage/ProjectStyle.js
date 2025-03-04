import styled from 'styled-components';
import { Swiper } from 'swiper/react';

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
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 1400px;
    width: 100%;
    gap: 30px;
    margin-top: 40px;
    height: calc(100vh - 200px);

    @media (min-width: 961px) {
        flex-direction: row;
        gap: 40px;
        justify-content: center;
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
`;

export const ProjectSubtitle = styled.p`
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    font-weight: 500;
    background: ${({ theme }) => theme.primary}15;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
`;

export const Divider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.text_secondary + '20'};
    margin: 8px 0;
`;

export const InfoSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 8px;
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const InfoLabel = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    svg {
        color: ${({ theme }) => theme.primary};
    }
`;

export const InfoValue = styled.span`
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    font-weight: 500;
`;

export const Description = styled.div`
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 16px;
    max-height: none;
    overflow: visible;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
`;

export const Tag = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    background-color: ${({ theme }) => theme.bgLight || 'rgba(255, 255, 255, 0.05)'};
    padding: 5px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    
    &::before {
        content: '#';
        font-size: 12px;
        color: ${({ theme }) => theme.primary};
        margin-right: 4px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.primary}15;
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
    }
`;

export const Links = styled.div`
    display: flex;
    gap: 16px;
    margin-top: auto;
    flex-wrap: wrap;
`;

export const GitHubLink = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: ${({ primary, theme }) => primary ? 'white' : theme.text_primary};
    background: ${({ primary, theme }) => primary ? theme.primary : theme.card_light};
    padding: 12px 20px;
    border-radius: 50px;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        background: ${({ primary, theme }) => primary ? theme.primary : theme.primary + '20'};
        color: ${({ primary, theme }) => primary ? 'white' : theme.primary};
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;
