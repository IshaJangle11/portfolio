import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import { profile, about, experienceIntro, experience, skills, education, projects } from './data.js';

export default function App() {
  // Light/dark mode: starts from the device setting, the button flips it.
  const [dark, setDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Scroll progress bar: width = how far down the page you are.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? (scrollY / max) * 100 : 0);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <button
        className="theme"
        type="button"
        aria-label="Switch between light and dark mode"
        onClick={() => setDark((d) => !d)}
      >
        ◐
      </button>
      <main>
        <header className="hero">
          <div className="hero-top">
            <img className="photo" src="/isha.jpg" alt="Portrait of Isha Jangle" width="160" height="160" />
            <div>
              <h1>{profile.name}</h1>
              <p className="role">{profile.role}</p>
            </div>
          </div>
          <p className="lede">{profile.intro}</p>
          <nav className="links" aria-label="Profile links">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} rel="noopener">{l.label}</a>
            ))}
          </nav>
        </header>

        <Reveal as="section" id="skills" aria-labelledby="s">
          <h2 id="s">Skills</h2>
          <dl className="skills">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} style={{ display: 'contents' }}>
                <dt>{group}</dt>
                <dd>{items.map((item) => <span key={item}>{item}</span>)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>


        <Reveal as="section" id="about" aria-labelledby="a">
          <h2 id="a">About me</h2>
          {about.map((text, i) => <p key={i}>{text}</p>)}
        </Reveal>

        <Reveal as="section" id="projects" aria-labelledby="p">
          <h2 id="p">Personal projects</h2>
          <div className="projects">
            {projects.map((pr) => (
              <Reveal as="article" className="proj" key={pr.title}>
                <h3>{pr.title}</h3>
                <p>{pr.text}</p>
                {pr.tags.length > 0 && (
                  <div className="tags">{pr.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                )}
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" id="work" aria-labelledby="w">
          <h2 id="w">Experience</h2>
          <p>{experienceIntro}</p>
          {experience.map((job) => (
            <div className="job" key={job.title}>
              <time>{job.period}</time>
              <div><h3>{job.title}</h3><p>{job.text}</p></div>
            </div>
          ))}
        </Reveal>

        <Reveal as="section" id="education" aria-labelledby="e">
          <h2 id="e">Education</h2>
          {education.map((ed) => (
            <div className="job" key={ed.title}>
              <time>{ed.year}</time>
              <div><h3>{ed.title}</h3><p>{ed.place}</p></div>
            </div>
          ))}
        </Reveal>
      </main>

      <footer>
        <main>
          <h2>Let’s build something together.</h2>
          <p>Based in Pune, Maharashtra. Open to new frontend roles and projects.</p>
          <nav className="links" aria-label="Contact">
            <a href={profile.links[0].href}>{profile.links[0].label}</a>
          </nav>
        </main>
      </footer>
    </>
  );
}
