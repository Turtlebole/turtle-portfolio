import React from 'react';
import { Nav, NavLink, NavbarContainer, Span, ColoredSpan, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink, ThemeButton } from './NavbarStyledComponent';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import { ReactComponent as LightBulbIcon } from '../../images/light-bulb-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleScroll = (hash) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path, hash) => {
    navigate(path);
    setTimeout(() => handleScroll(hash), 100);
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <div style={{ display: "flex", alignItems: "center", color: "white", cursor: 'pointer' }}>
            <Span>
              Turtle<ColoredSpan>Bole</ColoredSpan>
            </Span>
          </div>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => {
            setIsOpen(!isOpen);
          }} />
        </MobileIcon>

        <ButtonContainer>
          <NavItems>
            <NavLink
              onClick={() => handleNavigation('/', '#skills')}
            >
              Skills
            </NavLink>
            <NavLink
              onClick={() => handleNavigation('/', '#projects')}
            >
              Projects
            </NavLink>
            <NavLink
              href='/blog'
            >
              Blog
            </NavLink>
            <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
            <ThemeButton onClick={toggleTheme}><LightBulbIcon /></ThemeButton>
          </NavItems>
        </ButtonContainer>
        {
          isOpen &&
          <MobileMenu isOpen={isOpen}>
            <MobileLink
              onClick={() => {
                handleNavigation('/', '#skills');
                setIsOpen(!isOpen);
              }}
            >
              Skills
            </MobileLink>
            <MobileLink
              onClick={() => {
                handleNavigation('/', '#projects');
                setIsOpen(!isOpen);
              }}
            >
              Projects
            </MobileLink>
            <MobileLink href='/blog' onClick={() => {
              setIsOpen(!isOpen);
            }}>Blog</MobileLink>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center' }}>
              <GitHubButton style={{ 
                padding: '10px 16px', 
                background: `${theme.bgLight}`, 
                color: `${theme.text_primary}`, 
                width: 'max-content',
                border: `1.8px solid ${theme.primary}` 
              }} href={Bio.github} target="_blank">
                Github
              </GitHubButton>

              <ThemeButton 
                onClick={() => {
                  toggleTheme();
                  setIsOpen(!isOpen);
                }} 
                style={{ 
                  padding: '10px 16px', 
                  background: `${theme.bgLight}`, 
                  color: `${theme.text_primary}`, 
                  borderRadius: '20px',
                  border: `1.8px solid ${theme.primary}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '14px',
                  width: 'max-content' 
                }}>
                <LightBulbIcon style={{ width: '20px', height: '20px' }} />
                <span style={{ marginLeft: '8px' }}>Theme</span>
              </ThemeButton>
            </div>
          </MobileMenu>
        }
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;
