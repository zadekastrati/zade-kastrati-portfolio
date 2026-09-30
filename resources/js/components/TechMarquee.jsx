import { Sparkles } from 'lucide-react';

/** Infinite horizontal ticker of technologies. The list is doubled so the loop is seamless. */
export default function TechMarquee({ skills }) {
    const items = skills.flatMap((g) => g.items);

    return (
        <div className="mask-fade-x relative overflow-hidden border-y border-black/6 bg-surface/40 py-6">
            <div className="animate-marquee flex w-max gap-10 hover:[animation-play-state:paused]">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="flex items-center gap-10 font-display text-xl font-medium whitespace-nowrap text-ink-500">
                        {item}
                        <Sparkles className="size-4 text-accent/50" />
                    </span>
                ))}
            </div>
        </div>
    );
}
