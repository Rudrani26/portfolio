import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { navItems, profile } from '../../data/portfolio';
import { scrollToSection } from '../../lib/scroll';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Theme } from '../../hooks/useTheme';
import { ThemeToggle } from '../interactions/ThemeToggle';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
}

export function Navbar({ theme, onToggleTheme, onOpenCommandPalette }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const activeId = useActiveSection(navItems.map((item) => item.href.replace('#', '')));

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-md">
      <nav className="rc-container flex h-16 items-center justify-between" aria-label="Primary">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
          style={{ fontFamily: 'var(--font-heading)', backgroundColor: 'var(--color-accent-lime)', color: '#0d0f0e' }}
          aria-label={`${profile.name} — back to top`}
        >
          {profile.initials}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className="relative px-3.5 py-2 text-sm font-medium transition-colors"
                  style={{ color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-3.5 -bottom-px h-px"
                      style={{ backgroundColor: 'var(--color-accent-lime)' }}
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-full border border-(--color-border) px-3 py-2 text-xs text-(--color-text-muted) transition-colors hover:text-(--color-text)"
            aria-label="Open command palette"
          >
            <Command size={14} aria-hidden="true" />
            <kbd className="rc-kbd">Ctrl K</kbd>
          </button>
          <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary !px-4 !py-2 text-sm">
            Résumé
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) text-(--color-text)"
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? undefined : { height: 0, opacity: 0 }}
            animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-(--color-border) md:hidden"
          >
            <ul className="rc-container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="block min-h-[44px] py-3 text-base font-medium text-(--color-text)"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rc-btn-secondary mt-2 w-full !py-3 text-sm"
                >
                  Résumé
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="rc-btn-ghost mt-1 w-full !py-3 text-sm"
                >
                  <Command size={14} aria-hidden="true" /> Command palette
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
