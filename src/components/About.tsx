import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <section id="about" className="section-padding px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="section-title">About Me</h2>

                    <div className="glass-card p-8 md:p-12">
                        <div className="space-y-6">
                            <p className="about-text transition-colors duration-500">
                                I'm a passionate <span className="text-indigo-600 dark:text-indigo-400 font-semibold transition-colors">software engineer</span> with over 5 years of experience building web applications and distributed systems.
                            </p>

                            <p className="about-text transition-colors duration-500">
                                My expertise spans modern JavaScript frameworks, cloud infrastructure, and DevOps practices. I believe in writing <span className="italic text-slate-900 dark:text-slate-100 transition-colors">clean, maintainable code</span> and following best practices.
                            </p>

                            <p className="about-text transition-colors duration-500">
                                When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or exploring new technologies.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;