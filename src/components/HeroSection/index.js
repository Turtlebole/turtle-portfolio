import React from 'react';
import HeroAnimation from './HeroAnimation';
import {
    HeroContainer,
    HeroContent,
    MainTitle,
    SubTitle,
    VinylRecord,
    BlackParade
} from './HeroStyle';
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';


const HeroSection = ({ theme }) => {
    return (
        <HeroContainer id="about">
            <HeroAnimation theme={theme} />
            <BlackParade />
            <HeroContent>
                <VinylRecord />
                <MainTitle>
                <Typewriter options={Bio.typewriter} />
                </MainTitle>
                <SubTitle>{Bio.subtitle}</SubTitle>
            </HeroContent>
        </HeroContainer>
    );
};

export default HeroSection;
