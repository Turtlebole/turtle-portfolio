import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitch, FaLinkedin, FaDiscord, FaChevronUp } from 'react-icons/fa';
import { ColoredSpan } from '../Navbar/NavbarStyledComponent';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.card_light};
    padding: 20px;
    text-align: center;
    position: relative;
`;

const FooterLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`;

const FooterLink = styled.span`
    color: ${({ theme }) => theme.text_primary};
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const SocialIcons = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

const SocialIcon = styled.a`
    color: ${({ theme }) => theme.text_primary};
    font-size: 24px;
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.primary};
    }
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

const Footer = () => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const navigate = useNavigate();

    const handleScroll = (hash) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavigation = (path, hash) => {
        navigate(path);
        setTimeout(() => handleScroll(hash), 100);
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScrollVisibility = () => {
        const footer = document.querySelector('footer');
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            if (footerRect.top < window.innerHeight && footerRect.bottom >= 0) {
                setIsButtonVisible(true);
            } else {
                setIsButtonVisible(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollVisibility);
        return () => {
            window.removeEventListener('scroll', handleScrollVisibility);
        };
    }, []);

    return (
        <>
            <FooterContainer>
                <FooterLinks>
                    <FooterLink onClick={() => handleNavigation('/', '#skills')}>
                        Skills
                    </FooterLink>
                    <FooterLink onClick={() => handleNavigation('/', '#projects')}>
                        Projects
                    </FooterLink>
                </FooterLinks>
                <SocialIcons>
                    <SocialIcon href="https://github.com/Turtlebole" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </SocialIcon>
                    <SocialIcon href="https://www.twitch.tv/turtlebole" target="_blank" rel="noopener noreferrer">
                        <FaTwitch />
                    </SocialIcon>
                    <SocialIcon href="https://discord.com/users/686681599894618144" target="_blank" rel="noopener noreferrer">
                        <FaDiscord />
                    </SocialIcon>
                    <SocialIcon href="https://www.linkedin.com/in/babicbojan/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </SocialIcon>
                </SocialIcons>
                <div>
                    <ColoredSpan>© 2024</ColoredSpan>
                </div>
            </FooterContainer>
            <BackToTopButton onClick={handleScrollToTop} isVisible={isButtonVisible}>
                <FaChevronUp />
                <span>Top</span>
            </BackToTopButton>
        </>
    );
};

export default Footer;
