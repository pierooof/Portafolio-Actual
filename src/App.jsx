import { useEffect, useState } from 'react';
import Scramble from './Scramble';
import Telemetry from './Telemetry';
import { icons } from './icons';
import { CV, links, socials, stack, marquee, experience, education, projects } from './data';

const Icon = ({ name, size = 22, mono }) => {
  const { viewBox, fill, d } = icons[name];
  return <svg viewBox={viewBox} width={size} height={size} aria-hidden="true"><path fill={mono ? 'currentColor' : fill} d={d} /></svg>;
};

const Heading = ({ children }) => <Scramble as="h2" className="reveal" text={children} />;

function Boot() {
  const [show, setShow] = useState(() => {
    try { const seen = sessionStorage.getItem('boot'); sessionStorage.setItem('boot', 1); return !seen && !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  });
  const [step, setStep] = useState(0);
  const lines = ['$ systemctl start portfolio.service', '→ Cargando módulos... [Python, Flask, React, TypeScript]', '→ Conectando con pierooof... OK', '→ Listo.'];
  useEffect(() => {
    if (!show) return;
    const ids = lines.map((_, i) => setTimeout(() => setStep(i + 1), 300 + i * 450));
    ids.push(setTimeout(() => setStep(99), 2400), setTimeout(() => setShow(false), 2900));
    return () => ids.forEach(clearTimeout);
  }, []);
  if (!show) return null;
  return (
    <div id="boot" className={step === 99 ? 'done' : 'run'} aria-hidden="true">
      <div className="boot-title">&lt;System.Init/&gt;<span className="cursor">_</span></div>
      <div className="boot-bar"><i /></div>
      <pre className="term">{lines.slice(0, step).join('\n')}</pre>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={open ? 'menu-open' : ''}>
      <a href="#" className="logo" aria-label="Inicio"><Scramble text="PIERO.FUNES" /></a>
      <button className={`hamburger ${open ? 'active' : ''}`} aria-expanded={open} aria-controls="nav-links" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(o => !o)}>
        <span className="bar" /><span className="bar" /><span className="bar" />
      </button>
      <ul id="nav-links" className={`nav-links ${open ? 'active' : ''}`} onClick={e => e.target.closest('a,button') && setOpen(false)}>
        <li className="menu-socials">
          {socials.map(s => <a key={s.key} href={s.href} target={s.key === 'email' ? undefined : '_blank'} rel="noopener noreferrer" aria-label={s.label}><Icon name={s.key} size={24} mono /></a>)}
        </li>
        {links.map(l => <li key={l.id}><Scramble as="a" href={`#${l.id}`} text={l.label} className="navlink" /></li>)}
        <li><a href={CV} className="btn-cv">Ver CV</a></li>
      </ul>
    </nav>
  );
}

