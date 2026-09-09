import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { AlertCircle, Check, CheckCircle2, Copy, Mail, Send } from 'lucide-react';
import { contactContent, profile } from '../../data/portfolio';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = 'Please share your name.';
  else if (data.name.trim().length < 2) errors.name = 'That name looks a bit short — mind adding more?';

  if (!data.email.trim()) errors.email = 'Please add an email so I can reply.';
  else if (!EMAIL_REGEX.test(data.email)) errors.email = 'That email address doesn’t look valid.';

  if (!data.message.trim()) errors.message = 'Add a short message so I know what you’re reaching out about.';
  else if (data.message.trim().length < 10) errors.message = 'A few more words would help — what’s the opportunity or idea?';

  return errors;
}

const github = profile.social.find((s) => s.id === 'github')!;
const linkedin = profile.social.find((s) => s.id === 'linkedin')!;

export function Contact() {
  const reduced = useReducedMotion();
  const { copied, copy } = useCopyToClipboard();
  const [status, setStatus] = useState<Status>('idle');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
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
        contactContent.emailjs.serviceId,
        contactContent.emailjs.templateId,
        formData as unknown as Record<string, unknown>,
        contactContent.emailjs.publicKey,
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClasses =
    'w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted)';

  return (
    <section id="contact" data-debug-outline data-debug-label="Contact" className="rc-section">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
        <div>
          <SectionHeading eyebrow="Contact" title={contactContent.closingStatement} />

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => copy(profile.email)}
              className="rc-btn-secondary justify-start"
              aria-live="polite"
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? contactContent.emailCopiedLabel : profile.email}
            </button>

            <a href={github.href} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary justify-start">
              <GithubIcon size={16} />
              GitHub
            </a>
            <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="rc-btn-secondary justify-start">
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="rc-btn-secondary justify-start">
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rc-card space-y-5 p-6"
        >
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={inputClasses}
              style={{ borderColor: errors.name ? '#e5484d' : 'var(--color-border)' }}
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-[#e5484d]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={inputClasses}
              style={{ borderColor: errors.email ? '#e5484d' : 'var(--color-border)' }}
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-[#e5484d]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={`${inputClasses} resize-none`}
              style={{ borderColor: errors.message ? '#e5484d' : 'var(--color-border)' }}
            />
            {errors.message && (
              <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-[#e5484d]">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" disabled={status === 'sending'} className="rc-btn-primary w-full">
            {status === 'idle' && (
              <>
                <Send size={16} aria-hidden="true" /> Send message
              </>
            )}
            {status === 'sending' && 'Sending…'}
            {status === 'success' && (
              <>
                <CheckCircle2 size={16} aria-hidden="true" /> Sent — talk soon!
              </>
            )}
            {status === 'error' && (
              <>
                <AlertCircle size={16} aria-hidden="true" /> Something went wrong — try email instead
              </>
            )}
          </button>
          <p role="status" aria-live="polite" className="sr-only">
            {status === 'success' && 'Message sent successfully.'}
            {status === 'error' && 'Something went wrong sending your message.'}
          </p>
        </motion.form>
      </Container>
    </section>
  );
}
