import { ThemeProvider } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { 
    darkTheme, lightTheme, 
    blueDarkTheme, blueLightTheme,
    greenDarkTheme, greenLightTheme,
    purpleDarkTheme, purpleLightTheme,
    coralDarkTheme, coralLightTheme,
    sunsetDarkTheme, sunsetLightTheme,
    oceanDarkTheme, oceanLightTheme,
    auroraDarkTheme, auroraLightTheme
} from './utils/Themes.js';
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
import SectionDivider from "./components/SectionDivider";

gsap.registerPlugin(ScrollTrigger);

// Add global styles to ensure all elements transition smoothly
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overscroll-behavior-y: none; /* Prevents bounce effects on some browsers */
  }
  
  html {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
  }

  section {
    margin: 0;
    padding: 0;
  }

  /* Improve theme transitions */
  .theme-transition {
    transition: all 0.3s ease !important;
  }
  
  /* Apply this to all elements during theme transition */
  .theme-transition * {
    transition: all 0.3s ease !important;
  }
  
  /* Prevent FOUC and ensure sections transition smoothly */
  #root {
    background-color: ${({ theme }) => theme.bg};
    transition: background-color 0.3s ease;
  }
  
  /* Section background transition */
  section, 
  [class*="Section"], 
  [class*="Container"],
  [class*="Wrapper"] {
    background-color: ${({ theme }) => theme.bg};
    transition: background-color 0.3s ease, opacity 0.5s ease, transform 0.5s ease;
  }
`;

const Body = styled.div`
    width: 100%;
    overflow-x: hidden;
    transition: all 0.3s ease;
`;

const Wrapper = styled.div`
    width: 100%;
    transition: all 0.3s ease;
    position: relative;
`;

const Section = styled.div`
    padding: 60px 0 40px; 
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    transition: opacity 0.5s ease, transform 0.5s ease;
    
    &:first-of-type {
        padding-top: 80px; 
    }
    
    @media screen and (max-width: 768px) {
        padding: 50px 0 30px;
    }
    
    @media screen and (max-width: 480px) {
        padding: 40px 0 20px;
    }
`;

// Navigation dots
const NavigationDots = styled.div`
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 100;
    padding: 15px 10px;
    background: ${({ theme }) => theme.bg}40;
    backdrop-filter: blur(8px);
    border-radius: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const NavDot = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    border: 2px solid ${({ theme, active }) => active ? theme.primary : theme.text_primary + '80'};
    display: flex;
    align-items: center;
    
    &:hover {
        transform: scale(1.2);
        background: ${({ theme, active }) => active ? theme.primary : theme.primary + '50'};
    }

    &::before {
        content: attr(title);
        position: absolute;
        right: calc(100% + 15px);
        top: 50%;
        transform: translateY(-50%);
        background: ${({ theme }) => theme.card};
        color: ${({ theme }) => theme.text_primary};
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        opacity: ${({ active }) => active ? 1 : 0};
        visibility: ${({ active }) => active ? 'visible' : 'hidden'};
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        border-left: 3px solid ${({ theme }) => theme.primary};
        letter-spacing: 0.5px;
    }

    &:hover::before {
        opacity: 1;
        visibility: visible;
    }
`;

const SectionLabel = styled.span`
    position: fixed;
    right: 80px;
    top: 50%;
    transform: translateY(-50%) translateX(0);
    font-size: 48px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    opacity: 0.04;
    letter-spacing: 2px;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    pointer-events: none;
    
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

// Function to get current theme based on mode and theme name
const getTheme = (isDarkMode, themeName) => {
    switch(themeName) {
        case 'blue':
            return isDarkMode ? blueDarkTheme : blueLightTheme;
        case 'green':
            return isDarkMode ? greenDarkTheme : greenLightTheme;
        case 'purple':
            return isDarkMode ? purpleDarkTheme : purpleLightTheme;
        case 'coral':
            return isDarkMode ? coralDarkTheme : coralLightTheme;
        case 'sunset':
            return isDarkMode ? sunsetDarkTheme : sunsetLightTheme;
        case 'ocean':
            return isDarkMode ? oceanDarkTheme : oceanLightTheme;
        case 'aurora':
            return isDarkMode ? auroraDarkTheme : auroraLightTheme;
        default: // 'default'
            return isDarkMode ? darkTheme : lightTheme;
    }
};

