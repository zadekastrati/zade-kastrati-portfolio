import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Lock, RotateCw, ShoppingBag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { GithubIcon, Icon } from '../lib/icons';
import { Button, Magnetic, Reveal, SectionHeading, SpotlightCard, Tag, ease } from './ui';

/** A stylised browser window showing the live store's storefront. */
function BrowserMockup({ project }) {
    const [slide, setSlide] = useState(0);
    const images = project.images;

    useEffect(() => {
        const id = setInterval(() => setSlide((s) => (s + 1) % images.length), 3200);
        return () => clearInterval(id);
    }, [images.length]);

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_50px_100px_-30px_rgba(28,29,33,0.6)]">
            {/* Chrome */}
            <div className="flex items-center gap-3 border-b border-white/6 bg-subtle/80 px-4 py-3">
                <div className="flex gap-1.5">
                    <span className="size-3 rounded-full bg-[#ff5f57]" />
                    <span className="size-3 rounded-full bg-[#febc2e]" />
                    <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-2 rounded-lg bg-paper/70 px-3 py-1.5 font-mono text-xs text-ink-400 transition hover:text-white"
                >
                    <Lock className="size-3 text-emerald-400" />
                    bone-active.com
                </a>
                <RotateCw className="size-3.5 text-ink-600" />
            </div>

            {/* Storefront */}
            <div className="bg-[#f4f2ef] text-neutral-900">
                <div className="flex items-center justify-between px-5 py-3">
                    <div className="hidden gap-4 text-[10px] font-medium tracking-wider text-neutral-500 uppercase sm:flex">
                        <span>Shop</span>
                        <span>Activity</span>
                        <span>About</span>
                    </div>
                    <img src={project.logo} alt="boné" className="h-4 sm:absolute sm:left-1/2 sm:-translate-x-1/2" />
                    <ShoppingBag className="size-4 text-neutral-700" />
                </div>

                <div className="relative mx-3 aspect-video overflow-hidden rounded-xl bg-neutral-300">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={images[slide].src}
                            src={images[slide].src}
                            alt={images[slide].label}
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.1, ease }}
                            className="absolute inset-0 size-full object-cover object-[center_35%]"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-5 text-white">
                        <p className="text-[9px] tracking-[0.25em] uppercase opacity-80">Built for movement</p>
                        <p className="font-display text-xl font-bold sm:text-2xl">Designed for you.</p>
                        <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-neutral-900">
                            Shop {images[slide].label}
                        </span>
                    </div>
                    <div className="absolute right-4 bottom-4 flex gap-1">
                        {images.map((img, i) => (
                            <span
                                key={img.src}
                                className={`h-1 rounded-full bg-white transition-all duration-500 ${i === slide ? 'w-5' : 'w-1.5 opacity-50'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 p-3">
                    {images.slice(0, 4).map((img) => (
                        <div key={img.src} className="group/tile overflow-hidden rounded-lg">
                            <div className="aspect-4/5 overflow-hidden bg-neutral-300">
                                <img
                                    src={img.src}
                                    alt={img.label}
                                    loading="lazy"
                                    className="size-full object-cover transition-transform duration-700 group-hover/tile:scale-110"
                                />
                            </div>
                            <p className="mt-1.5 truncate text-[9px] font-semibold tracking-wide uppercase sm:text-[10px]">{img.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Featured({ project }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const mockupY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const mockupRotate = useTransform(scrollYProgress, [0, 0.4], [8, 0]);
    const wordX = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);

    return (
        <section id="featured" ref={ref} className="relative px-3 py-16 sm:px-5">
            {/* Full-bleed cobalt panel: the one bold moment on an otherwise quiet page */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 1, ease }}
                className="relative overflow-hidden rounded-4xl bg-panel py-24 text-white sm:rounded-[2.75rem] sm:py-32"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(187,155,176,0.35),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(28,29,33,0.55),transparent_60%)]" />
                <div className="bg-grid-light mask-radial absolute inset-0" />

                {/* Giant drifting wordmark */}
                <motion.div
                    aria-hidden
                    style={{ x: wordX }}
                    className="pointer-events-none absolute top-10 left-0 font-display text-[22vw] leading-none font-bold whitespace-nowrap text-white/2.5 select-none"
                >
                    boné · boné · boné
                </motion.div>

                <div className="relative mx-auto max-w-6xl px-6">
                    <SectionHeading
                        tone="dark"
                        index="02"
                        eyebrow="Featured project"
                        title={
                            <>
                                boné: <span className="text-lilac-ash">Live E-Commerce Platform</span>
                            </>
                        }
                    />

                    <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
                        <div>
                            <Reveal>
                                <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-1.5 ring-1 ring-white/20">
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-lilac-ash opacity-75" />
                                        <span className="relative inline-flex size-2 rounded-full bg-lilac-ash" />
                                    </span>
                                    <span className="font-mono text-[11px] tracking-widest text-white uppercase">{project.kicker}</span>
                                </div>
                            </Reveal>
                            <Reveal delay={0.05}>
                                <div className="mb-6 block w-fit rounded-2xl bg-white px-5 py-3 shadow-[0_10px_30px_-10px_rgba(28,29,33,0.5)]">
                                    <img src={project.logo} alt="boné logo" className="h-8" />
                                </div>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <h3 className="text-2xl leading-snug font-semibold text-white sm:text-3xl">{project.headline}</h3>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 leading-relaxed text-white/75">{project.description}</p>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <dl className="mt-8 grid grid-cols-4 gap-2 rounded-2xl border border-white/15 bg-white/7 p-2">
                                    {project.metrics.map((m) => (
                                        <div key={m.label} className="flex flex-col-reverse rounded-xl px-2 py-3 text-center">
                                            <dt className="mt-1 text-[11px] text-white/60">{m.label}</dt>
                                            <dd className="font-display text-2xl font-semibold text-white">{m.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </Reveal>

                            <Reveal delay={0.25}>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Magnetic>
                                        <Button href={project.url} target="_blank" rel="noreferrer" variant="light">
                                            Visit bone-active.com
                                            <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                        </Button>
                                    </Magnetic>
                                    <Magnetic>
                                        <Button href={project.repo} target="_blank" rel="noreferrer" variant="outline">
                                            <GithubIcon className="size-4" /> Source
                                        </Button>
                                    </Magnetic>
                                </div>
                            </Reveal>
                        </div>

                        <motion.div style={{ y: mockupY, rotateX: mockupRotate, transformPerspective: 1400 }}>
                            <Reveal y={60}>
                                <BrowserMockup project={project} />
                            </Reveal>
                        </motion.div>
                    </div>

                    {/* What went into it */}
                    <div className="mt-28">
                        <Reveal>
                            <p className="mb-8 font-mono text-xs tracking-[0.2em] text-white/60 uppercase">Key features</p>
                        </Reveal>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {project.highlights.map((h, i) => (
                                <Reveal key={h.title} delay={i * 0.06} className="h-full">
                                    <SpotlightCard className="h-full" tilt={false} tone="dark">
                                        <div className="p-7">
                                            <span className="mb-5 grid size-11 place-items-center rounded-xl bg-white text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <Icon name={h.icon} className="size-5" />
                                            </span>
                                            <h4 className="text-lg font-semibold text-white">{h.title}</h4>
                                            <p className="mt-2.5 text-sm leading-relaxed text-white/70">{h.text}</p>
                                        </div>
                                    </SpotlightCard>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal delay={0.1}>
                            <div className="mt-8 flex flex-wrap gap-2">
                                {project.stack.map((s) => (
                                    <Tag key={s} className="border-white/20! bg-white/10! text-white/90!">
                                        {s}
                                    </Tag>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
