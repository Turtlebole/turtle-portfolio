import React, { useRef, useEffect } from 'react';
import HeroAnimation from './HeroAnimation';
import { useTheme } from 'styled-components';
import {
    HeroContainer,
    HeroContent,
    LeftColumn,
    RightColumn,
    Greeting,
    Name,
    RoleWrapper,
    Role,
    Description,
    ButtonGroup,
    PrimaryButton,
    SecondaryButton,
    ProfileImageContainer,
    ProfileImage,
    BackgroundDecoration,
    SocialLinks,
    SocialIcon,
    ScrollIndicator,
    ScrollText,
    ScrollArrow,
    HighlightSpan
} from './HeroStyle';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiDownload, HiArrowDown } from 'react-icons/hi';
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import HeroImg from '../../images/avatar.jpg';

const HeroSection = ({ theme }) => {
    const heroRef = useRef(null);
    const themeObject = useTheme();
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.1 }
        );
        
        if (heroRef.current) {
            observer.observe(heroRef.current);
        }
        
        // Force repaint of hero section on theme change
        if (heroRef.current) {
            const heroElement = heroRef.current;
            // Apply current theme background color directly
            heroElement.style.backgroundColor = themeObject.bg;
            
            // Force a reflow/repaint
            heroElement.classList.add('theme-updating');
            setTimeout(() => {
                heroElement.classList.remove('theme-updating');
            }, 10);
            
            // Apply transitions to child elements
            const contentElements = heroElement.querySelectorAll('.hero-element, [class^="styled-"]');
            contentElements.forEach(el => {
                el.style.transition = 'all 0.3s ease';
            });
        }
        
        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, [themeObject]);

    const handleDownload = () => {
        const fileUrl = '/CV/CV.pdf';
        const fileName = 'CV.pdf';

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToSkills = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <HeroContainer ref={heroRef} id="hero" style={{ backgroundColor: themeObject.bg, transition: 'background-color 0.3s ease, color 0.3s ease' }}>
            <HeroAnimation theme={theme} themeObject={themeObject} />
            <BackgroundDecoration />
            
            <HeroContent style={{ transition: 'all 0.3s ease' }}>
                <LeftColumn style={{ transition: 'all 0.3s ease' }}>
                    <Greeting className="hero-element">{Bio.title}</Greeting>
                    <Name className="hero-element">{Bio.name}</Name>
                    <RoleWrapper className="hero-element">
                        <Role>
                            Interested in{" "}
                            <Typewriter
                                options={{
                                    strings: Bio.roles,
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                    deleteSpeed: 50,
                                }}
                            />
                        </Role>
                    </RoleWrapper>
                    
                    <Description className="hero-element">
                        {Bio.description.split(' ').map((word, index) => {
                            return word.startsWith('#') ? 
                                <HighlightSpan key={index}>{word.substring(1)} </HighlightSpan> : 
                                word + ' ';
                        })}
                    </Description>
                    
                    <ButtonGroup className="hero-element">
                        <PrimaryButton onClick={scrollToProjects}>
                            View Projects
                        </PrimaryButton>
                        <SecondaryButton onClick={handleDownload}>
                            <HiDownload /> Download CV
                        </SecondaryButton>
                    </ButtonGroup>
                    
                    <SocialLinks className="hero-element">
                        <SocialIcon href={Bio.github} target="_blank" aria-label="GitHub">
                            <FaGithub />
                        </SocialIcon>
                        <SocialIcon href={Bio.linkedin} target="_blank" aria-label="LinkedIn">
                            <FaLinkedin />
                        </SocialIcon>
                        <SocialIcon href={Bio.twitter} target="_blank" aria-label="Twitter">
                            <FaTwitter />
                        </SocialIcon>
                    </SocialLinks>
                </LeftColumn>
                
                <RightColumn style={{ transition: 'all 0.3s ease' }}>
                    <ProfileImageContainer className="hero-element" style={{ transition: 'all 0.3s ease' }}>
                        <ProfileImage src={HeroImg} alt={Bio.name} loading="eager" />
                    </ProfileImageContainer>
                </RightColumn>
            </HeroContent>
            
            <ScrollIndicator onClick={scrollToSkills} className="hero-element">
                <ScrollText>Scroll Down</ScrollText>
                <ScrollArrow>
                    <HiArrowDown />
                </ScrollArrow>
            </ScrollIndicator>
        </HeroContainer>
    );
};

export default HeroSection;