function Home({ darkMode, currentTheme, sectionsRef }) {
    const [activeSection, setActiveSection] = useState('hero');
    const wheelTimerRef = useRef(null);
    const isScrollingRef = useRef(false);
    const transitionTimeoutRef = useRef(null);
    
    useEffect(() => {
        // Add theme transition class to body when theme changes
        document.body.classList.add('theme-transition');
        
        // Clear any existing ScrollTrigger animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Short delay to ensure theme transition completes first
        const timer = setTimeout(() => {
            document.body.classList.remove('theme-transition');
            
            if (sectionsRef.current) {
                // Make sure sections are visible first
                sectionsRef.current.forEach(section => {
                    if (section) {
                        // Reset initial state to be visible
                        gsap.set(section, { opacity: 1, filter: 'blur(0px)' });
                        
                        // Then apply a gentler scroll animation
                        gsap.fromTo(section,
                            { opacity: 0.7, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6, // Faster animation
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: section,
                                    start: 'top 85%',
                                    end: 'top 60%',
                                    scrub: 0.2, // More responsive scrubbing
                                    toggleActions: 'play none none reverse'
                                },
                            }
                        );
                    }
                });
            }
        }, 300); // Faster theme transition
        
        // Setup scroll tracking for active section
        const handleScroll = () => {
            const heroSection = document.getElementById('hero');
            const skillsSection = document.getElementById('skills');
            const projectsSection = document.getElementById('projects');
            const contactSection = document.getElementById('contact');
            
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            if (heroSection && scrollPosition < skillsSection.offsetTop) {
                setActiveSection('hero');
            } else if (skillsSection && scrollPosition >= skillsSection.offsetTop && 
                scrollPosition < projectsSection.offsetTop) {
                setActiveSection('skills');
            } else if (projectsSection && scrollPosition >= projectsSection.offsetTop && 
                scrollPosition < contactSection.offsetTop) {
                setActiveSection('projects');
            } else if (contactSection && scrollPosition >= contactSection.offsetTop) {
                setActiveSection('contact');
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once to set initial active section
        
        // Enhanced wheel event handling for section-by-section scrolling
        const handleWheel = (e) => {
            // Prevent default behavior for smoother control
            e.preventDefault();
            
            // Prevent handling if already scrolling
            if (isScrollingRef.current) return;
            
            // Clear any existing timer
            if (wheelTimerRef.current) {
                clearTimeout(wheelTimerRef.current);
            }
            
            wheelTimerRef.current = setTimeout(() => {
                const heroSection = document.getElementById('hero');
                const skillsSection = document.getElementById('skills');
                const projectsSection = document.getElementById('projects');
                const contactSection = document.getElementById('contact');
                
                const sections = [heroSection, skillsSection, projectsSection, contactSection];
                const currentIndex = sections.findIndex(section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                });
                
                if (currentIndex !== -1) {
                    // Determine scroll direction
                    const direction = e.deltaY > 0 ? 1 : -1;
                    const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
                    
                    if (targetIndex !== currentIndex) {
                        isScrollingRef.current = true;
                        
                        // Create cross-fade effect
                        sections.forEach((section, idx) => {
                            if (idx === targetIndex) {
                                gsap.to(section, { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.4,
                                    ease: 'power2.out'
                                });
                            } else if (idx === currentIndex) {
                                gsap.to(section, { 
                                    opacity: 0.5, 
                                    y: direction * -20,
                                    duration: 0.4,
                                    ease: 'power2.in'
                                });
                            }
                        });
                        
                        // Scroll to target section
                        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
                        
                        // Reset the scrolling flag after animation completes
                        setTimeout(() => {
                            isScrollingRef.current = false;
                            sections.forEach(section => {
                                gsap.set(section, { clearProps: 'opacity,y' });
                            });
                        }, 700); // Match scroll duration
                    }
                }
            }, 50); // More responsive wheel detection
        };
        
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            clearTimeout(timer);
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            if (wheelTimerRef.current) {
                clearTimeout(wheelTimerRef.current);
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            document.body.classList.remove('theme-transition');
        };
    }, [sectionsRef, darkMode, currentTheme]);

    // Navigate to section when clicking a dot
    const navigateToSection = (sectionId) => {
        // Prevent if already scrolling
        if (isScrollingRef.current) return;
        
        const section = document.getElementById(sectionId);
        if (section) {
            isScrollingRef.current = true;
            
            // Get current visible section
            const currentVisibleSection = document.elementFromPoint(
                window.innerWidth / 2, 
                window.innerHeight / 2
            ).closest('section');
            
            if (currentVisibleSection && currentVisibleSection.id !== sectionId) {
                // Create cross-fade effect
                gsap.to(currentVisibleSection, { 
                    opacity: 0.5, 
                    y: section.offsetTop < currentVisibleSection.offsetTop ? 20 : -20,
                    duration: 0.4,
                    ease: 'power2.in'
                });
                
                gsap.fromTo(section,
                    { opacity: 0.5, y: currentVisibleSection.offsetTop < section.offsetTop ? 20 : -20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                );
            }
            
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Reset the scrolling flag after animation completes
            setTimeout(() => {
                isScrollingRef.current = false;
                
                // Reset opacity and transform
                if (currentVisibleSection) {
                    gsap.set(currentVisibleSection, { clearProps: 'opacity,y' });
                }
                gsap.set(section, { clearProps: 'opacity,y' });
            }, 700);
        }
    };

    // Get current theme object
    const theme = getTheme(darkMode, currentTheme);
    
    // Get section name for the label
    const getSectionName = () => {
        switch(activeSection) {
            case 'hero':
                return 'Home';
            case 'skills':
                return 'Skills';
            case 'projects':
                return 'Projects';
            case 'contact':
                return 'Contact';
            default:
                return '';
        }
    };

    return (
        <Wrapper>
            <HeroSection theme={darkMode ? 'dark' : 'light'} themeObject={theme} />
            
            {/* Section label */}
            <SectionLabel>{getSectionName()}</SectionLabel>
            
            {/* Navigation Dots */}
            <NavigationDots>
                <NavDot 
                    active={activeSection === 'hero'} 
                    onClick={() => navigateToSection('hero')}
                    title="Home"
                />
                <NavDot 
                    active={activeSection === 'skills'} 
                    onClick={() => navigateToSection('skills')}
                    title="Skills"
                />
                <NavDot 
                    active={activeSection === 'projects'} 
                    onClick={() => navigateToSection('projects')}
                    title="Projects"
                />
                <NavDot 
                    active={activeSection === 'contact'} 
                    onClick={() => navigateToSection('contact')}
                    title="Contact"
                />
            </NavigationDots>
            
            {/* Section divider between hero and skills */}
            <SectionDivider theme={theme} />
            
            <Section id="skills" ref={el => sectionsRef.current[0] = el}>
                <Skills />
            </Section>
            
            {/* Section divider between skills and projects */}
            <SectionDivider theme={theme} />
            
            <Section id="projects" ref={el => sectionsRef.current[1] = el}>
                <Projects />
            </Section>
            
            {/* Section divider between projects and contact */}
            <SectionDivider theme={theme} />
            
            <Section id="contact" ref={el => sectionsRef.current[2] = el}>
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

    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('themeName');
        return savedTheme || 'default';
    });

    const sectionsRef = useRef([]);

    const toggleTheme = () => {
        // Add theme transition class before toggling theme
        document.documentElement.classList.add('theme-transition');
        document.body.classList.add('theme-transition');
        
        // Kill all ScrollTrigger animations before theme change
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Pre-apply background color to all sections to prevent flashing
        if (sectionsRef.current) {
            const nextTheme = !darkMode;
            const themeToApply = getTheme(nextTheme, currentTheme);
            
            // Pre-transition all sections and containers
            sectionsRef.current.forEach(section => {
                if (section) {
                    gsap.set(section, { 
                        backgroundColor: themeToApply.bg,
                        opacity: 1, 
                        filter: 'blur(0px)' 
                    });
                }
            });
            
            // Also transition any other section or container elements
            document.querySelectorAll('section, [class*="Section"], [class*="Container"], [class*="Wrapper"]')
                .forEach(el => {
                    gsap.set(el, { backgroundColor: themeToApply.bg });
                });
        }
        
        // Toggle theme
        setDarkMode(prevMode => !prevMode);
        
        // Remove the transition class after theme change completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
            document.body.classList.remove('theme-transition');
        }, 300);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        localStorage.setItem('themeName', currentTheme);
        
        // Add theme transition class when theme changes
        document.documentElement.classList.add('theme-transition');
        document.body.classList.add('theme-transition');
        
        // Apply theme background color to all sections and containers
        const currentThemeObj = getTheme(darkMode, currentTheme);
        document.querySelectorAll('section, [class*="Section"], [class*="Container"], [class*="Wrapper"]')
            .forEach(el => {
                gsap.set(el, { backgroundColor: currentThemeObj.bg });
            });
        
        // Force a refresh of ScrollTrigger
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
            document.body.classList.remove('theme-transition');
            ScrollTrigger.refresh();
        }, 300); // Match the transition duration
    }, [darkMode, currentTheme]);

    // Get current theme object
    const theme = getTheme(darkMode, currentTheme);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Navbar 
                    toggleTheme={toggleTheme} 
                    darkMode={darkMode}
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                />
                <Body>
                    <Routes>
                        <Route path="/" element={
                            <Home 
                                darkMode={darkMode} 
                                currentTheme={currentTheme}
                                sectionsRef={sectionsRef} 
                            />
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