const Hero = () => (
  <header className="hero" id="inicio">
    <div className="hero-content">
      <p className="badge"><b />Disponible para nuevas oportunidades</p>
      <h1>
        <Scramble as="span" className="line" text="Diseño." />
        <Scramble as="span" className="line" text="Código." />
        <Scramble as="span" className="line grad" text="Producción." />
      </h1>
      <p className="role"><Scramble text="Piero Funes · Desarrollador Web Junior" /></p>
      <p className="lead">Creo herramientas y MVPs con Python y Flask, y vengo de prácticas con React, TypeScript y Node.js. Mi base en Psicología me ayuda a entender a los usuarios y convertir necesidades reales en soluciones prácticas.</p>
      <div className="cta">
        <a href="#proyectos" className="btn-primary">Ver proyectos</a>
        <a href={CV} className="btn-primary btn-ghost">Ver CV</a>
        <a href="#contacto" className="btn-primary btn-ghost">Contacto</a>
      </div>
      <ul className="stats">
        <li><strong>1</strong><span>proyecto en producción</span></li>
        <li><strong>3</strong><span>meses de prácticas con React + Node</span></li>
        <li><strong>2027</strong><span>fin del ciclo DAW (previsto)</span></li>
      </ul>
    </div>
    <div className="marquee" aria-hidden="true">
      <div>{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div>
    </div>
  </header>
);

const About = () => (
  <section id="sobre-mi" className="section reveal">
    <Heading>Sobre mí</Heading>
    <div className="terminal spot">
      <div className="term-head"><i /><i /><i /><span>bash — piero@ubuntu</span></div>
      <div className="term-body">
        <p className="cmd">whoami</p>
        <p>Estudiante de Desarrollo de Aplicaciones Web enfocado en crear herramientas y MVPs de forma ágil con Python y Flask.</p>
        <p className="cmd">cat contexto.txt</p>
        <p>Mi paso por Psicología y mi experiencia en soporte y atención al cliente me permiten detectar fricciones en los flujos de trabajo de los usuarios y resolverlas con software.</p>
        <p className="cmd">echo $STACK</p>
        <p>Python · Flask · React · TypeScript · Node.js · MySQL · MongoDB · Git · Ubuntu · VS Code</p>
      </div>
    </div>
  </section>
);

const Timeline = ({ title, items }) => (
  <div className="reveal">
    <h3 className="group">{title}</h3>
    <ol className="timeline">
      {items.map(e => (
        <li key={e.title} className="spot">
          <time>{e.time}</time>
          <Scramble as="h4" text={e.title} />
          <p className="org">{e.org}</p>
          {e.text && <p>{e.text}</p>}
        </li>
      ))}
    </ol>
  </div>
);

const Journey = () => (
  <section id="experiencia" className="section">
    <Heading>Trayectoria</Heading>
    <div className="timeline-wrap">
      <Timeline title="Experiencia" items={experience} />
      <Timeline title="Formación" items={education} />
    </div>
    <div className="dossier spot reveal">
      <div><p className="group">Dossier profesional</p><p>Resumen de mi experiencia, formación y proyectos destacados.</p></div>
      <a href={CV} className="btn-primary">Ver CV</a>
    </div>
  </section>
);

const Projects = () => (
  <section id="proyectos" className="section">
    <Heading>Proyectos</Heading>
    <div className="project-grid">
      {projects.map(p => (
        <article key={p.title} className="project-card spot reveal">
          <a className="project-media" href={p.demo || p.code} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${p.title}`}>
            <img src={p.img} alt={p.alt} width="1024" height="1024" loading="lazy" /><span className="pill">{p.pill}</span>
          </a>
          <div className="project-info">
            <Scramble as="h3" text={p.title} />
            <p>{p.text}</p>
            <ul className="bullets">{p.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            <ul className="tags">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
            <div className="links">
              {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link-arrow">Ver demo ↗</a>}
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="link-arrow alt">Código →</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Stack = () => (
  <section id="habilidades" className="section">
    <Heading>Stack</Heading>
    <div className="stack">
      {stack.map(g => (
        <div key={g.group} className="stack-group spot reveal">
          <h3>{g.group}</h3>
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

const copy = {
  github: ['GitHub', 'Mira mi código'],
  linkedin: ['LinkedIn', 'Conectemos profesionalmente'],
  email: ['Email', 'pierofl2005@gmail.com'],
};
const Contact = () => (
  <section id="contacto" className="section">
    <Heading>Hablemos</Heading>
    <div className="contact-grid">
      {socials.map(s => (
        <a key={s.key} href={s.href} target={s.key === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className="contact-card spot reveal">
          <div className="icon"><Icon name={s.key} size={52} /></div>
          <Scramble as="h3" text={copy[s.key][0]} />
          <p>{copy[s.key][1]}</p>
        </a>
      ))}
    </div>
  </section>
);

export default function App() {
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
      <a href="#main" className="skip-link">Saltar al contenido</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <footer><p>&copy; 2026 Piero Funes</p></footer>
      <Telemetry />
    </>
  );
}
