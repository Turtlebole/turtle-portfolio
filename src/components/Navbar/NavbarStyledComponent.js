import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.div`
    background-color: ${({ theme }) => theme.bg + 'E6'};  // More opaque background
    backdrop-filter: blur(12px);  // Enhanced blur effect
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-size: 1rem;
    position: fixed;
    width: 90%;
    max-width: 1100px;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    transition: 0.3s all ease;
    border-radius: 30px;  // Rounder corners
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25), 
                inset 0 0 0 1px ${({ theme }) => theme.text_secondary + '20'};  // Enhanced shadow with inset border
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 28px;  // More padding for better spacing
    
    @media screen and (max-width: 480px) {
        padding: 0 24px;
    }
`;

export const NavLogo = styled(LinkR)`
    width: auto;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
        padding: 0;
    }
`;

export const LogoImg = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-right: 8px;
`;

export const Span = styled.div`
    color: ${({ theme }) => theme.text_primary};
    padding: 0 4px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);  // Text shadow for better readability
`;

export const ColoredSpan = styled.span`
    color: ${({ theme }) => theme.colored_detail};
`;

export const NavItems = styled.ul`
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0;
    list-style: none;
    margin: 0;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    position: relative;
    padding: 4px 0;
    
    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: ${({ theme }) => theme.colored_detail};
        transition: width 0.3s ease;
    }
    
    &:hover {
        color: ${({ theme }) => theme.colored_detail};
        
        &:after {
            width: 100%;
        }
    }
    
    &.active {
        color: ${({ theme }) => theme.colored_detail};
        
        &:after {
            width: 100%;
        }
    }
`;

export const ButtonContainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const GitHubButton = styled.a`
    background: ${({ theme }) => `linear-gradient(225deg, ${theme.primary} 0%, ${theme.colored_detail} 100%)`};
    color: ${({ theme }) => theme.white};
    border: none;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 14px;
    font-weight: 600;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);  // Stronger shadow
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 7px 15px rgba(0, 0, 0, 0.25);  // Enhanced hover shadow
    }
`;

export const ThemeButton = styled.button`
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        background: ${({ theme }) => theme.colored_detail + '20'};
        transform: translateY(-2px);
    }

    svg {
        width: 20px;
        height: 20px;
        fill: ${({ theme }) => theme.text_primary};
        transition: all 0.3s ease;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));  // Shadow for icon
        
        path {
            stroke: ${({ theme }) => theme.text_primary};
            stroke-width: 1;
        }
    }

    &:hover svg {
        fill: ${({ theme }) => theme.colored_detail};
        path {
            stroke: ${({ theme }) => theme.colored_detail};
        }
    }
`;

export const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        font-size: 1.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.text_primary};
        z-index: 999;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));  // Shadow for better visibility
    }
`;

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    padding: 90px 40px 40px 40px;
    background: ${({ theme }) => theme.bg + 'F8'};  // More opaque mobile menu
    transition: all 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '998' : '-1')};
    backdrop-filter: blur(12px);  // Enhanced blur effect
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);  // Shadow for mobile menu
    
    @media screen and (max-width: 480px) {
        padding: 80px 30px 30px 30px;
        align-items: center;
        text-align: center;
    }
`;

export const MobileLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);  // Text shadow for better readability
    
    &:hover {
        color: ${({ theme }) => theme.colored_detail};
        transform: translateX(5px);
    }
    
    @media screen and (max-width: 480px) {
        font-size: 22px;
        margin-bottom: 5px;
        
        &:hover {
            transform: scale(1.05);
        }
    }
`;

export const MobileNavLogo = styled(LinkR)`
    width: auto;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    position: absolute;
    top: 24px;
    left: 24px;
    
    @media screen and (max-width: 480px) {
        left: 50%;
        transform: translateX(-50%);
        justify-content: center;
    }
`;

export const MobileGitHubButton = styled(GitHubButton)`
    width: fit-content;
    margin-top: 16px;
    
    @media screen and (max-width: 480px) {
        margin-top: 20px;
        padding: 8px 20px;
        font-size: 16px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);  // Enhanced shadow
    }
`;

export const CloseIcon = styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
`;

export const MobileThemeButton = styled(ThemeButton)`
    position: absolute;
    top: 24px;
    right: 70px;
    
    @media screen and (max-width: 480px) {
        top: 24px;
        right: 24px;
    }
`;

export const MobileButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 16px;
    
    @media screen and (max-width: 480px) {
        align-items: center;
        margin-top: 20px;
    }
`;
