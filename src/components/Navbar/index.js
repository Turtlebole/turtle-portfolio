import React, { useState, useCallback } from 'react';
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
  ThemeButton,
  MobileNavLogo,
  MobileGitHubButton,
  MobileThemeButton,
  MobileButtonContainer
} from './NavbarStyledComponent';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import ThemeToggleIcon from '../Icons/ThemeToggleIcon';
import AnnouncementBanner from './AnnouncementBanner';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

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
          
          <MobileIcon onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <NavItems>
            <NavLink onClick={() => handleNavigation('/', '#skills')}>Skills</NavLink>
            <NavLink onClick={() => handleNavigation('/', '#projects')}>Projects</NavLink>
            <NavLink href='/blog'>Blog</NavLink>
          </NavItems>

          <ButtonContainer>
            <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
            <ThemeButton onClick={toggleTheme}>
              <ThemeToggleIcon />
            </ThemeButton>
          </ButtonContainer>

          <MobileMenu isOpen={isOpen}>
            <MobileNavLogo to='/' onClick={() => setIsOpen(false)}>
              <Span>
                Turtle<ColoredSpan>Bole</ColoredSpan>
              </Span>
            </MobileNavLogo>
            
            <MobileThemeButton onClick={toggleTheme}>
              <ThemeToggleIcon />
            </MobileThemeButton>
            
            <MobileLink onClick={() => { handleNavigation('/', '#skills'); setIsOpen(false); }}>
              Skills
            </MobileLink>
            
            <MobileLink onClick={() => { handleNavigation('/', '#projects'); setIsOpen(false); }}>
              Projects
            </MobileLink>
            
            <MobileLink href='/blog' onClick={() => setIsOpen(false)}>
              Blog
            </MobileLink>

            <MobileButtonContainer>
              <MobileGitHubButton href={Bio.github} target="_blank">
                Github
              </MobileGitHubButton>
            </MobileButtonContainer>
          </MobileMenu>
        </NavbarContainer>
      </Nav>
      <AnnouncementBanner />
    </>
  );
}

export default Navbar;
