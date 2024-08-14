import React from 'react';
import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { FaGithub, FaTwitter, FaReddit } from 'react-icons/fa';
import { ColoredSpan } from '../Navbar/NavbarStyledComponent'; // Import ColoredSpan if it is defined there

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
            <FooterLinks>
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/">About</FooterLink>
                <FooterLink to="/">Contact</FooterLink>
            </FooterLinks>
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
            </SocialIcons>
            <div>
                <ColoredSpan>© 2024 Turtle</ColoredSpan>
            </div>
        </FooterContainer>
    );
};

export default Footer;
