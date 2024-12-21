import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FaDiscord, FaInstagram, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.bg};
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-top: 0.5px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary}40;
`;

const FooterWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const FooterLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;

    @media screen and (max-width: 768px) {
        gap: 16px;
    }
`;

const FooterLink = styled.span`
    color: ${({ theme }) => theme.text_primary};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 50%;
        background: ${({ theme }) => theme.primary};
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }

    &:hover {
        color: ${({ theme }) => theme.primary};
        &:after {
            width: 100%;
        }
    }
`;

const SocialIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const SocialIcon = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-size: 24px;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
    }
`;

const BackToTopButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    width: 44px;
    height: 44px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(100px)')};
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px ${({ theme }) => theme.primary}40;

    &:hover {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.bg};
        transform: ${(props) => props.isVisible ? 'translateY(-5px)' : 'translateY(100px)'};
    }

    @media screen and (max-width: 768px) {
        bottom: 100px;
        right: 20px;
        width: 40px;
        height: 40px;
        font-size: 14px;
    }
`;

const Footer = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const footerRef = useRef(null);
    const navigate = useNavigate();

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
        const scrolled = window.scrollY;
        setIsButtonVisible(scrolled > 300);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollVisibility);
        return () => window.removeEventListener('scroll', handleScrollVisibility);
    }, [handleScrollVisibility]);

    return (
        <>
            <FooterContainer ref={footerRef}>
                <FooterWrapper>
                    <FooterLinks>
                        <FooterLink onClick={() => handleNavigation('/', '#music')}>
                            Music
                        </FooterLink>
                        <FooterLink onClick={() => handleNavigation('/', '#gallery')}>
                            Gallery
                        </FooterLink>
                    </FooterLinks>
                    <SocialIcons>
                        <SocialIcon href="https://www.instagram.com/dj_nightmarespins/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </SocialIcon>
                        <SocialIcon href="https://discord.com/users/" target="_blank" rel="noopener noreferrer">
                            <FaDiscord />
                        </SocialIcon>
                    </SocialIcons>
                </FooterWrapper>
            </FooterContainer>
            <BackToTopButton onClick={handleScrollToTop} isVisible={isButtonVisible}>
                <FaChevronUp />
            </BackToTopButton>
        </>
    );
};

export default Footer;
