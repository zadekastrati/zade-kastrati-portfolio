import { AnimatePresence, m, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Bug, GraduationCap, Layers } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { GithubIcon, LinkedinIcon } from '../lib/icons';
import { Button, Counter, Magnetic, ease } from './ui';

/**
 * Crossfades between roles. Every role is stacked in the same grid cell, and the
 * longest one sizes the box, so there is never an empty line or layout jump.
 */
function RotatingRole({ roles }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
        return () => clearInterval(id);
    }, [roles.length]);

    const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), '');

    return (
        <span className="relative inline-grid overflow-hidden align-bottom">
            <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{longest}</span>
            <AnimatePresence initial={false}>
                <m.span
                    key={roles[index]}
                    initial={{ y: '70%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-70%', opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="col-start-1 row-start-1 whitespace-nowrap text-accent"
                >
                    {roles[index]}
                </m.span>
            </AnimatePresence>
        </span>
    );
}

// Letters rise into place but are visible from the first frame (no mask, no opacity),
// so the heading counts as painted immediately for Largest Contentful Paint.
function SplitWord({ text, delay = 0 }) {
    return (
        <span className="inline-block pb-2 align-bottom">
            {text.split('').map((char, i) => (
                <m.span
                    key={i}
                    className="inline-block"
                    initial={{ y: '0.3em' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
                >
                    {char}
                </m.span>
            ))}
        </span>
    );
}

const tileMotion = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

/** One bento tile: staggers in with its siblings and lifts slightly on hover. */
function Tile({ className = '', children, as = 'div', ...props }) {
    const Component = m[as];
    return (
        <Component
            variants={tileMotion}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`relative overflow-hidden rounded-3xl p-5 shadow-[0_14px_40px_-20px_rgba(28,29,33,0.3)] ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}

function Label({ children, className = '' }) {
    return <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${className}`}>{children}</p>;
}

/** "At a glance" bento: current role, QA count, the live store, stack and degree. */
function Bento({ profile, featured, job, degree }) {
    const qa = profile.stats[0];
    const photo = featured.images[2] ?? featured.images[0];

    return (
        <div className="relative">
            {/* Soft glow behind the grid */}
            <div className="animate-drift absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(162,136,166,0.35),transparent_60%)] blur-3xl" />
            <div className="animate-drift-reverse absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_75%_75%,rgba(210,165,168,0.3),transparent_60%)] blur-3xl" />

            <m.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } } }}
                className="relative grid grid-cols-2 gap-3 sm:grid-cols-5"
            >
                {/* Current role */}
                <Tile className="order-1 col-span-2 border border-black/6 bg-surface sm:col-span-3">
                    <Label className="flex items-center gap-2 text-ink-500">
                        <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                        </span>
                        Now
                    </Label>
                    <h3 className="mt-4 text-xl leading-tight font-semibold">{job.role}</h3>
                    <a
                        href={job.url ?? '#experience'}
                        target={job.url ? '_blank' : undefined}
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                        @ {job.company} <ArrowUpRight className="size-3.5" />
                    </a>
                    <p className="mt-3 text-xs text-ink-500">Since {job.period.split('–')[0].trim()}</p>
                </Tile>

                {/* QA count: the one coloured tile */}
                <Tile className="order-2 col-span-1 bg-accent text-white sm:col-span-2">
                    <Bug className="absolute top-5 right-5 size-5 text-white/50" />
                    <Label className="text-white/70">Quality</Label>
                    <p className="mt-4 font-display text-4xl leading-none font-semibold">
                        <Counter value={qa.value} suffix={qa.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-white/80">{qa.label}</p>
                </Tile>

                {/* boné, live */}
                <Tile as="a" href="#featured" className="group order-4 col-span-2 flex items-center sm:order-3 sm:col-span-5 gap-5 bg-panel p-3 pr-6 text-white">
                    <img
                        src={photo.mini}
                        srcSet={`${photo.mini} 192w, ${photo.thumb} 480w`}
                        sizes="96px"
                        alt=""
                        width="96"
                        height="96"
                        className="size-24 shrink-0 rounded-2xl object-cover object-[center_30%]"
                    />
                    <div className="min-w-0 flex-1">
                        <span className="inline-block rounded-md bg-white px-2 py-1">
                            <img src={featured.logo} alt="boné" width="38" height="14" className="h-3.5 w-auto" />
                        </span>
                        <p className="mt-2.5 text-sm font-medium">Live e-commerce platform · Lead developer</p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
                            <span className="relative flex size-1.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lilac-ash opacity-75" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-lilac-ash" />
                            </span>
                            bone-active.com
                        </p>
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-white/50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </Tile>

                {/* Stack */}
                <Tile className="order-5 col-span-2 border border-black/6 bg-surface sm:order-4 sm:col-span-3">
                    <Label className="flex items-center gap-2 text-ink-500">
                        <Layers className="size-3.5" /> Core stack
                    </Label>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {profile.core_stack.map((s) => (
                            <span key={s} className="rounded-lg bg-subtle px-2.5 py-1 text-xs font-medium text-ink-700">
                                {s}
                            </span>
                        ))}
                    </div>
                </Tile>

                {/* Degree */}
                <Tile className="order-3 col-span-1 border border-black/6 bg-lavender-blush sm:order-5 sm:col-span-2">
                    <GraduationCap className="size-5 text-accent" />
                    <p className="mt-4 text-sm leading-snug font-semibold text-ink-900">{degree.title}</p>
                    <p className="mt-1 text-xs text-ink-500">UBT College · {degree.period.split('–').pop().trim().split('/').pop()}</p>
                </Tile>
            </m.div>
        </div>
    );
}

