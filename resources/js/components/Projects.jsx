import { ArrowUpRight } from 'lucide-react';
import { GithubIcon, Icon } from '../lib/icons';
import { Reveal, SectionHeading, SpotlightCard } from './ui';

// Each card cover gets its own soft pastel, cycling through the brand palette.
const coverTints = ['bg-lavender-blush', 'bg-mauve-mist', 'bg-silver-mist', 'bg-lilac-mist'];

function ProjectCard({ project, index }) {
    return (
        <SpotlightCard className="h-full">
            <div className="flex h-full flex-col">
                {/* Cover: pastel tint, grid texture and a large icon that takes the accent on hover */}
                <div className={`relative h-44 overflow-hidden border-b border-black/6 ${coverTints[index % coverTints.length]}`}>
                    <div className="bg-grid mask-radial absolute inset-0" />
                    <div className="absolute inset-0 grid place-items-center">
                        <span className="grid size-20 place-items-center rounded-2xl border border-black/10 bg-paper text-ink-700 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                            <Icon name={project.icon} className="size-9" strokeWidth={1.6} />
                        </span>
                    </div>
                    <span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] tracking-wider text-ink-800 uppercase backdrop-blur">
                        {project.category}
                    </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <span className="shrink-0 font-mono text-xs text-ink-500">{project.period}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((s) => (
                            <span key={s} className="rounded-md bg-black/4 px-2 py-0.5 font-mono text-[11px] text-ink-600">
                                {s}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2 border-t border-black/6 pt-5">
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-ink-700 transition hover:bg-black/6 hover:text-ink-900"
                        >
                            <GithubIcon className="size-4" /> Code
                        </a>
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
}

export default function Projects({ projects, github }) {
    return (
        <section id="projects" className="relative py-32">
            <div className="relative mx-auto max-w-6xl px-6">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading
                        index="04"
                        eyebrow="Projects"
                        title={
                            <>
                                Selected <span className="text-accent">Projects</span>
                            </>
                        }
                        subtitle="A selection of full stack applications covering real-time communication, authentication, payments, administrative dashboards and document generation."
                    />
                    <Reveal className="mb-14">
                        <a
                            href={github}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 text-sm text-ink-600 transition hover:text-ink-900"
                        >
                            <GithubIcon className="size-4" /> View all repositories
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </Reveal>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, i) => (
                        <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
                            <ProjectCard project={project} index={i} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
