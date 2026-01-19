import { motion } from 'framer-motion';
import {
    SiReact,
    SiReactivex,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiPython,
    SiSpringboot,
    SiFastapi,
    SiMysql,
    SiMongodb,
    SiDocker,
    SiAmazon,
    SiGit,
    SiHtml5,
    SiCss3,
} from 'react-icons/si';
import { FaBrain, FaJava } from 'react-icons/fa';
import { content } from './content';

const Skills: React.FC = () => {
    const { skills } = content;

    /**
     * Skill name → icon map
     * IMPORTANT: Keys MUST match content.skills.categories[*].name exactly
     */
    const iconMap: Record<string, React.ReactNode> = {
        // ─── Programming Languages ───
        Java: <FaJava />,
        Python: <SiPython />,
        SQL: <SiMysql />,
        TypeScript: <SiTypescript />,
        JavaScript: <SiJavascript />,
        Bash: <SiGit />,

        // ─── Backend & Distributed Systems ───
        'Spring Boot': <SiSpringboot />,
        FastAPI: <SiFastapi />,
        'Node.js': <SiNodedotjs />,
        'RESTful APIs': <FaBrain />,
        'Microservices Architecture': <FaBrain />,
        'Distributed Systems': <FaBrain />,

        // ─── Frontend & Mobile ───
        ReactJS: <SiReact />,
        'React Native': <SiReactivex />,
        HTML: <SiHtml5 />,
        CSS: <SiCss3 />,
        'Responsive Design': <FaBrain />,
        'Component-Based UI': <FaBrain />,

        // ─── Databases & Data Engineering ───
        MySQL: <SiMysql />,
        MongoDB: <SiMongodb />,
        'Database Design': <FaBrain />,
        'Query Optimization': <FaBrain />,
        Indexing: <FaBrain />,
        'Transaction Management': <FaBrain />,

        // ─── Cloud, DevOps & Infrastructure ───
        'AWS EC2': <SiAmazon />,
        'AWS S3': <SiAmazon />,
        'AWS Lambda': <SiAmazon />,
        Docker: <SiDocker />,
        'CI/CD Pipelines': <FaBrain />,
        Git: <SiGit />,

        // ─── Machine Learning & AI Systems ───
        'Large Language Models (LLaMA 3)': <FaBrain />,
        'ML Inference Pipelines': <FaBrain />,
        'Speech Recognition (Wav2Vec2)': <FaBrain />,
        'Text-to-Speech (VITS)': <FaBrain />,
        'Computer Vision (VGG16 / VGG19)': <FaBrain />,
        XGBoost: <FaBrain />,
    };

    return (
        <section
            id="skills"
            className="section-padding px-4 bg-slate-50/50 dark:bg-slate-900/10 transition-colors duration-500"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {skills.title}
                </motion.h2>

                {/* Skill Categories */}
                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(skills.categories).map(([category, items], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-8"
                        >
                            <h3 className="text-xl font-bold mb-8 text-slate-900 dark:text-slate-100 flex items-center gap-3">
                                <span className="w-8 h-1 bg-indigo-500 rounded-full" />
                                {category}
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                {items.map((skill) => {
                                    const icon = iconMap[skill.name] ?? <FaBrain />;

                                    return (
                                        <motion.div
                                            key={skill.name}
                                            whileHover={{ y: -5 }}
                                            className="skill-tile group"
                                        >
                                            <div
                                                className={`text-3xl mb-2 text-slate-500 dark:text-slate-400 transition-colors duration-300 ${skill.color}`}
                                            >
                                                {icon}
                                            </div>

                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
