import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const HeroContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 24px;
    background: ${({ theme }) => theme.bg};
    overflow: hidden;
    
    @media screen and (max-width: 768px) {
        min-height: auto;
        padding: 80px 20px 40px;
        justify-content: flex-start;
    }
    
    @media screen and (max-width: 480px) {
        padding: 80px 16px 40px;
    }
    
    &.visible {
        .hero-element {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const BackgroundDecoration = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 10% 20%, ${({ theme }) => theme.primary}10 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, ${({ theme }) => theme.primary}10 0%, transparent 20%),
                radial-gradient(circle at 50% 50%, ${({ theme }) => theme.primary}05 0%, transparent 50%);
    z-index: 0;
`;

export const HeroContent = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    max-width: 1200px;
    width: 100%;
    gap: 60px;
    z-index: 1;
    
    @media screen and (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0; 
    transform: translateY(30px);
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.2s;
    
    @media screen and (max-width: 960px) {
        align-items: center;
        text-align: center;
        order: 2;
    }
`;

export const RightColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.5s;
    
    @media screen and (max-width: 960px) {
        order: 1;
    }
    
    @media screen and (max-width: 480px) {
        margin-bottom: 10px;
    }
`;

export const IntroText = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 8px;
    
    @media screen and (max-width: 768px) {
        flex-direction: row;
        align-items: baseline;
        justify-content: center;
        margin-bottom: 4px;
    }
    
    @media screen and (max-width: 480px) {
        flex-direction: row;
    }
`;

export const Greeting = styled.span`
    font-size: 32px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    margin-right: 8px;
    
    @media screen and (max-width: 768px) {
        font-size: 24px;
        margin-right: 8px;
    }
    
    @media screen and (max-width: 480px) {
        font-size: 22px;
        margin-right: 6px;
    }
`;

export const Name = styled.span`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    background: linear-gradient(
        135deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary_light || theme.primary} 50%,
        ${({ theme }) => theme.primary} 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientAnimation} 5s ease infinite;
    
    @media screen and (max-width: 768px) {
        font-size: 32px;
    }
    
    @media screen and (max-width: 480px) {
        font-size: 28px;
    }
`;

export const RoleWrapper = styled.div`
    margin: 12px 0 24px;
    
    @media screen and (max-width: 768px) {
        margin: 8px 0 16px;
    }
    
    @media screen and (max-width: 480px) {
        margin: 6px 0 14px;
    }
`;

export const Role = styled.div`
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
    .Typewriter {
        margin-left: 8px;
        color: ${({ theme }) => theme.primary};
        font-weight: 600;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    }
    
    @media screen and (max-width: 768px) {
        font-size: 20px;
        justify-content: center;
    }
    
    @media screen and (max-width: 480px) {
        font-size: 16px;
        flex-direction: column;
        align-items: center;
        
        .Typewriter {
            margin-left: 0;
            margin-top: 4px;
        }
    }
`;

export const Description = styled.p`
    font-size: 18px;
    line-height: 1.7;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 32px;
    max-width: 600px;
    
    @media screen and (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 24px;
        padding: 0 10px;
    }
    
    @media screen and (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 20px;
        line-height: 1.5;
        padding: 0;
    }
`;

export const HighlightSpan = styled.span`
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 40px;
    
    @media screen and (max-width: 960px) {
        margin-bottom: 80px;
    }
    
    @media screen and (max-width: 480px) {
        flex-direction: column;
        width: 100%;
        gap: 12px;
        margin-bottom: 60px;
    }
`;

export const PrimaryButton = styled.button`
    padding: 14px 32px;
    background: ${({ theme }) => theme.primary};
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px ${({ theme }) => theme.primary}40;
    position: relative;
    z-index: 5;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px ${({ theme }) => theme.primary}80;
        background: ${({ theme }) => theme.primary_dark || theme.primary};
    }
    
    &:active {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px ${({ theme }) => theme.primary}60;
    }
    
    @media screen and (max-width: 768px) {
        padding: 12px 28px;
        font-size: 15px;
    }
    
    @media screen and (max-width: 480px) {
        width: 100%;
        padding: 10px 24px;
        font-size: 14px;
    }
`;

export const SecondaryButton = styled.button`
    padding: 14px 32px;
    background: transparent;
    color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    z-index: 5;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    
    &:hover {
        background: transparent;
        color: ${({ theme }) => theme.primary};
        transform: translateY(-5px);
        box-shadow: 0 8px 20px ${({ theme }) => theme.primary}40;
        border-color: ${({ theme }) => theme.primary};
    }
    
    &:active {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px ${({ theme }) => theme.primary}30;
    }
    
    @media screen and (max-width: 768px) {
        padding: 12px 28px;
        font-size: 15px;
    }
    
    @media screen and (max-width: 480px) {
        width: 100%;
        padding: 10px 24px;
        font-size: 14px;
    }
`;

export const ProfileImageContainer = styled.div`
    position: relative;
    width: 380px;
    height: 380px;
    animation: ${float} 6s ease-in-out infinite;
    
    &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border-radius: 50%;
        background: linear-gradient(
            45deg,
            ${({ theme }) => theme.primary}40 0%,
            transparent 50%,
            ${({ theme }) => theme.primary}40 100%
        );
        z-index: -1;
        animation: ${pulse} 5s ease-in-out infinite;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.primary}30;
        z-index: -1;
    }
    
    @media screen and (max-width: 768px) {
        width: 250px;
        height: 250px;
        
        &::before {
            top: -15px;
            left: -15px;
            right: -15px;
            bottom: -15px;
        }
    }
    
    @media screen and (max-width: 480px) {
        width: 180px;
        height: 180px;
        
        &::before {
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
        }
    }
`;

export const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${({ theme }) => theme.primary};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

export const SocialLinks = styled.div`
    display: flex;
    gap: 16px;
    
    @media screen and (max-width: 960px) {
        justify-content: center;
    }
    
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const SocialIcon = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
        transform: translateY(-3px);
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white || '#ffffff'};
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    
    @media screen and (max-width: 768px) {
        width: 35px;
        height: 35px;
        font-size: 18px;
    }
    
    @media screen and (max-width: 480px) {
        width: 32px;
        height: 32px;
        font-size: 16px;
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const ScrollIndicator = styled.div`
    position: absolute;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 1.2s;
    
    @media screen and (max-width: 960px) {
        bottom: 30px;
        position: absolute;
    }
    
    @media screen and (max-width: 480px) {
        position: static;
        margin-top: 0;
        margin-bottom: 20px;
    }
`;

export const ScrollText = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 8px;
    
    @media screen and (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 4px;
    }
`;

export const ScrollArrow = styled.div`
    font-size: 24px;
    color: ${({ theme }) => theme.primary};
    animation: ${bounce} 2s infinite;
    
    @media screen and (max-width: 480px) {
        font-size: 20px;
    }
`;