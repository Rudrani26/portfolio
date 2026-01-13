import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="section-padding px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">Get In Touch</h2>

                    <div className="glass-card p-10 md:p-16 text-center">
                        <p className="about-text mb-10 max-w-2xl mx-auto transition-colors duration-500">
                            I'm always open to discussing new projects or opportunities. Feel free to reach out!
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {/* Primary Action */}
                            <motion.a
                                href="mailto:john.anderson@email.com"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary"
                            >
                                <FiMail className="w-5 h-5" />
                                <span>Email Me</span>
                            </motion.a>

                            {/* Secondary Actions */}
                            <motion.a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                            >
                                <FiGithub className="w-5 h-5" />
                                <span>GitHub</span>
                            </motion.a>

                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-secondary"
                            >
                                <FiLinkedin className="w-5 h-5" />
                                <span>LinkedIn</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;