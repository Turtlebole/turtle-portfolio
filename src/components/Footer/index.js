import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitch, FaLinkedin, FaDiscord, FaChevronUp } from 'react-icons/fa';
import { ColoredSpan } from '../Navbar/NavbarStyledComponent';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.div`
    width: 100%;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.card};
`;

const FooterWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
    padding: 1rem;
    color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.div`
    font-weight: 600;
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
`;

const Nav = styled.nav`
    width: 100%;
    max-width: 800px;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        text-align: center;
        font-size: 12px;
    }
`;

const NavLink = styled.a`
    color: ${({ theme }) => theme.text_primary};
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s ease-in-out;
    &:hover {
        color: ${({ theme }) => theme.primary};
    }
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const SocialMediaIcons = styled.div`
    display: flex;
    margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
    display: inline-block;
    margin: 0 1rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text_primary};
    transition: color 0.2s ease-in-out;
    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const Copyright = styled.p`
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
`;

const BackToTopButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(100px)')};
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: ${({ theme }) => theme.card_light};
    }
`;

const Footer = ({ toggleTheme }) => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const footerRef = useRef(null);
    const navigate = useNavigate();
    
    // Force re-render on theme change
    const [, forceUpdate] = useState();
    
    useEffect(() => {
        // This will force a re-render when the component mounts
        // and should pick up any theme changes
        forceUpdate({});
    }, []);

    const handleScroll = useCallback((hash) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleNavigation = useCallback(
        (path, hash) => {
            navigate(path);
            setTimeout(() => handleScroll(hash), 100);
        },
        [navigate, handleScroll]
    );

    const handleScrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleScrollVisibility = useCallback(() => {
        if (footerRef.current) {
            const footerRect = footerRef.current.getBoundingClientRect();
            setIsButtonVisible(footerRect.top < window.innerHeight && footerRect.bottom >= 0);
        }
    }, []);

    useEffect(() => {
        handleScrollVisibility();
        const debouncedHandleScrollVisibility = () => {
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(handleScrollVisibility, 100);
        };

        window.addEventListener('scroll', debouncedHandleScrollVisibility);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScrollVisibility);
        };
    }, [handleScrollVisibility]);

    return (
        <>
            <FooterContainer ref={footerRef}>
                <FooterWrapper>
                    <SocialMediaIcons>
                        <SocialMediaIcon href="https://github.com/Turtlebole" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </SocialMediaIcon>
                        <SocialMediaIcon href="https://www.twitch.tv/turtlebole" target="_blank" rel="noopener noreferrer">
                            <FaTwitch />
                        </SocialMediaIcon>
                        <SocialMediaIcon href="https://discord.com/users/686681599894618144" target="_blank" rel="noopener noreferrer">
                            <FaDiscord />
                        </SocialMediaIcon>
                        <SocialMediaIcon href="https://www.linkedin.com/in/babicbojan/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </SocialMediaIcon>
                    </SocialMediaIcons>
                    <Copyright>
                        <ColoredSpan>© 2024</ColoredSpan> Bojan Babić
                    </Copyright>
                </FooterWrapper>
            </FooterContainer>
            <BackToTopButton onClick={handleScrollToTop} isVisible={isButtonVisible}>
                <FaChevronUp />
                <span>Top</span>
            </BackToTopButton>
        </>
    );
};

export default Footer;
