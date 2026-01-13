import { motion } from 'framer-motion';
import { SiReact, SiTypescript, SiNodedotjs, SiPython, SiDocker, SiKubernetes, SiPostgresql, SiMongodb, SiAmazon, SiGit, SiTailwindcss } from 'react-icons/si';

const Skills: React.FC = () => {
    const skills = {
        Frontend: [
            { name: 'React', icon: <SiReact />, color: 'group-hover:text-[#61DAFB]' },
            { name: 'TypeScript', icon: <SiTypescript />, color: 'group-hover:text-[#3178C6]' },
            { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'group-hover:text-[#06B6D4]' },
        ],
        Backend: [
            { name: 'Node.js', icon: <SiNodedotjs />, color: 'group-hover:text-[#339933]' },
            { name: 'Python', icon: <SiPython />, color: 'group-hover:text-[#3776AB]' },
            { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'group-hover:text-[#4169E1]' },
            { name: 'MongoDB', icon: <SiMongodb />, color: 'group-hover:text-[#47A248]' },
        ],
        Tools: [
            { name: 'Docker', icon: <SiDocker />, color: 'group-hover:text-[#2496ED]' },
            { name: 'Kubernetes', icon: <SiKubernetes />, color: 'group-hover:text-[#326CE5]' },
            { name: 'AWS', icon: <SiAmazon />, color: 'group-hover:text-[#FF9900]' },
            { name: 'Git', icon: <SiGit />, color: 'group-hover:text-[#F05032]' },
        ],
    };

    return (
        <section id="skills" className="section-padding px-4 bg-slate-50/30 dark:bg-slate-900/10 transition-colors duration-500">
            <div className="max-w-6xl mx-auto">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title">
                    Technical Toolkit
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8"
                        >
                            <h3 className="text-xl font-bold mb-8 text-slate-800 dark:text-slate-100 flex items-center gap-3 transition-colors">
                                <span className="w-8 h-1 bg-indigo-500 rounded-full" />
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {items.map((skill) => (
                                    <motion.div key={skill.name} whileHover={{ y: -5 }} className="skill-tile group">
                                        <div className={`text-3xl mb-2 text-slate-400 transition-colors duration-300 ${skill.color}`}>
                                            {skill.icon}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;