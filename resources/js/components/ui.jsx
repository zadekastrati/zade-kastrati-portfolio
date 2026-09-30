import { animate, m, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const ease = [0.22, 1, 0.36, 1];

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
    const Component = m[as];
    return (
        <Component
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay, ease }}
        >
            {children}
        </Component>
    );
}

export function SectionHeading({ index, eyebrow, title, subtitle, className = '', tone = 'light' }) {
    const onColor = tone === 'dark';
    return (
        <div className={`mb-14 max-w-2xl ${className}`}>
            <Reveal>
                <p
                    className={`mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase ${onColor ? 'text-white/80' : 'text-accent'}`}
                >
                    <span className={onColor ? 'text-white/50' : 'text-ink-400'}>{index}</span>
                    <span className={`h-px w-8 ${onColor ? 'bg-white/40' : 'bg-accent/50'}`} />
                    {eyebrow}
                </p>
            </Reveal>
            <Reveal delay={0.08}>
                <h2 className={`text-4xl font-semibold sm:text-5xl ${onColor ? 'text-white' : ''}`}>{title}</h2>
            </Reveal>
            {subtitle && (
                <Reveal delay={0.16}>
                    <p className={`mt-5 text-lg leading-relaxed ${onColor ? 'text-white/75' : 'text-ink-600'}`}>{subtitle}</p>
                </Reveal>
            )}
        </div>
    );
}

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ value, suffix = '', duration = 2 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration,
            ease,
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value, duration]);

    return (
        <span ref={ref}>
            {display.toLocaleString('en-US')}
            {suffix}
        </span>
    );
}

/** Pulls its child slightly toward the cursor. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.2 });
    const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.2 });

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <m.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} className={`inline-block ${className}`}>
            {children}
        </m.div>
    );
}

/**
 * A card with a cursor-following spotlight and a subtle 3D tilt.
 * Tilt is skipped on touch devices, where there is no hover.
 */
export function SpotlightCard({ children, className = '', tilt = true, tone = 'light' }) {
    const onColor = tone === 'dark';
    const ref = useRef(null);
    const mx = useMotionValue(-500);
    const my = useMotionValue(-500);
    const rx = useSpring(0, { stiffness: 150, damping: 18 });
    const ry = useSpring(0, { stiffness: 150, damping: 18 });

    const background = useTransform(
        [mx, my],
        ([x, y]) =>
            `radial-gradient(420px circle at ${x}px ${y}px, ${onColor ? 'rgb(187 155 176 / 0.12)' : 'rgb(133 104 137 / 0.06)'}, transparent 70%)`,
    );
    const border = useTransform(
        [mx, my],
        ([x, y]) =>
            `radial-gradient(300px circle at ${x}px ${y}px, ${onColor ? 'rgb(187 155 176 / 0.8)' : 'rgb(133 104 137 / 0.5)'}, transparent 70%)`,
    );

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mx.set(x);
        my.set(y);
        if (tilt) {
            ry.set((x / rect.width - 0.5) * 7);
            rx.set(-(y / rect.height - 0.5) * 7);
        }
    };
    const onLeave = () => {
        mx.set(-500);
        my.set(-500);
        rx.set(0);
        ry.set(0);
    };

    return (
        <m.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className={`group relative rounded-3xl ${className}`}
        >
            {/* Gradient border revealed under the cursor */}
            <m.div
                aria-hidden
                style={{ background: border }}
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div
                className={`relative h-full overflow-hidden rounded-3xl border ${
                    // Solid fills, so the glowing border layer behind the card only shows at its edge
                    onColor ? 'border-white/10 bg-[#25262b]' : 'border-black/7 bg-surface'
                }`}
            >
                <m.div aria-hidden style={{ background }} className="pointer-events-none absolute inset-0" />
                <div className="relative h-full">{children}</div>
            </div>
        </m.div>
    );
}

export function Tag({ children, className = '' }) {
    return (
        <span
            className={`inline-flex items-center rounded-full border border-black/8 bg-black/3 px-3 py-1 font-mono text-[11px] text-ink-700 ${className}`}
        >
            {children}
        </span>
    );
}

export function Button({ as = 'a', variant = 'primary', className = '', children, ...props }) {
    const Component = as;
    const base =
        'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60';
    const variants = {
        primary:
            'bg-accent text-white shadow-[0_10px_30px_-10px_rgba(133,104,137,0.7)] hover:bg-accent-hover hover:shadow-[0_14px_36px_-10px_rgba(133,104,137,0.85)]',
        ghost: 'glass text-ink-900 hover:bg-black/7 hover:border-black/20',
        // For use on the cobalt panel
        light: 'bg-white text-accent shadow-[0_10px_30px_-10px_rgba(28,29,33,0.5)] hover:bg-accent-soft',
        outline: 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
    };
    return (
        <Component className={`${base} ${variants[variant]} ${className}`} {...props}>
            {(variant === 'primary' || variant === 'light') && (
                <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                />
            )}
            <span className="relative inline-flex items-center gap-2">{children}</span>
        </Component>
    );
}
