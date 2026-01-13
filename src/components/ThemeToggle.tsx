import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isRippling, setIsRippling] = useState(false);

    const handleToggle = () => {
        if (isRippling) return; // Prevent double clicks
        setIsRippling(true);
        toggleTheme();
        // Duration matches the CSS transition and the ripple animation
        setTimeout(() => setIsRippling(false), 800);
    };

    return (
        <>
            {/* Ripple Effect Overlay */}
            <AnimatePresence>
                {isRippling && (
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 50, opacity: 0 }} // Massive scale to cover screen
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed z-99 pointer-events-none rounded-full"
                        style={{
                            // Ensures the ripple starts from the button's center
                            bottom: '2rem',
                            right: '2rem',
                            width: '40px',
                            height: '40px',
                            background: theme === 'dark' ? '#6366f1' : '#facc15',
                            transformOrigin: 'center',
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggle}
                className="theme-toggle-btn"
                aria-label="Toggle Theme"
                style={{ zIndex: 110 }} // Stay above ripple
            >
                <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                        <motion.div
                            key="sun"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FiSun className="w-5 h-5 text-yellow-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FiMoon className="w-5 h-5 text-indigo-600" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
};

export default ThemeToggle;