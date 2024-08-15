import React from 'react';
import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { FaGithub, FaTwitter, FaReddit, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { ColoredSpan } from '../Navbar/NavbarStyledComponent';

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

const FooterLink = styled(LinkR)`
    color: ${({ theme }) => theme.text_primary};
    text-decoration: none;
    font-weight: 500;
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

const Footer = ({ toggleTheme }) => {
    return (
        <FooterContainer>
            <SocialIcons>
                <SocialIcon href="https://github.com/Turtlebole" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </SocialIcon>
                <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </SocialIcon>
                <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                    <FaReddit />
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
    );
};

export default Footer;