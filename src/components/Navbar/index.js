import React, { useState, useCallback } from 'react';
import { 
    Nav, 
    NavLink, 
    NavbarContainer, 
    NavLogo, 
    NavItems, 
    ButtonContainer, 
    MobileIcon, 
    MobileMenu, 
    MobileLink, 
    ThemeButton
} from './NavbarStyledComponent';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import ThemeToggleIcon from '../Icons/ThemeToggleIcon';
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
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <span>DJ Nightmare Spins</span>
        </NavLogo>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </MobileIcon>

        <ButtonContainer>
          <NavItems>
            <NavLink onClick={() => handleNavigation('/', '#events')}>Događaji</NavLink>
            <NavLink onClick={() => handleNavigation('/', '#music')}>Radio</NavLink>
            <NavLink onClick={() => handleNavigation('/', '#gallery')}>Highlight</NavLink>
            <NavLink onClick={() => handleNavigation('/gallery', '#')}>Galerija</NavLink>
            <ThemeButton onClick={toggleTheme}>
              <ThemeToggleIcon />
            </ThemeButton>
          </NavItems>
        </ButtonContainer>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink onClick={() => { handleNavigation('/', '#events'); setIsOpen(!isOpen); }}>Događaji</MobileLink>
            <MobileLink onClick={() => { handleNavigation('/', '#music'); setIsOpen(!isOpen); }}>Radio</MobileLink>
            <MobileLink onClick={() => { handleNavigation('/', '#gallery'); setIsOpen(!isOpen); }}>Highlight</MobileLink>
            <MobileLink onClick={() => { handleNavigation('/gallery', '#'); setIsOpen(!isOpen); }}>Galerija</MobileLink>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center' }}>
              <ThemeButton 
                onClick={() => { 
                  toggleTheme(); 
                  setIsOpen(!isOpen); 
                }}
              >
                <ThemeToggleIcon />
              </ThemeButton>
            </div>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;
