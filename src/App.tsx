import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Research from './components/Research';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Noise/Texture Overlay - Fixed z-index to stay back */}
      <div className="fixed inset-0 z-0 bg-noise opacity-[0.03] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 scroll-smooth">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;