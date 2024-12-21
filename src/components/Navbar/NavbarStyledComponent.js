import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.div`
    background-color: ${({ theme }) => theme.bg};
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-size: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    transition: 0.8s all ease;
    border-bottom: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 2px 10px ${({ theme }) => `${theme.primary}40`};
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    color: ${({ theme }) => theme.text_primary};
    text-shadow: 0 0 10px ${({ theme }) => `${theme.primary}80`};
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
        text-shadow: 0 0 15px ${({ theme }) => theme.primary};
    }
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
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    padding: 5px 0;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: ${({ theme }) => theme.primary};
        transition: width 0.3s ease;
        box-shadow: 0 0 10px ${({ theme }) => theme.primary};
    }
    
    &:hover::after {
        width: 100%;
    }
    
    &:hover {
        color: ${({ theme }) => theme.primary};
        text-shadow: 0 0 8px ${({ theme }) => `${theme.primary}60`};
    }
`;

export const GitHubButton = styled.a`
    border: 2px solid ${({ theme }) => theme.primary};
    padding: 8px 20px;
    border-radius: 0;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    background: transparent;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.primary};
        transition: all 0.3s ease;
        z-index: -1;
    }
    
    &:hover {
        color: ${({ theme }) => theme.bg};
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    }
    
    &:hover::before {
        left: 0;
    }
`;

export const ThemeButton = styled.button`
    padding: 10px;
    background: ${({ theme }) => `${theme.primary}10`};
    border: 1px solid ${({ theme }) => `${theme.primary}50`};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.primary};
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(5px);
    
    &:hover {
        background: ${({ theme }) => `${theme.primary}20`};
        transform: translateY(-2px);
        box-shadow: 0 0 15px ${({ theme }) => `${theme.primary}20`};
    }

    &:active {
        transform: translateY(0);
    }

    svg {
        width: 20px;
        height: 20px;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        
        * {
            transition: all 0.3s ease;
        }
    }

    &:hover svg {
        transform: rotate(360deg);
    }

    &:hover svg * {
        stroke-width: 2.5;
    }
`;

export const LightBulbIcon = styled.i``;

export const ButtonContainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 50%);
        font-size: 1.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.text_primary};
    }
`;

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 70px;
    right: 0;
    width: 100%;
    padding: 24px;
    background: ${({ theme }) => `${theme.bg}f0`};
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 2px 10px ${({ theme }) => `${theme.primary}40`};
`;

export const MobileMenuItems = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    list-style: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

export const MobileMenuLink = styled(LinkR)`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    :hover {
        color: ${({ theme }) => theme.primary};
    }
    &.active {
        border-bottom: 2px solid ${({ theme }) => theme.primary};
    }
`;

export const MobileMenuButton = styled.a`
    border: 1.8px solid ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;
    height: 100%;
    border-radius: 20px;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    padding: 0 16px;
    font-weight: 500;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.6s ease-in-out;
    :hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.white};
    }
`;

export const MobileLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    :hover {
        color: ${({ theme }) => theme.primary};
    }
    &.active {
        border-bottom: 2px solid ${({ theme }) => theme.primary};
    }
`;

export const MobileNavLogo = styled(LinkR)`
    width: auto;
    padding: 0 12px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
        padding: 0;
    }
`;

export const ColoredSpan = styled.span`
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 10px ${({ theme }) => `${theme.primary}40`};
`;