export default function Hero({ profile, featured, experience, education }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const [first, ...rest] = profile.name.split(' ');
    const job = experience.find((e) => e.current) ?? experience[0];
    const degree = education.find((e) => e.type === 'degree') ?? education[0];

    const fade = (delay) => ({
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.8, ease },
    });
    // For the largest text blocks: movement only, never hidden, so they paint straight away.
    const rise = (delay) => ({
        initial: { y: 16 },
        animate: { y: 0 },
        transition: { delay, duration: 0.8, ease },
    });

    return (
        <section id="top" ref={ref} className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-24">
            <div className="bg-grid mask-radial absolute inset-0 opacity-70" />

            <m.div
                style={{ y: contentY }}
                className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
            >
                <div>
                    <m.div {...fade(0)} className="mb-8 flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-3.5 py-1.5 text-xs text-ink-700 backdrop-blur">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                                <span className="relative inline-flex size-2 rounded-full bg-accent" />
                            </span>
                            Open to new opportunities · {profile.location}
                        </span>
                    </m.div>

                    <h1 className="text-[3.4rem] leading-[0.95] font-bold tracking-[-0.04em] sm:text-7xl lg:text-[5.25rem]">
                        <SplitWord text={first} delay={0.15} /> <SplitWord text={rest.join(' ')} delay={0.3} />
                    </h1>

                    <m.p {...rise(0.3)} className="mt-5 font-display text-2xl font-medium text-ink-800 sm:text-[1.9rem]">
                        <RotatingRole roles={profile.roles} />
                    </m.p>

                    <m.p {...rise(0.4)} className="mt-6 max-w-lg text-lg leading-relaxed text-ink-600">
                        {profile.tagline}
                    </m.p>

                    <m.div {...fade(1)} className="mt-9 flex flex-wrap items-center gap-3">
                        <Magnetic>
                            <Button href="#featured">
                                View featured project
                                <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </Button>
                        </Magnetic>
                        <Magnetic>
                            <Button href="#contact" variant="ghost">
                                Contact me
                            </Button>
                        </Magnetic>
                        <div className="flex items-center">
                            <a
                                href={profile.socials.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="grid size-11 place-items-center rounded-full text-ink-600 transition hover:bg-black/5 hover:text-ink-900"
                            >
                                <GithubIcon />
                            </a>
                            <a
                                href={profile.socials.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="grid size-11 place-items-center rounded-full text-ink-600 transition hover:bg-black/5 hover:text-ink-900"
                            >
                                <LinkedinIcon />
                            </a>
                        </div>
                    </m.div>
                </div>

                <Bento profile={profile} featured={featured} job={job} degree={degree} />
            </m.div>
        </section>
    );
}
