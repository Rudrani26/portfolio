import React from 'react';
import Navbar from './frontend/components/Navbar';
import Hero from './frontend/components/Hero';
import About from './frontend/components/About';
import Skills from './frontend/components/Skills';
import Projects from './frontend/components/Projects';
import Experience from './frontend/components/Experience';
import Contact from './frontend/components/Contact';
import Footer from './frontend/components/Footer';
import Research from './frontend/components/Research';

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