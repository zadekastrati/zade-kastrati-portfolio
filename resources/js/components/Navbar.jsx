import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ease } from './ui';

const links = [
    { id: 'about', label: 'About' },
    { id: 'featured', label: 'boné' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar({ name, photo }) {
    const [photoOk, setPhotoOk] = useState(true);
    const [active, setActive] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' },
        );
        links.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    return (
        <>
            <m.div
                style={{ scaleX: progress }}
                className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
            />
            <m.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="fixed inset-x-0 top-3 z-40 px-4"
            >
                <nav
                    className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
                        scrolled ? 'border border-black/8 bg-paper/95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] backdrop-blur-xl' : 'border border-transparent'
                    }`}
                >
                    <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
                        {photoOk ? (
                            <img
                                src={photo}
                                width="36"
                                height="36"
                                alt=""
                                onError={() => setPhotoOk(false)}
                                className="size-9 rounded-full object-cover object-top ring-2 ring-accent/30 transition group-hover:ring-accent"
                            />
                        ) : (
                            <span className="grid size-9 place-items-center rounded-xl bg-accent font-display text-sm font-bold text-white">
                                ZK
                            </span>
                        )}
                        <span className="hidden font-display font-semibold text-ink-900 sm:block">{name}</span>
                    </a>

                    <ul className="hidden items-center gap-1 md:flex">
                        {links.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={`#${link.id}`}
                                    className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                                        active === link.id ? 'text-ink-900' : 'text-ink-600 hover:text-ink-900'
                                    }`}
                                >
                                    <span
                                        className={`absolute inset-0 rounded-full bg-black/8 transition-all duration-300 ${
                                            active === link.id ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                                        }`}
                                    />
                                    <span className="relative">{link.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="#contact"
                        className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover md:block"
                    >
                        Contact me
                    </a>

                    <button
                        onClick={() => setOpen(true)}
                        className="grid size-10 place-items-center rounded-full text-ink-800 hover:bg-black/10 md:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="size-5" />
                    </button>
                </nav>
            </m.header>

            <AnimatePresence>
                {open && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-paper/95 backdrop-blur-xl md:hidden"
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full text-ink-800 hover:bg-black/10"
                            aria-label="Close menu"
                        >
                            <X className="size-6" />
                        </button>
                        <ul className="flex h-full flex-col items-center justify-center gap-3">
                            {links.map((link, i) => (
                                <m.li
                                    key={link.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i, ease, duration: 0.5 }}
                                >
                                    <a
                                        href={`#${link.id}`}
                                        onClick={() => setOpen(false)}
                                        className="font-display text-4xl font-semibold text-ink-800 hover:text-accent"
                                    >
                                        {link.label}
                                    </a>
                                </m.li>
                            ))}
                        </ul>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
