import { motion } from 'framer-motion';
import { content } from './content';

const Experience: React.FC = () => {
    const { experience } = content;

    return (
        <section id="experience" className="section-padding px-4 bg-slate-50/50 dark:bg-slate-950/20 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {experience.title}
                </motion.h2>

                {/* Timeline Line */}
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent transition-colors duration-500">
                    {experience.items.map((exp, idx) => (
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