import { AnimatePresence, m } from 'framer-motion';
import { Check, CheckCircle2, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { GithubIcon, LinkedinIcon } from '../lib/icons';
import { Button, Reveal, SectionHeading } from './ui';

const empty = { name: '', email: '', subject: '', message: '', website: '' };

// Mirrors the server rule in StoreContactMessageRequest, for instant feedback.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validate(form) {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Please enter your name.';
    if (!form.email.trim()) errors.email = 'Please enter your email address.';
    else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Please enter a valid email address, like name@example.com.';
    if (!form.message.trim()) errors.message = 'Please write a message.';
    else if (form.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters long.';
    return errors;
}

function Field({ label, error, as = 'input', ...props }) {
    const Component = as;
    return (
        <label className="block">
            <span className="mb-2 block text-sm text-ink-600">{label}</span>
            <Component
                {...props}
                className={`w-full rounded-xl border bg-surface/80 px-4 py-3 text-ink-900 placeholder-ink-400 transition outline-none focus:ring-4 ${
                    error
                        ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/15'
                        : 'border-black/8 focus:border-accent/60 focus:ring-accent/15'
                } ${as === 'textarea' ? 'min-h-36 resize-y' : ''}`}
            />
            {error && <span className="mt-1.5 block text-xs text-rose-600">{error}</span>}
        </label>
    );
}

export default function Contact({ profile }) {
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [serverMessage, setServerMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const update = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        // Clear a field's error as soon as the visitor starts fixing it
        if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest);
    };

    // Check a field when the visitor leaves it (only once they've typed something)
    const check = (key) => () => {
        if (!form[key].trim()) return;
        const message = validate(form)[key];
        if (message) setErrors((e) => ({ ...e, [key]: message }));
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const clientErrors = validate(form);
        if (Object.keys(clientErrors).length) {
            setErrors(clientErrors);
            return;
        }

        setStatus('sending');
        setErrors({});

        try {
            const res = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                setStatus('sent');
                setServerMessage(data.message);
                setForm(empty);
                return;
            }
            if (res.status === 422) {
                setErrors(Object.fromEntries(Object.entries(data.errors ?? {}).map(([k, v]) => [k, v[0]])));
                setStatus('idle');
                return;
            }
            setServerMessage(
                res.status === 429 ? 'Too many messages. Please wait a minute and try again.' : 'Something went wrong. Please email me directly.',
            );
            setStatus('error');
        } catch {
            setServerMessage('Network error. Please email me directly.');
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden py-32">
            <div className="bg-grid mask-radial absolute inset-0 opacity-60" />

            <div className="relative mx-auto max-w-6xl px-6">
                <SectionHeading
                    index="06"
                    eyebrow="Contact"
                    title={
                        <>
                            Get in <span className="text-accent">Touch</span>
                        </>
                    }
                    subtitle="I am open to full stack development and quality assurance positions, as well as project collaborations. Please feel free to contact me using the form below or through any of the listed channels."
                />

                <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
                    <Reveal>
                        <div className="space-y-3">
                            <button
                                onClick={copyEmail}
                                className="group glass flex w-full items-center gap-4 rounded-2xl p-5 text-left transition hover:bg-black/6"
                            >
                                <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent">
                                    <Mail className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-xs text-ink-500">Email</span>
                                    <span className="block truncate text-ink-900">{profile.email}</span>
                                </span>
                                <span className="text-ink-500 transition group-hover:text-ink-900">
                                    {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
                                </span>
                            </button>
                            <a
                                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                                className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:bg-black/6"
                            >
                                <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent">
                                    <Phone className="size-5" />
                                </span>
                                <span>
                                    <span className="block text-xs text-ink-500">Phone</span>
                                    <span className="block text-ink-900">{profile.phone}</span>
                                </span>
                            </a>
                            <div className="glass flex items-center gap-4 rounded-2xl p-5">
                                <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent">
                                    <MapPin className="size-5" />
                                </span>
                                <span>
                                    <span className="block text-xs text-ink-500">Based in</span>
                                    <span className="block text-ink-900">{profile.location}</span>
                                </span>
                            </div>
                            <div className="flex gap-3 pt-3">
                                <a
                                    href={profile.socials.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl p-4 text-sm text-ink-700 transition hover:bg-black/6 hover:text-ink-900"
                                >
                                    <GithubIcon className="size-4" /> GitHub
                                </a>
                                <a
                                    href={profile.socials.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glass flex flex-1 items-center justify-center gap-2 rounded-2xl p-4 text-sm text-ink-700 transition hover:bg-black/6 hover:text-ink-900"
                                >
                                    <LinkedinIcon className="size-4" /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
                            <AnimatePresence mode="wait">
                                {status === 'sent' ? (
                                    <m.div
                                        key="sent"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex min-h-104 flex-col items-center justify-center text-center"
                                    >
                                        <m.span
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                                            className="mb-6 grid size-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"
                                        >
                                            <CheckCircle2 className="size-10" />
                                        </m.span>
                                        <h3 className="text-2xl font-semibold">Message sent</h3>
                                        <p className="mt-2 text-ink-600">{serverMessage} I will respond as soon as possible.</p>
                                        <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-accent hover:text-accent">
                                            Send another message
                                        </button>
                                    </m.div>
                                ) : (
                                    <m.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="space-y-5" noValidate>
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field label="Name" value={form.name} onChange={update('name')} error={errors.name} placeholder="Jane Doe" autoComplete="name" required />
                                            <Field
                                                label="Email"
                                                type="email"
                                                value={form.email}
                                                onChange={update('email')}
                                                onBlur={check('email')}
                                                error={errors.email}
                                                placeholder="jane@company.com"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>
                                        <Field label="Subject" value={form.subject} onChange={update('subject')} error={errors.subject} placeholder="Employment opportunity, project inquiry, collaboration" />
                                        <Field
                                            as="textarea"
                                            label="Message"
                                            value={form.message}
                                            onChange={update('message')}
                                            onBlur={check('message')}
                                            error={errors.message}
                                            placeholder="Please describe your inquiry"
                                            required
                                        />
                                        {/* Honeypot: hidden from people, tempting to bots */}
                                        <input
                                            type="text"
                                            name="website"
                                            value={form.website}
                                            onChange={update('website')}
                                            tabIndex={-1}
                                            autoComplete="off"
                                            className="hidden"
                                            aria-hidden="true"
                                        />

                                        {status === 'error' && (
                                            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700">{serverMessage}</p>
                                        )}

                                        <Button as="button" type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
                                            {status === 'sending' ? (
                                                <>
                                                    <Loader2 className="size-4 animate-spin" /> Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send message <Send className="size-4 transition-transform group-hover/btn:translate-x-1" />
                                                </>
                                            )}
                                        </Button>
                                    </m.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
