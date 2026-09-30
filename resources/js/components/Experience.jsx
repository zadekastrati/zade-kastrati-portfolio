import { m, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Briefcase, Check } from 'lucide-react';
import { useRef } from 'react';
import { Reveal, SectionHeading, SpotlightCard, Tag } from './ui';

export default function Experience({ items }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
    const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section id="experience" className="relative py-32">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index="03"
                    eyebrow="Experience"
                    title={
                        <>
                            Professional <span className="text-accent">Experience</span>
                        </>
                    }
                    subtitle="Experience in quality assurance, software development and technical training."
                />

                <div ref={ref} className="relative">
                    {/* Timeline rail, drawn as you scroll */}
                    <div className="absolute top-0 bottom-0 left-4.75 w-px bg-black/6 md:left-6.75" />
                    <m.div
                        style={{ scaleY: lineScale }}
                        className="absolute top-0 bottom-0 left-4.75 w-px origin-top bg-accent md:left-6.75"
                    />

                    <div className="space-y-10">
                        {items.map((job, i) => (
                            <div key={job.company} className="relative pl-14 md:pl-20">
                                <Reveal delay={0.05} className="absolute top-6 left-0">
                                    <span className="relative grid size-10 place-items-center rounded-full border border-black/10 bg-subtle text-accent md:size-14">
                                        {job.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />}
                                        <Briefcase className="size-4 md:size-5" />
                                    </span>
                                </Reveal>

                                <Reveal delay={i * 0.05}>
                                    <SpotlightCard tilt={false}>
                                        <div className="p-7 md:p-9">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-2xl font-semibold">{job.role}</h3>
                                                    <p className="mt-1 text-lg">
                                                        {job.url ? (
                                                            <a
                                                                href={job.url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-accent inline-flex items-center gap-1 font-medium"
                                                            >
                                                                {job.company}
                                                                <ArrowUpRight className="size-4 text-accent" />
                                                            </a>
                                                        ) : (
                                                            <span className="text-accent font-medium">{job.company}</span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono text-sm text-ink-700">{job.period}</p>
                                                    <p className="text-sm text-ink-500">{job.location}</p>
                                                </div>
                                            </div>

                                            <p className="mt-5 text-ink-600">{job.summary}</p>

                                            <ul className="mt-6 space-y-3">
                                                {job.points.map((point) => (
                                                    <li key={point} className="flex gap-3 text-ink-700">
                                                        <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                                                            <Check className="size-3" />
                                                        </span>
                                                        <span className="leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-7 flex flex-wrap gap-2">
                                                {job.tags.map((t) => (
                                                    <Tag key={t}>{t}</Tag>
                                                ))}
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
