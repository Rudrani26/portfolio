import { useCallback, useEffect, useState } from 'react';
import { SkipLink } from './components/layout/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/layout/CommandPalette';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Toolbox } from './components/sections/Toolbox';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="rc-noise pointer-events-none fixed inset-0 z-0 opacity-[0.025]" aria-hidden="true" />

      <SkipLink />
      <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenCommandPalette={openPalette} />

      <main id="main-content" className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <Toolbox />
        <About />
        <Contact />
      </main>

      <Footer />

      <CommandPalette open={paletteOpen} onClose={closePalette} theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
