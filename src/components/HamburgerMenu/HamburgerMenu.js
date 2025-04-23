import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaMoon, FaSun, FaCheck } from 'react-icons/fa';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  z-index: 1000;
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.text_primary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const MenuPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${({ theme }) => theme.bgLight};
  height: 100vh;
  width: 300px;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  z-index: 1001;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90%;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 2rem 1rem;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
`;

const MenuTitle = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  margin: 0;
`;

const MenuSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary}30;
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
`;

const ThemeOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid ${({ theme, active }) => active ? theme.primary : 'transparent'};
  box-shadow: ${({ active, theme }) => active ? `0 0 10px ${theme.primary}40` : '0 2px 5px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ThemePreview = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  margin-bottom: 6px;
`;

const PreviewSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: ${props => props.bg};
  background-image: ${props => props.gradient || 'none'};
`;

const PreviewAccent = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.color};
  background-image: ${props => props.gradient || 'none'};
`;

const PreviewHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: ${props => props.color};
  background-image: ${props => props.gradient || 'none'};
`;

const ThemeName = styled.span`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 12px;
  margin-top: 2px;
  text-align: center;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 2;
  font-size: 10px;
`;

const ModeSwitch = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.card_light};
  border-radius: 30px;
  padding: 5px;
  margin-top: 1rem;
`;

const ModeOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.card_light : theme.text_primary};

  svg {
    margin-right: 6px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ open }) => open ? 'block' : 'none'};
  z-index: 999;
  backdrop-filter: blur(2px);
`;

const HamburgerMenu = ({ darkMode, toggleTheme, currentTheme, setCurrentTheme, isOpen, setIsOpen }) => {
  // Use isOpen and setIsOpen props if provided, otherwise use local state
  const [localOpen, setLocalOpen] = useState(false);
  
  // Determine which state to use (props or local)
  const open = isOpen !== undefined ? isOpen : localOpen;
  const setOpen = setIsOpen || setLocalOpen;
  
  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.menu-panel') && !event.target.closest('.settings-button')) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, setOpen]);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  // Theme data for previews with added gradients
  const themeData = {
    default: {
      name: 'Amber',
      lightBg: '#FFF8E7',
      darkBg: '#2B1E1E',
      lightAccent: '#D4A373',
      darkAccent: '#D4A373'
    },
    blue: {
      name: 'Blue',
      lightBg: '#E6F1FF',
      darkBg: '#0A192F',
      lightAccent: '#0A192F',
      darkAccent: '#64FFDA'
    },
    green: {
      name: 'Green',
      lightBg: '#F1F8E9',
      darkBg: '#1A2E1A',
      lightAccent: '#2E7D32',
      darkAccent: '#4CAF50'
    },
    purple: {
      name: 'Purple',
      lightBg: '#F5F0FF',
      darkBg: '#1A1A2E',
      lightAccent: '#6A1B9A',
      darkAccent: '#8A2BE2'
    },
    coral: {
      name: 'Coral',
      lightBg: '#FFF5F3',
      darkBg: '#2D2424',
      lightAccent: '#E64A19',
      darkAccent: '#FF7F50'
    },
    // Gradient themes
    sunset: {
      name: 'Sunset',
      lightBg: '#FFFFFF',
      darkBg: '#1A1A1A',
      lightAccent: '#FF5E62',
      darkAccent: '#FF9966',
      lightGradient: 'linear-gradient(135deg, #FF9966, #FF5E62)',
      darkGradient: 'linear-gradient(135deg, #FF9966, #FF5E62)'
    },
    ocean: {
      name: 'Ocean',
      lightBg: '#F5F7FA',
      darkBg: '#151E3F',
      lightAccent: '#0575E6',
      darkAccent: '#00F260',
      lightGradient: 'linear-gradient(135deg, #0575E6, #021B79)',
      darkGradient: 'linear-gradient(135deg, #00F260, #0575E6)'
    },
    aurora: {
      name: 'Aurora',
      lightBg: '#FFFFFF',
      darkBg: '#13151A',
      lightAccent: '#43CEA2',
      darkAccent: '#A8E063',
      lightGradient: 'linear-gradient(135deg, #43CEA2, #185A9D)',
      darkGradient: 'linear-gradient(135deg, #A8E063, #43CEA2)'
    }
  };

  return (
    <MenuContainer>
      {/* Only show the hamburger icon if we're using local state (no external control) */}
      {!setIsOpen && (
        <HamburgerIcon open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </HamburgerIcon>
      )}
      
      <Overlay open={open} onClick={() => setOpen(false)} />
      
      <MenuPanel open={open} className="menu-panel">
        <MenuHeader>
          <MenuTitle>Theme Settings</MenuTitle>
          <CloseButton onClick={() => setOpen(false)}>
            <FaTimes />
          </CloseButton>
        </MenuHeader>
        
        <MenuSection>
          <SectionTitle>Display Mode</SectionTitle>
          <ModeSwitch>
            <ModeOption active={!darkMode} onClick={toggleTheme}>
              <FaSun /> Light
            </ModeOption>
            <ModeOption active={darkMode} onClick={toggleTheme}>
              <FaMoon /> Dark
            </ModeOption>
          </ModeSwitch>
        </MenuSection>
        
        <MenuSection>
          <SectionTitle>Choose Theme</SectionTitle>
          <ThemeGrid>
            {Object.entries(themeData).map(([key, theme]) => (
              <ThemeOption 
                key={key}
                active={currentTheme === key} 
                onClick={() => handleThemeChange(key)}
              >
                {currentTheme === key && (
                  <ActiveIndicator>
                    <FaCheck size={10} />
                  </ActiveIndicator>
                )}
                <ThemePreview>
                  <PreviewHeader 
                    color={darkMode ? theme.darkAccent : theme.lightAccent}
                    gradient={darkMode ? theme.darkGradient : theme.lightGradient} 
                  />
                  <PreviewSection 
                    bg={darkMode ? theme.darkBg : theme.lightBg} 
                  />
                  <PreviewAccent 
                    color={darkMode ? theme.darkAccent : theme.lightAccent}
                    gradient={darkMode ? theme.darkGradient : theme.lightGradient}
                  />
                </ThemePreview>
                <ThemeName>{theme.name}</ThemeName>
              </ThemeOption>
            ))}
          </ThemeGrid>
        </MenuSection>
      </MenuPanel>
    </MenuContainer>
  );
};

export default HamburgerMenu; 