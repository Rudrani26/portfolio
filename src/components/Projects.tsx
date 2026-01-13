import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects: React.FC = () => {
    const projects = [
        { title: 'E-Commerce Platform', description: 'Full-stack solution with real-time inventory.', tech: ['React', 'Node.js', 'AWS'], github: '#', demo: '#', color: 'from-blue-500 to-cyan-500' },
        { title: 'Collaboration Tool', description: 'Workspace featuring real-time editing.', tech: ['TypeScript', 'WebRTC', 'Socket.io'], github: '#', demo: '#', color: 'from-purple-500 to-indigo-500' },
        { title: 'AI Analytics', description: 'ML platform providing predictive insights.', tech: ['Python', 'TensorFlow', 'FastAPI'], github: '#', demo: '#', color: 'from-orange-500 to-pink-500' },
        { title: 'Cloud Automation', description: 'Infrastructure as Code solution.', tech: ['Terraform', 'Kubernetes', 'Prometheus'], github: '#', demo: '#', color: 'from-emerald-500 to-teal-500' },
    ];

    return (
        <section id="projects" className="section-padding px-4">
            <div className="max-w-6xl mx-auto">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title">
                    Featured Projects
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card overflow-hidden group"
                        >
                            <div className={`h-48 w-full bg-linear-to-br ${project.color} opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 transition-colors">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((tech) => <span key={tech} className="badge">{tech}</span>)}
                                </div>
                                <div className="flex gap-6">
                                    <a href={project.github} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        <FiGithub /> <span>Source</span>
                                    </a>
                                    <a href={project.demo} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        <FiExternalLink /> <span>Demo</span>
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