import { ThemeProvider } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import styled, { createGlobalStyle } from "styled-components";
import Projects from "./components/Projects";
import ProjectPage from "./pages/ProjectPage/ProjectPage.js";
import PostList from "./pages/BlogPage/PostList";
import PostPage from "./pages/BlogPage/PostPage";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Add global styles to ensure all elements transition smoothly
const GlobalStyle = createGlobalStyle`
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
  }
`;

const Body = styled.div`
    background-color: ${({ theme }) => theme.bg};
    width: 100%;
    overflow-x: hidden;
    transition: all 0.3s ease;
`;

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.bg};
    width: 100%;
    transition: all 0.3s ease;
`;

const Section = styled.div`
    padding: 50px 0; 
    background-color: ${({ theme }) => theme.bg};
    &:first-of-type {
        padding-top: 100px; 
    }
    transition: all 0.3s ease;
`;

function Home({ darkMode, toggleTheme, sectionsRef }) {
    useEffect(() => {
        // Clear any existing ScrollTrigger animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Short delay to ensure theme transition completes first
        const timer = setTimeout(() => {
            if (sectionsRef.current) {
                // Make sure sections are visible first
                sectionsRef.current.forEach(section => {
                    if (section) {
                        // Reset initial state to be visible
                        gsap.set(section, { opacity: 1, filter: 'blur(0px)' });
                        
                        // Then apply the scroll animation
                        gsap.fromTo(section,
                            { opacity: 0.3, filter: 'blur(5px)' },
                            {
                                opacity: 1,
                                filter: 'blur(0px)',
                                duration: 1,
                                ease: 'power1.out',
                                scrollTrigger: {
                                    trigger: section,
                                    start: 'top 80%',
                                    end: 'top 50%',
                                    scrub: 0.5,
                                    toggleActions: 'play none none reverse'
                                },
                            }
                        );
                    }
                });
            }
        }, 350); // Wait for theme transition to complete

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [sectionsRef, darkMode]);

    return (
        <Wrapper>
            <HeroSection theme={darkMode ? 'dark' : 'light'} />
            <Section ref={el => sectionsRef.current[0] = el} theme={darkMode ? darkTheme : lightTheme}>
                <Skills />
            </Section>
            <Section ref={el => sectionsRef.current[1] = el} theme={darkMode ? darkTheme : lightTheme}>
                <Projects />
            </Section>
            <Section ref={el => sectionsRef.current[2] = el} theme={darkMode ? darkTheme : lightTheme}>
                <Contact />
            </Section>
        </Wrapper>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

    const sectionsRef = useRef([]);

    const toggleTheme = () => {
        // Kill all ScrollTrigger animations before theme change
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Make all sections visible immediately
        if (sectionsRef.current) {
            sectionsRef.current.forEach(section => {
                if (section) {
                    gsap.set(section, { opacity: 1, filter: 'blur(0px)' });
                }
            });
        }
        
        // Toggle theme
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        
        // Force a refresh of ScrollTrigger
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 350); // Match the transition duration
    }, [darkMode]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Router>
                <Navbar toggleTheme={toggleTheme} />
                <Body>
                    <Routes>
                        <Route path="/" element={
                            <Home darkMode={darkMode} toggleTheme={toggleTheme} sectionsRef={sectionsRef} />
                        } />
                        <Route path="/project/:id" element={<ProjectPage theme={darkMode ? 'dark' : 'light'} />} />
                        <Route path="/blog" element={<PostList />} />
                        <Route path="/blog/:postName" element={<PostPage theme={darkMode ? 'dark' : 'light'} />} />
                    </Routes>
                </Body>
                <Footer toggleTheme={toggleTheme} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
