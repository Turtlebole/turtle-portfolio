import React from 'react';
import HeroAnimation from './HeroAnimation';
import {
    HeroContainer,
    HeroLeftContainer,
    Img,
    HeroRightContainer,
    HeroInnerContainer,
    TextLoop,
    Title,
    Span,
    SubTitle,
    ResumeButtonComponent
} from './HeroStyle';
import HeroImg from '../../images/avatar.jpg';
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';

const HeroSection = ({ theme }) => {
    return (
        <HeroContainer id="about">
            <HeroAnimation theme={theme} />
            <HeroInnerContainer>
                <HeroLeftContainer>
                    <Title>{Bio.title}</Title>
                    <TextLoop>
                        I enjoy
                        <Span>
                            <Typewriter
                                options={{
                                    strings: Bio.roles,
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                    deleteSpeed: 50,
                                }}
                            />
                        </Span>
                    </TextLoop>
                    <SubTitle>{Bio.description}</SubTitle>
                    <ResumeButtonComponent>Download CV</ResumeButtonComponent>
                </HeroLeftContainer>

                <HeroRightContainer>
                    <Img src={HeroImg} alt="hero-image" loading="eager" />
                </HeroRightContainer>
            </HeroInnerContainer>
        </HeroContainer>
    );
};

export default HeroSection;
