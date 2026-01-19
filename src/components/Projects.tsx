import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { content } from './content';

const FireParticles = () => {
    const count = 20; // fixed count

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(count)].map((_, i) => {
                const size = Math.random() * 6 + 3; // 3px-9px
                const startX = Math.random() * 100; // Random horizontal start
                const duration = Math.random() * 3 + 2; // 2s-5s
                const delay = Math.random() * 2; // 0-2s delay
                const drift = (Math.random() - 0.5) * 60; // -30 to +30 drift

                return (
                    <div
                        key={i}
                        className="fire-particle"
                        style={{
                            left: `${startX}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                            '--drift': `${drift}px`,
                        } as React.CSSProperties}
                    />
                );
            })}
        </div>
    );
};

const Projects: React.FC = () => {
    const { projects } = content;

    return (
        <section id="projects" className="section-padding px-4">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {projects.title}
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.items.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card overflow-hidden group relative"
                        >
                            {/* Header with fire particles if needed */}
                            <div
                                className={`relative h-48 w-full bg-linear-to-br ${project.color} opacity-20 dark:opacity-30`}
                            >
                                {project.animation === 'fire' && <FireParticles />}
                            </div>

                            {/* Content */}
                            <div className="p-8 relative z-10">
                                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                                    {project.title}
                                </h3>
                                <p className="text-slate-700 dark:text-slate-400 mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-6">
                                    <a
                                        href={project.github}
                                        className="flex items-center gap-2 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                                    >
                                        <FiGithub /> <span>Source</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
