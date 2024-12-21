import styled, { keyframes } from "styled-components";
import avatarImage from '../../images/avatar.jpg';

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

export const HeroContainer = styled.div`
    position: relative;
    min-height: 100vh;
    background: ${({ theme }) => theme.bg};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, 
            ${({ theme }) => `${theme.primary}15`} 0%,
            transparent 70%);
    }
`;

export const BlackParade = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
        0deg,
        transparent 0%,
        ${({ theme }) => `${theme.primary}10`} 50%,
        transparent 100%
    );
    pointer-events: none;
`;

export const HeroContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    z-index: 2;
    animation: ${fadeIn} 1s ease;
`;

export const VinylRecord = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
    position: relative;
    animation: ${spin} 20s linear infinite;
    box-shadow: 0 0 30px ${({ theme }) => `${theme.primary}30`};
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        background: url(${avatarImage}) center center/cover;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        border: 4px solid ${({ theme }) => theme.primary};
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: repeating-radial-gradient(
            circle at center,
            ${({ theme }) => `${theme.text_primary}10`} 0%,
            ${({ theme }) => `${theme.text_primary}10`} 2px,
            transparent 2px,
            transparent 7px
        );
        border: 1px solid ${({ theme }) => `${theme.text_primary}30`};
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 200px;

        &::before {
            width: 60px;
            height: 60px;
        }
    }
`;

export const MainTitle = styled.h1`
    font-size: 3.5rem;
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
    color: ${({ theme }) => theme.text_primary};
    text-shadow: 0 0 10px ${({ theme }) => theme.primary};
    letter-spacing: 4px;
    animation: ${pulse} 2s infinite;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

export const SubTitle = styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-style: italic;
`;