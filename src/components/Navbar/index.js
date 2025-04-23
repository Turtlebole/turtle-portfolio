import React, { useState, useCallback, useEffect } from 'react';
import { 
  Nav, 
  NavLink, 
  NavbarContainer, 
  Span, 
  ColoredSpan, 
  NavLogo, 
  NavItems, 
  GitHubButton, 
  ButtonContainer, 
  MobileIcon, 
  MobileMenu, 
  MobileLink, 
  MobileNavLogo,
  MobileGitHubButton,
  MobileButtonContainer,
  ThemeButton,
  SettingsButton
} from './NavbarStyledComponent';
import { FaBars, FaTimes, FaMoon, FaSun, FaCog } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import AnnouncementBanner from './AnnouncementBanner';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import styled from 'styled-components';

const SettingsMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
`;

const Navbar = ({ toggleTheme, darkMode, currentTheme, setCurrentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen || isSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSettingsOpen]);

  const handleClickOutside = (event) => {
    // Handle clicks outside the mobile menu to close it
    if (isOpen && !event.target.closest('.mobile-menu') && 
        !event.target.closest('.hamburger-icon')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleScroll = useCallback((hash) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigation = useCallback((path, hash) => {
    navigate(path);
    setTimeout(() => handleScroll(hash), 100);
  }, [navigate, handleScroll]);

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'>
            <Span>
              Turtle<ColoredSpan>Bole</ColoredSpan>
            </Span>
          </NavLogo>
          
          <MobileIcon onClick={() => setIsOpen(!isOpen)} className="hamburger-icon">
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <NavItems>
            <NavLink onClick={() => handleNavigation('/', '#skills')}>Skills</NavLink>
            <NavLink onClick={() => handleNavigation('/', '#projects')}>Projects</NavLink>
            <NavLink href='/blog'>Blog</NavLink>
          </NavItems>

          <ButtonContainer>
            <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
            <ThemeButton onClick={toggleTheme} aria-label="Toggle dark mode">
              {darkMode ? <FaSun /> : <FaMoon />}
            </ThemeButton>
            <SettingsButton className="settings-button" onClick={() => setIsSettingsOpen(true)}>
              <FaCog />
            </SettingsButton>
          </ButtonContainer>

          <MobileMenu isOpen={isOpen} className="mobile-menu">
            <MobileNavLogo to='/' onClick={() => setIsOpen(false)}>
              <Span>
                Turtle<ColoredSpan>Bole</ColoredSpan>
              </Span>
            </MobileNavLogo>
            
            <MobileButtonContainer>
              <MobileGitHubButton href={Bio.github} target="_blank">
                Github
              </MobileGitHubButton>
              <ThemeButton onClick={toggleTheme} aria-label="Toggle dark mode">
                {darkMode ? <FaSun /> : <FaMoon />}
              </ThemeButton>
            </MobileButtonContainer>
            
            <MobileLink onClick={() => { handleNavigation('/', '#skills'); setIsOpen(false); }}>
              Skills
            </MobileLink>
            
            <MobileLink onClick={() => { handleNavigation('/', '#projects'); setIsOpen(false); }}>
              Projects
            </MobileLink>
            
            <MobileLink href='/blog' onClick={() => setIsOpen(false)}>
              Blog
            </MobileLink>
          </MobileMenu>
        </NavbarContainer>
      </Nav>
      <AnnouncementBanner />
      
      {/* Settings Menu */}
      <SettingsMenuContainer>
        <HamburgerMenu 
          isOpen={isSettingsOpen} 
          setIsOpen={setIsSettingsOpen}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />
      </SettingsMenuContainer>
    </>
  );
}

export default Navbar;
