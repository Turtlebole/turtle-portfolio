import { ThemeProvider } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import PartyInfo from "./components/PartyInfo";
import Playlists from "./components/Playlists/index.js";
import styled from "styled-components";
import GalleryPage from "./pages/GalleryPage";
import Gallery from "./components/Gallery";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Body = styled.div`
    background-color: ${({ theme }) => theme.bg};
    width: 100%;
    overflow-x: hidden;
`;

const Section = styled.div`
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.1s, filter 0.1s;
    padding: 50px 0; 
    &:first-of-type {
        padding-top: 100px; 
    }
`;

function Home({ darkMode, toggleTheme, sectionsRef }) {
    useEffect(() => {
        if (sectionsRef.current) {
            sectionsRef.current.forEach(section => {
                if (section) {
                    gsap.fromTo(section,
                        { opacity: 0, filter: 'blur(10px)' },
                        {
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 1.5,
                            ease: 'power1.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 80%',
                                end: 'top 50%',
                                scrub: 0.5,
                            },
                        }
                    );
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [sectionsRef]);

    return (
        <>
            <HeroSection theme={darkMode ? 'dark' : 'light'} />
            <Section ref={el => sectionsRef.current[0] = el}>
                <PartyInfo />
            </Section>
            <Section ref={el => sectionsRef.current[1] = el}>
                <Gallery />
            </Section>
            <Section ref={el => sectionsRef.current[2] = el}>
                <Playlists />
            </Section>
            <Footer toggleTheme={toggleTheme} />
        </>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

    const sectionsRef = useRef([]);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Router>
                <Navbar toggleTheme={toggleTheme} />
                <Body>
                    <Routes>
                        <Route path="/" element={
                            <Home darkMode={darkMode} toggleTheme={toggleTheme} sectionsRef={sectionsRef} />
                        } />
                          <Route path="/gallery" element={
                            <GalleryPage darkMode={darkMode} toggleTheme={toggleTheme} sectionsRef={sectionsRef} />
                        } />
                    </Routes>
                </Body>
            </Router>
        </ThemeProvider>
    );
}

export default App;
