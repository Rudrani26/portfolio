import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle, FiPhone, FiTag } from 'react-icons/fi';
import { content } from './content';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const { contact } = content;
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await emailjs.send(
                'service_q66axbl',   // replace with your EmailJS Service ID
                'template_5em4yaf',  // replace with your EmailJS Template ID
                formData,
                'Lw6RgWl0Zf8oAwlT5'    // replace with your EmailJS Public Key
            );

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputClasses = "w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600";
    const labelClasses = "block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300";

    return (
        <section id="contact" className="section-padding px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    {contact.title}
                </motion.h2>

                <div className="glass-card p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className={labelClasses}>{contact.form.nameLabel}</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder={contact.form.namePlaceholder}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClasses}>{contact.form.emailLabel}</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder={contact.form.emailPlaceholder}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className={labelClasses}>{contact.form.phoneLabel}</label>
                                <div className="relative">
                                    <FiPhone className="absolute top-3.5 left-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-10`}
                                        placeholder={contact.form.phonePlaceholder}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className={labelClasses}>{contact.form.subjectLabel}</label>
                                <div className="relative">
                                    <FiTag className="absolute top-3.5 left-4 text-slate-400" />
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-10`}
                                        placeholder={contact.form.subjectPlaceholder}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className={labelClasses}>{contact.form.messageLabel}</label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className={`${inputClasses} resize-none`}
                                placeholder={contact.form.messagePlaceholder}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white shadow-lg ${status === 'sending'
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-[1.01] active:scale-95'
                                }`}
                        >
                            {status === 'idle' && <><FiSend /> {contact.form.btnSend}</>}
                            {status === 'sending' && contact.form.btnSending}
                            {status === 'success' && <><FiCheckCircle /> {contact.form.btnSuccess}</>}
                            {status === 'error' && <><FiAlertCircle /> {contact.form.btnError}</>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
