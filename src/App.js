import { ThemeProvider } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import styled from "styled-components";
import Projects from "./components/Projects";
import ProjectPage from "./pages/ProjectPage/ProjectPage.js";
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
`;

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const sectionsRef = useRef([]);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        sectionsRef.current.forEach(section => {
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
        });
    }, []);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Router>
                <Navbar toggleTheme={toggleTheme} />
                <Body>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <HeroSection theme={darkMode ? 'dark' : 'light'} />
                                <Section ref={el => sectionsRef.current[0] = el}>
                                    <Skills />
                                </Section>
                                <Section ref={el => sectionsRef.current[1] = el}>
                                    <Projects />
                                </Section>
                                <Section ref={el => sectionsRef.current[2] = el}>
                                    <Contact />
                                </Section>
                                <Footer toggleTheme={toggleTheme}/> {/* Include the Footer component here */}
                            </>
                        } />
                        <Route path="/project/:id" element={<ProjectPage />} />
                    </Routes>
                </Body>
            </Router>
        </ThemeProvider>
    );
}

export default App;
