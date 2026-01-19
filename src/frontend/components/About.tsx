import { motion } from 'framer-motion';
import { content } from './content';

const About: React.FC = () => {
    const { about } = content;

    return (
        <section id="about" className="section-padding px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="section-title">{about.title}</h2>

                    <div className="glass-card p-8 md:p-12">
                        <div className="space-y-6">
                            {about.paragraphs.map((para, index) => (
                                <p key={index} className="about-text transition-colors duration-500 text-slate-700 dark:text-slate-400">
                                    {para.text}
                                    {para.highlight && (
                                        <span className={`font-bold transition-colors ${index === 0 // Custom logic for different highlights styling if needed, or unify them
                                            ? 'text-indigo-700 dark:text-indigo-400'
                                            : 'text-slate-900 dark:text-slate-100 italic'
                                            }`}>
                                            {" "}{para.highlight}{" "}
                                        </span>
                                    )}
                                    {para.postHighlight}
                                </p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;