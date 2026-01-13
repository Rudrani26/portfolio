import { motion } from 'framer-motion';

const Experience: React.FC = () => {
    const experiences = [
        {
            company: 'Tech Innovations Inc.',
            role: 'Senior Software Engineer',
            period: '2022 - Present',
            description: 'Leading development of microservices architecture and mentoring junior developers. Reduced deployment time by 60% through CI/CD improvements.',
            highlights: ['Microservices', 'Team Leadership', 'DevOps'],
        },
        {
            company: 'Digital Solutions Corp.',
            role: 'Full Stack Developer',
            period: '2020 - 2022',
            description: 'Built and maintained customer-facing web applications serving 100K+ users. Implemented real-time features and optimized performance.',
            highlights: ['React', 'Node.js', 'Performance Optimization'],
        },
        {
            company: 'StartupX',
            role: 'Software Engineer',
            period: '2019 - 2020',
            description: 'Developed MVP for SaaS platform from ground up. Collaborated with product team to define technical requirements and architecture.',
            highlights: ['MVP Development', 'Full Stack', 'Agile'],
        },
    ];

    return (
        <section id="experience" className="section-padding px-4 bg-slate-50/50 dark:bg-slate-950/20 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Professional Journey
                </motion.h2>

                {/* Timeline Line with Theme-Aware Colors */}
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent transition-colors duration-500">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 md:p-8 relative group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg transition-colors duration-300">
                                        {exp.company}
                                    </p>
                                </div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 h-fit transition-colors duration-500">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-3xl transition-colors duration-500">
                                {exp.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {exp.highlights.map((highlight) => (
                                    <span key={highlight} className="badge">
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;