import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import styled from "styled-components";
import Projects from "./components/Projects";
import ProjectPage from "./pages/ProjectPage/ProjectPage.js";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Navbar toggleTheme={toggleTheme} />
        <Body>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <Skills />
                <Projects setOpenModal={setOpenModal} />
                <Contact />
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
