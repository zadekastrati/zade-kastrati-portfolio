import { Award, GraduationCap, Languages, MapPin } from 'lucide-react';
import { Reveal, SectionHeading, SpotlightCard } from './ui';

export default function About({ profile, education, languages }) {
    return (
        <section id="about" className="relative py-32">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeading
                    index="01"
                    eyebrow="About"
                    title={
                        <>
                            Professional <span className="text-accent">Profile</span>
                        </>
                    }
                />

                <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
                    <div>
                        <Reveal>
                            <p className="text-xl leading-relaxed text-ink-700">{profile.summary}</p>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <SpotlightCard className="mt-10 max-w-md" tilt={false}>
                                <div className="flex items-center gap-5 p-5">
                                    <img
                                        src={profile.photo}
                                        width="96"
                                        height="96"
                                        loading="lazy"
                                        alt={profile.name}
                                        className="size-24 shrink-0 rounded-2xl bg-subtle object-cover object-top ring-1 ring-black/6"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold">{profile.name}</h3>
                                        <p className="mt-0.5 text-sm text-accent">Full Stack Developer &amp; QA Engineer</p>
                                        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
                                            <MapPin className="size-3.5" /> {profile.location}
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    </div>

                    <div className="space-y-4">
                        {education.map((item, i) => {
                            const IconComponent = item.type === 'degree' ? GraduationCap : Award;
                            return (
                                <Reveal key={item.title} delay={i * 0.1}>
                                    <SpotlightCard>
                                        <div className="flex gap-4 p-6">
                                            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                                                <IconComponent className="size-5" />
                                            </span>
                                            <div>
                                                <p className="font-mono text-xs text-ink-500">{item.period}</p>
                                                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                                                <p className="text-sm text-ink-600">{item.place}</p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                        <Reveal delay={0.2}>
                            <SpotlightCard>
                                <div className="flex gap-4 p-6">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                                        <Languages className="size-5" />
                                    </span>
                                    <div className="flex flex-1 flex-wrap gap-x-8 gap-y-2">
                                        {languages.map((l) => (
                                            <div key={l.name}>
                                                <h3 className="text-lg font-semibold">{l.name}</h3>
                                                <p className="text-sm text-ink-600">{l.level}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
