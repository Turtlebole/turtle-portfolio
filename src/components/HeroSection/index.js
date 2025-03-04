import React, { useRef, useEffect } from 'react';
import HeroAnimation from './HeroAnimation';
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
        
        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

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

    return (
        <HeroContainer ref={heroRef}>
            <HeroAnimation theme={theme} />
            <BackgroundDecoration />
            
            <HeroContent>
                <LeftColumn>
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
                
                <RightColumn>
                    <ProfileImageContainer className="hero-element">
                        <ProfileImage src={HeroImg} alt={Bio.name} loading="eager" />
                    </ProfileImageContainer>
                </RightColumn>
            </HeroContent>
            
            <ScrollIndicator onClick={scrollToProjects} className="hero-element">
                <ScrollText>Scroll Down</ScrollText>
                <ScrollArrow>
                    <HiArrowDown />
                </ScrollArrow>
            </ScrollIndicator>
        </HeroContainer>
    );
};

export default HeroSection;
