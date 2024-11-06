import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(343.07deg, hsla(231, 17%, 36%, 0.06) 5.71%, hsla(231, 17%, 36%, 0) 64.83%);
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-top: 100px;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (min-width: 961px) {
        padding: 40px;
        padding-top: 120px;
    }
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1600px;
    width: 100%;
    height: 80vh;
    gap: 20px;

    @media (min-width: 961px) {
        flex-direction: row;
        gap: 0;
        justify-content: center;
    }
`;

export const LeftContainer = styled.div`
    background-color: ${({ theme }) => theme.card};
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    overflow-y: auto;
    min-width: 300px;
    max-width: 400px;

    @media (min-width: 961px) {
        flex: 0.3;
        order: 1;
        border-radius: 16px 0 0 16px;
    }

    @media (max-width: 960px) {
        order: 2;
        padding: 24px;
        border-radius: 16px;
        width: 100%;
        max-width: none;
    }
`;

export const RightContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    
    @media (min-width: 961px) {
        flex: 0.7;
        order: 2;
        max-width: 1000px;
    }

    @media (max-width: 960px) {
        order: 1;
        height: auto;
    }
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${({ theme }) => theme.card};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    
    @media (min-width: 961px) {
        border-radius: 0 16px 16px 0;
    }

    @media (max-width: 960px) {
        border-radius: 16px;
        height: auto;
    }
`;

export const StyledSwiper = styled(Swiper)`
    height: 100%;

    .swiper-slide {
        height: 100%;
    }

    .swiper-button-next,
    .swiper-button-prev {
        color: ${({ theme }) => theme.primary};
        background: ${({ theme }) => theme.card + 'CC'};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &:after {
            font-size: 20px;
        }
        &:hover {
            background: ${({ theme }) => theme.primary};
            color: white;
        }
    }

    .swiper-pagination-bullet {
        background: ${({ theme }) => theme.primary};
    }

    .swiper-pagination-bullet-active {
        background: ${({ theme }) => theme.primary};
    }
`;

export const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`;

export const ProjectSubtitle = styled.p`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 16px;
    font-weight: 500;
    opacity: 0.8;
`;

export const Divider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.text_secondary + '20'};
    margin: 16px 0;
`;

export const InfoSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const InfoLabel = styled.span`
    color: ${({ theme }) => theme.text_secondary};
    font-size: 14px;
    display: flex;
    align-items: center;
    opacity: 0.8;
`;

export const InfoValue = styled.span`
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    font-weight: 500;
    opacity: 0.9;
`;

export const Description = styled.div`
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 24px;
    opacity: 0.9;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
`;

export const Tag = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + '15'};
    padding: 6px 16px;
    border-radius: 100px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primary + '30'};
    }
`;

export const Links = styled.div`
    display: flex;
    gap: 16px;
    margin-top: auto;
`;

export const GitHubLink = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.card_light};
    padding: 12px 20px;
    border-radius: 100px;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.text_primary + '10'};
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }

    svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
        transition: all 0.3s ease;
    }
`;
