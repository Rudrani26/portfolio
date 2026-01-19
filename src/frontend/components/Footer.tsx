import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { content } from "./content";

const Footer: React.FC = () => {
    const { footer } = content;
    const year = new Date().getFullYear();

    const iconMap: Record<string, React.ReactNode> = {
        'Github': <FiGithub />,
        'Linkedin': <FiLinkedin />,
        'Mail': <FiMail />,
    };

    return (
        <footer className="footer-container transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-1">
                            {footer.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-500">
                            © {year} {footer.rights}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {footer.social.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.9 }}
                                className="footer-icon-link"
                            >
                                {iconMap[social.icon]}
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 font-medium">
                        {footer.techStack}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;