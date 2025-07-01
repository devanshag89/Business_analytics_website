import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      const contactSection = document.getElementById('contact');
      
      if (homeSection && contactSection) {
        const homeRect = homeSection.getBoundingClientRect();
        const contactRect = contactSection.getBoundingClientRect();
        
        if (contactRect.top <= window.innerHeight / 2) {
          setActiveSection('contact');
        } else if (homeRect.top <= window.innerHeight / 2) {
          setActiveSection('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <div id="home">
        <Home scrollToSection={scrollToSection} />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default App;