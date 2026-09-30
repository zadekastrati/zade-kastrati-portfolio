import { MotionConfig } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Featured from './components/Featured';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import TechMarquee from './components/TechMarquee';

// Content comes from config/portfolio.php, embedded by resources/views/app.blade.php.
const data = window.__PORTFOLIO__;

function App() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="noise relative overflow-x-clip">
                <Navbar name={data.profile.name} photo={data.profile.photo} />
                <main>
                    <Hero profile={data.profile} featured={data.featured} experience={data.experience} education={data.education} />
                    <TechMarquee skills={data.skills} />
                    <About profile={data.profile} education={data.education} languages={data.languages} />
                    <Featured project={data.featured} />
                    <Experience items={data.experience} />
                    <Projects projects={data.projects} github={data.profile.socials.github} />
                    <Skills skills={data.skills} />
                    <Contact profile={data.profile} />
                </main>
                <Footer profile={data.profile} />
            </div>
        </MotionConfig>
    );
}

// Reuse the root if this module is re-executed during hot reload.
const container = document.getElementById('app');
container.__root ??= createRoot(container);
container.__root.render(<App />);
