import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiSend,
    FiCheckCircle,
    FiAlertCircle,
    FiPhone,
    FiTag
} from 'react-icons/fi';
import { content } from './content';
import emailjs from '@emailjs/browser';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+\-()\s]{7,20}$/;

const Contact: React.FC = () => {
    const { contact } = content;

    const [status, setStatus] = useState<Status>('idle');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (data: FormData): FormErrors => {
        const errors: FormErrors = {};

        if (!data.name.trim()) {
            errors.name = 'Don’t be shy - tell me your name 🙂';
        } else if (data.name.length < 2) {
            errors.name = 'That name feels a bit too short… got more letters?';
        }

        if (!data.email.trim()) {
            errors.email = 'I’d love to reply - drop your email here 📧';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Hmm… that email doesn’t look quite right 🤔';
        }

        if (data.phone && !phoneRegex.test(data.phone)) {
            errors.phone = 'This number seems a little suspicious 📞';
        }

        if (!data.subject.trim()) {
            errors.subject = 'Give me a hint - what’s this about?';
        } else if (data.subject.length < 3) {
            errors.subject = 'A bit more detail, please 🙂';
        }

        if (!data.message.trim()) {
            errors.message = 'You can’t leave me hanging - say something! ✨';
        } else if (data.message.length < 10) {
            errors.message = 'That’s a teaser… mind adding a few more words?';
        }

        return errors;
    };


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus('sending');

        try {
            await emailjs.send(
                'service_q66axbl',
                'template_5em4yaf',
                formData as unknown as Record<string, unknown>,
                'Lw6RgWl0Zf8oAwlT5'
            );

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setErrors({});
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputClasses =
        'w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-hidden transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600';

    const labelClasses =
        'block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300';

    const errorText = 'mt-1 text-sm text-red-500';

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
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Jane Doe'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className={errorText}>{errors.name}</p>}
                            </div>

                            <div>
                                <label className={labelClasses}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='janedoe@gmail.com'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className={errorText}>{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Phone (Optional)</label>
                                <div className="relative">
                                    <FiPhone className="absolute top-3.5 left-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        placeholder='+1 123 456-7890'
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.phone && <p className={errorText}>{errors.phone}</p>}
                            </div>

                            <div>
                                <label className={labelClasses}>Subject</label>
                                <div className="relative">
                                    <FiTag className="absolute top-3.5 left-4 text-slate-400" />
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder='Opportunity/Collaboration'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`${inputClasses} pl-10 ${errors.subject ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.subject && <p className={errorText}>{errors.subject}</p>}
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>Message</label>
                            <textarea
                                name="message"
                                placeholder='Write your message here...'
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className={`${inputClasses} resize-none ${errors.message ? 'border-red-500' : ''}`}
                            />
                            {errors.message && <p className={errorText}>{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white shadow-lg ${status === 'sending'
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-[1.01] active:scale-95'
                                }`}
                        >
                            {status === 'idle' && <><FiSend /> Send Message</>}
                            {status === 'sending' && 'Sending...'}
                            {status === 'success' && <><FiCheckCircle /> Sent Successfully</>}
                            {status === 'error' && <><FiAlertCircle /> Something went wrong</>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
