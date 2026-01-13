import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            {/* Animated Background Blobs - Reduced opacity for dark mode */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Available for new opportunities
                    </motion.span>

                    <motion.h1
                        className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            John Anderson
                        </span>
                    </motion.h1>

                    <motion.h2
                        className="text-2xl md:text-4xl font-medium text-slate-700 dark:text-slate-300 mb-8 transition-colors duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Senior Software Engineer
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        Building elegant, scalable solutions with modern technologies.
                        I turn complex problems into <span className="text-slate-900 dark:text-white font-medium transition-colors">simple, functional software.</span>
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <motion.a href="#projects" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="btn-primary px-10">
                            View Projects
                        </motion.a>
                        <motion.a href="#contact" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="btn-secondary px-10">
                            Get in Touch
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;