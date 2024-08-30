import React from 'react'
//removed MobileNavLogo
import { Nav, NavLink, NavbarContainer, Span, ColoredSpan, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink, ThemeButton } from './NavbarStyledComponent'
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/constants';
// import { CloseRounded } from '@mui/icons-material';
import { useTheme } from 'styled-components';
import { ReactComponent as LightBulbIcon } from '../../images/light-bulb-svgrepo-com.svg';

const Navbar = ({toggleTheme}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme()
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
            setIsOpen(!isOpen)
          }} />
        </MobileIcon>
       
        <ButtonContainer>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href='#skills'>Skills</NavLink>
          <NavLink href='#projects'>Projects</NavLink>
          <NavLink href='/blog'>Blog</NavLink>
          <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
          <ThemeButton onClick={toggleTheme}><LightBulbIcon></LightBulbIcon></ThemeButton>
          </NavItems>
        </ButtonContainer>
        {
          isOpen &&
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => {
              setIsOpen(!isOpen)
            }}>About</MobileLink>
            <MobileLink href='#skills' onClick={() => {
              setIsOpen(!isOpen)
            }}>Skills</MobileLink>
            <MobileLink href='#projects' onClick={() => {
              setIsOpen(!isOpen)
            }}>Projects</MobileLink>
            <MobileLink href='/blog' onClick={() => {
              setIsOpen(!isOpen)
            }}>Blog</MobileLink>
          
            <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href={Bio.github} target="_blank">Github Profile</GitHubButton>
          </MobileMenu>
        }
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar