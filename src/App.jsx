import { useEffect, useRef, useState } from 'react';
import Scramble from './Scramble';
import Telemetry from './Telemetry';
import { PrefsProvider, usePrefs } from './prefs';
import { icons } from './icons';
import { CV, links, socials, stack, marquee, experience, education, projects, ui } from './data';

const Icon = ({ name, size = 22, mono }) => {
  const { viewBox, fill, d } = icons[name];
  return <svg viewBox={viewBox} width={size} height={size} aria-hidden="true"><path fill={mono ? 'currentColor' : fill} d={d} /></svg>;
};

// Marca pierooof.dev (SVG de tu pack de branding). El texto usa currentColor para valer en claro y oscuro.
const MarkPaths = () => (
  <>
    <g fill="none" stroke="#5CB79A" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"><path d="M96,40H60V160H96" /><circle cx="96" cy="76" r="36" /><path d="M131,62H154V90H134" /></g>
    <circle cx="96" cy="76" r="11" fill="#F0B44C" />
  </>
);
export const Mark = ({ size = 40 }) => (
  <svg viewBox="0 0 120 200" width={size * 0.6} height={size} aria-hidden="true"><g transform="translate(-23.5 0)"><MarkPaths /></g></svg>
);
export const Logo = ({ height = 30 }) => (
  <svg viewBox="0 0 1000.8 200" height={height} width={(height * 1000.8) / 200} role="img" aria-label="pierooof.dev">
    <g transform="translate(-23.5 0)"><MarkPaths /></g>
    <g transform="translate(182.4 -8) scale(1.35)">
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0,60V130" /><circle cx="20" cy="80" r="20" /><path d="M58,60V100" /><circle fill="currentColor" stroke="none" cx="58" cy="38" r="5.5" />
        <path d="M80,80H120A20 20 0 1 0 114.14,94.14" /><path d="M138,60V100M138,80A20 20 0 0 1 158,60" />
        <circle cx="200" cy="80" r="20" /><circle cx="258" cy="80" r="20" /><circle cx="316" cy="80" r="20" />
        <path d="M366,100V47A15 15 0 0 1 381,32H388M354,62H380" /><circle fill="#F0B44C" stroke="none" cx="408" cy="98" r="6" />
        <circle cx="448" cy="80" r="20" /><path d="M468,30V100" /><path d="M486,80H526A20 20 0 1 0 520.14,94.14" /><path d="M544,60L562,100L580,60" />
      </g>
    </g>
  </svg>
);

const Heading = ({ children }) => {
  const { tr } = usePrefs();
  return <Scramble as="h2" className="reveal" text={tr(children)} />;
};

function Boot() {
  const { lang, tr } = usePrefs();
  const [show, setShow] = useState(() => {
    try { const seen = sessionStorage.getItem('boot'); sessionStorage.setItem('boot', 1); return !seen && !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  });
  const [step, setStep] = useState(0);
  const lines = ui.bootLines[lang];
  useEffect(() => {
    if (!show) return;
    const ids = lines.map((_, i) => setTimeout(() => setStep(i + 1), 300 + i * 450));
    ids.push(setTimeout(() => setStep(99), 2400), setTimeout(() => setShow(false), 2900));
    // Cualquier tecla omite la intro
    const skip = () => { setStep(99); ids.push(setTimeout(() => setShow(false), 400)); };
    addEventListener('keydown', skip);
    return () => { ids.forEach(clearTimeout); removeEventListener('keydown', skip); };
  }, []);
  if (!show) return null;
  return (
    <div id="boot" className={step === 99 ? 'done' : 'run'} aria-hidden="true" onClick={() => setStep(99)} title={tr(ui.bootSkip)}>
      <Mark size={72} />
      <div className="boot-title">&lt;System.Init/&gt;<span className="cursor">_</span></div>
      <div className="boot-bar"><i /></div>
      <pre className="term">{lines.slice(0, step).join('\n')}</pre>
    </div>
  );
}

const Sun = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
const Moon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>;

function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, lang, toggleTheme, toggleLang, tr } = usePrefs();
  return (
    <nav className={open ? 'menu-open' : ''}>
      <a href="#" className="logo" aria-label={tr(ui.home)}><Logo height={30} /></a>
      <ul id="nav-links" className={`nav-links ${open ? 'active' : ''}`} onClick={e => e.target.closest('a') && setOpen(false)}>
        <li className="menu-socials">
          {socials.map(s => <a key={s.key} href={s.href} target={s.key === 'email' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={s.label}><Icon name={s.key} size={24} mono /></a>)}
        </li>
        {links.map(l => <li key={l.id}><Scramble as="a" href={`#${l.id}`} text={tr(l.label)} className="navlink" /></li>)}
        <li><a href={CV} className="btn-cv">{tr(ui.cv)}</a></li>
      </ul>
      <div className="nav-tools">
        <button className="lang-toggle" onClick={toggleLang} aria-label={tr(ui.langSwitch)}>
          <span className={lang === 'es' ? 'on' : ''}>ES</span><span className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
        <button className="theme-toggle" onClick={toggleTheme} aria-label={tr(theme === 'dark' ? ui.themeToLight : ui.themeToDark)}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
        <button className={`hamburger ${open ? 'active' : ''}`} aria-expanded={open} aria-controls="nav-links" aria-label={tr(open ? ui.menuClose : ui.menuOpen)} onClick={() => setOpen(o => !o)}>
          <span className="bar" /><span className="bar" /><span className="bar" />
        </button>
      </div>
    </nav>
  );
}

const Hero = () => {
  const { tr } = usePrefs();
  return (
    <header className="hero" id="inicio">
      <div className="hero-content">
        <p className="badge"><b />{tr(ui.badge)}</p>
        <h1>
          {ui.h1.map((l, i) => <Scramble key={i} as="span" className={`line ${i === 2 ? 'grad' : ''}`} text={tr(l)} />)}
        </h1>
        <p className="role"><Scramble text={tr(ui.role)} /></p>
        <p className="lead">{tr(ui.lead)}</p>
        <div className="cta">
          <a href="#proyectos" className="btn-primary">{tr(ui.ctaProjects)}</a>
          <a href={CV} className="btn-primary btn-ghost">{tr(ui.cv)}</a>
          <a href="#contacto" className="btn-primary btn-ghost">{tr(ui.ctaContact)}</a>
        </div>
        <ul className="stats">
          <li><strong>{projects.filter(p => p.demo).length}</strong><span>{tr(ui.statProjects)}</span></li>
          <li><strong>3</strong><span>{tr(ui.statInternship)}</span></li>
          <li><strong>2027</strong><span>{tr(ui.statDaw)}</span></li>
        </ul>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div>
      </div>
    </header>
  );
};

const About = () => {
  const { tr } = usePrefs();
  return (
    <section id="sobre-mi" className="section reveal">
      <Heading>{ui.about}</Heading>
      <div className="terminal spot">
        <div className="term-head"><i /><i /><i /><span>bash — piero@ubuntu</span></div>
        <div className="term-body">
          <p className="cmd">whoami</p>
          <p>{tr(ui.aboutWhoami)}</p>
          <p className="cmd">{tr(ui.aboutFile)}</p>
          <p>{tr(ui.aboutContext)}</p>
          <p className="cmd">echo $STACK</p>
          <p>Python · Flask · React · TypeScript · Node.js · MySQL · MongoDB · Git · Ubuntu · VS Code</p>
        </div>
      </div>
    </section>
  );
};

