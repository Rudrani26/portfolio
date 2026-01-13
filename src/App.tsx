import React from 'react';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './hooks/useTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {/* Background Noise/Texture Overlay - Fixed z-index to stay back */}
        <div className="fixed inset-0 z-0 bg-noise opacity-[0.03] pointer-events-none" />

        <Navbar />
        <ThemeToggle />

        <main className="relative z-10 scroll-smooth">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;