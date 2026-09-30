import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../lib/icons';

export default function Footer({ profile }) {
    return (
        <footer className="relative border-t border-black/6 py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
                <p className="text-sm text-ink-500">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-10 place-items-center rounded-full text-ink-500 transition hover:bg-black/5 hover:text-ink-900">
                        <GithubIcon className="size-4" />
                    </a>
                    <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full text-ink-500 transition hover:bg-black/5 hover:text-ink-900">
                        <LinkedinIcon className="size-4" />
                    </a>
                    <a href="#top" aria-label="Back to top" className="ml-2 grid size-10 place-items-center rounded-full border border-black/10 text-ink-600 transition hover:-translate-y-1 hover:border-accent/50 hover:text-ink-900">
                        <ArrowUp className="size-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
