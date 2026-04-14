import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('light', next === 'light');
      return next;
    });
  };

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {!loading && (
        <div className="min-h-screen bg-(--bg-primary) transition-colors duration-500">
          <CustomCursor />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
