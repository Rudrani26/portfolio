import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { content } from "./content";

const Research: React.FC = () => {
    const { research } = content;

    return (
        <section id="research" className="section-padding px-4">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {research.title}
                </motion.h2>

                <div className="space-y-6">
                    {research.items.map((paper, idx) => (
                        <motion.div
                            key={paper.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8"
                        >
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                                {paper.title}
                            </h3>

                            <p className="text-slate-700 dark:text-slate-400 mb-3 leading-relaxed">
                                {paper.description}
                            </p>

                            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                                {paper.venue}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {paper.tags.map((tag) => (
                                    <span key={tag} className="badge">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                            >
                                <FiExternalLink />
                                <span>Read Publication</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
