import { motion } from 'framer-motion';
import { Icon } from '../lib/icons';
import { Reveal, SectionHeading, SpotlightCard, ease } from './ui';

export default function Skills({ skills }) {
    return (
        <section id="skills" className="relative py-32">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index="05"
                    eyebrow="Skills"
                    title={
                        <>
                            Technical <span className="text-accent">Skills</span>
                        </>
                    }
                />

                <div className="grid gap-5 md:grid-cols-2">
                    {skills.map((group, gi) => (
                        <Reveal key={group.group} delay={gi * 0.08} className="h-full">
                            <SpotlightCard className="h-full">
                                <div className="p-8">
                                    <div className="mb-6 flex items-center gap-3">
                                        <span className="grid size-10 place-items-center rounded-xl bg-black/5 text-accent ring-1 ring-black/10">
                                            <Icon name={group.icon} className="size-5" />
                                        </span>
                                        <h3 className="text-xl font-semibold">{group.group}</h3>
                                        <span className="ml-auto font-mono text-xs text-ink-400">
                                            {String(group.items.length).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <motion.ul
                                        className="flex flex-wrap gap-2"
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, margin: '-60px' }}
                                        variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
                                    >
                                        {group.items.map((item) => (
                                            <motion.li
                                                key={item}
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                                                    show: { opacity: 1, scale: 1, y: 0, transition: { ease, duration: 0.5 } },
                                                }}
                                                whileHover={{ y: -3 }}
                                                className="cursor-default rounded-xl border border-black/8 bg-subtle/80 px-4 py-2 text-sm text-ink-800 transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-ink-900"
                                            >
                                                {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