const Timeline = ({ title, items }) => {
  const { tr } = usePrefs();
  return (
    <div className="reveal">
      <h3 className="eyebrow">{tr(title)}</h3>
      <ol className="timeline">
        {items.map(e => (
          <li key={e.org + (e.title.es ?? e.title)} className="spot">
            <time>{tr(e.time)}</time>
            <Scramble as="h4" text={tr(e.title)} />
            <p className="org">{e.org}</p>
            {e.text && <p>{tr(e.text)}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
};

const Journey = () => {
  const { tr } = usePrefs();
  return (
    <section id="experiencia" className="section">
      <Heading>{ui.journey}</Heading>
      <div className="timeline-wrap">
        <Timeline title={ui.experience} items={experience} />
        <Timeline title={ui.education} items={education} />
      </div>
      <div className="dossier spot reveal">
        <div><p className="eyebrow">{tr(ui.dossier)}</p><p>{tr(ui.dossierText)}</p></div>
        <a href={CV} className="btn-primary">{tr(ui.cv)}</a>
      </div>
    </section>
  );
};

// Acordeón nativo: <details name="projects"> cierra los demás solos. Las capturas se amplían en un <dialog> nativo.
const Projects = () => {
  const { tr } = usePrefs();
  const [lb, setLb] = useState(null); // { shots, i }
  const dlg = useRef();
  useEffect(() => { if (lb && !dlg.current.open) dlg.current.showModal(); }, [lb]);
  const go = n => setLb(l => ({ ...l, i: (l.i + n + l.shots.length) % l.shots.length }));
  const cur = lb && lb.shots[lb.i];
  return (
    <section id="proyectos" className="section">
      <Heading>{ui.projects}</Heading>
      <div className="project-grid">
        {projects.map(p => (
          <details key={p.title} name="projects" className="project-card spot reveal">
            <summary>
              <Scramble as="h3" text={p.title} />
              <span className="pill">{tr(p.pill)}</span>
              <ul className="tags">{p.tags.map(x => <li key={x.es ?? x}>{tr(x)}</li>)}</ul>
              <i className="chev" aria-hidden="true" />
            </summary>
            <div className="project-body">
              <p>{tr(p.text)}</p>
              <ul className="bullets">{p.bullets.map(b => <li key={b.es}>{tr(b)}</li>)}</ul>
              <div className="links">
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link-arrow">{tr(ui.demo)}</a>}
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="link-arrow alt">{tr(ui.code)}</a>
              </div>
              <ul className={`shots ${p.tall ? 'tall' : ''}`}>
                {p.shots.map((x, i) => (
                  <li key={x.src}><button type="button" onClick={() => setLb({ shots: p.shots, i })}><img src={x.src} alt={tr(x.alt)} loading="lazy" /></button></li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
      <dialog ref={dlg} className="lightbox" onClose={() => setLb(null)} onClick={e => !e.target.closest('img, button, figcaption') && dlg.current.close()}
        onKeyDown={e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}>
        {cur && (
          <figure>
            <img src={cur.src} alt={tr(cur.alt)} />
            <figcaption>{tr(cur.alt)} · {lb.i + 1}/{lb.shots.length}</figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" onClick={() => dlg.current.close()} aria-label={tr(ui.lbClose)}>×</button>
        {lb?.shots.length > 1 && <>
          <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label={tr(ui.lbPrev)}>‹</button>
          <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label={tr(ui.lbNext)}>›</button>
        </>}
      </dialog>
    </section>
  );
};

const Stack = () => {
  const { tr } = usePrefs();
  return (
    <section id="habilidades" className="section">
      <Heading>{ui.stack}</Heading>
      <div className="stack">
        {stack.map(g => (
          <div key={g.group.es} className="stack-group spot reveal">
            <h3>{tr(g.group)}</h3>
            <ul className="chips">
              {g.items.map(i => (
                <li key={i.name}>{i.icon && <img src={i.icon} alt="" width="20" height="20" loading="lazy" className={i.invert ? 'invert' : ''} />}<Scramble text={i.name} /></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const { tr } = usePrefs();
  return (
    <section id="contacto" className="section">
      <Heading>{ui.contact}</Heading>
      <div className="contact-grid">
        {socials.map(s => (
          <a key={s.key} href={s.href} target={s.key === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className="contact-card spot reveal">
            <div className="icon"><Icon name={s.key} size={52} mono={s.key === 'github'} /></div>
            <Scramble as="h3" text={s.label} />
            <p>{tr(ui.contactCopy[s.key])}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

function Page() {
  const { lang, tr } = usePrefs();

  // Título y descripción según el idioma (el HTML estático está en español)
  useEffect(() => {
    document.title = tr(ui.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', tr(ui.description));
  }, [lang]);

  useEffect(() => {
    // Aparición al hacer scroll
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Barra de progreso + foco que sigue al cursor en tarjetas
    const bar = document.getElementById('progress');
    const onScroll = () => { bar.style.width = (100 * scrollY) / Math.max(1, document.documentElement.scrollHeight - innerHeight) + '%'; };
    const onMove = e => {
      const el = e.target.closest?.('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('mousemove', onMove);
    onScroll();
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <>
      <Boot />
      <div id="progress" />
      <a href="#main" className="skip-link">{tr(ui.skip)}</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <footer><Mark size={28} /><p>&copy; 2026 Piero Funes · pierooof.dev</p></footer>
      <Telemetry />
    </>
  );
}

export default function App() {
  return <PrefsProvider><Page /></PrefsProvider>;
}
