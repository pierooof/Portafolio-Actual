import { useEffect, useRef, useState } from 'react';
import Scramble from './Scramble';
import Telemetry from './Telemetry';
import { startDriver } from './driver';
import { PrefsProvider, usePrefs } from './prefs';
import { icons } from './icons';
import { CV, FORM_KEY, links, socials, stack, marquee, experience, education, projects, ui } from './data';

const Icon = ({ name, size = 22, mono }) => {
  const { viewBox, fill, d } = icons[name];
  return <svg viewBox={viewBox} width={size} height={size} aria-hidden="true"><path fill={mono ? 'currentColor' : fill} d={d} /></svg>;
};

// Marca pierooof.dev (SVG de tu pack de branding). El texto usa currentColor para valer en claro y oscuro.
const MarkPaths = () => (
  <>
    <g fill="none" stroke="#5CB79A" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"><path pathLength="1" d="M96,40H60V160H96" /><circle pathLength="1" cx="96" cy="76" r="36" /><path pathLength="1" d="M131,62H154V90H134" /></g>
    <circle pathLength="1" cx="96" cy="76" r="11" fill="#F0B44C" />
  </>
);
export const Logo = ({ height = 30 }) => (
  <svg viewBox="0 0 1000.8 200" height={height} width={(height * 1000.8) / 200} role="img" aria-label="pierooof.dev">
    <g transform="translate(-23.5 0)"><MarkPaths /></g>
    <g transform="translate(182.4 -8) scale(1.35)">
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path pathLength="1" d="M0,60V130" /><circle pathLength="1" cx="20" cy="80" r="20" /><path pathLength="1" d="M58,60V100" /><circle fill="currentColor" stroke="none" cx="58" cy="38" r="5.5" />
        <path pathLength="1" d="M80,80H120A20 20 0 1 0 114.14,94.14" /><path pathLength="1" d="M138,60V100M138,80A20 20 0 0 1 158,60" />
        <circle pathLength="1" cx="200" cy="80" r="20" /><circle pathLength="1" cx="258" cy="80" r="20" /><circle pathLength="1" cx="316" cy="80" r="20" />
        <path pathLength="1" d="M366,100V47A15 15 0 0 1 381,32H388M354,62H380" /><circle fill="#F0B44C" stroke="none" cx="408" cy="98" r="6" />
        <circle pathLength="1" cx="448" cy="80" r="20" /><path pathLength="1" d="M468,30V100" /><path pathLength="1" d="M486,80H526A20 20 0 1 0 520.14,94.14" /><path pathLength="1" d="M544,60L562,100L580,60" />
      </g>
    </g>
  </svg>
);

const Heading = ({ children, className }) => {
  const { tr } = usePrefs();
  return <Scramble as="h2" className={className} text={tr(children)} />;
};

// Intro de ~2 s (una vez por sesión). Mientras dura, <html> lleva .booting y el collage espera para animarse.
function Boot() {
  const { lang, tr } = usePrefs();
  const [show, setShow] = useState(() => {
    try {
      const seen = sessionStorage.getItem('boot'); sessionStorage.setItem('boot', 1);
      const on = !seen && !matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (on) document.documentElement.classList.add('booting');
      return on;
    } catch { return false; }
  });
  const [step, setStep] = useState(0);
  const lines = ui.bootLines[lang];
  useEffect(() => {
    if (!show) return;
    const ids = lines.map((_, i) => setTimeout(() => setStep(i + 1), 200 + i * 300));
    ids.push(setTimeout(() => setStep(99), 1500), setTimeout(() => setShow(false), 2000));
    // Cualquier tecla omite la intro
    const skip = () => { setStep(99); ids.push(setTimeout(() => setShow(false), 400)); };
    addEventListener('keydown', skip);
    return () => { ids.forEach(clearTimeout); removeEventListener('keydown', skip); };
  }, []);
  useEffect(() => { if (step === 99) document.documentElement.classList.remove('booting'); }, [step]);
  if (!show) return null;
  return (
    <div id="boot" className={step === 99 ? 'done' : 'run'} aria-hidden="true" onClick={() => setStep(99)} title={tr(ui.bootSkip)}>
      <Logo height={64} />
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
    <nav className={`topbar ${open ? 'menu-open' : ''}`}>
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

// Titular a sangre: el punto ámbar del final es el de pierooof.dev (el "en vivo"), y late.
// Debajo, tres demos en producción: lo primero que ve quien llega es trabajo real.
const Hero = () => {
  const { tr } = usePrefs();
  const lines = tr(ui.h1).split(' / ');
  return (
    <header className="hero" id="inicio">
      <h1 aria-label={lines.join(' ') + '.'}>
        {lines.map((l, i) => (
          <span key={i} className="ln" aria-hidden="true"><span style={{ '--i': i }}>{l}{i === lines.length - 1 && <i className="dot" />}</span></span>
        ))}
      </h1>
      <div className="hero-copy">
        <p className="lead">{tr(ui.lead)}</p>
        <div className="cta">
          <a href="#proyectos" className="btn-primary">{tr(ui.ctaProjects)}</a>
          <a href={CV} className="text-link">{tr(ui.cv)}</a>
        </div>
        <p className="avail label"><i />{tr(ui.badge)}</p>
      </div>
      <ul className="collage" aria-label={tr(ui.heroShots)}>
        {projects.slice(0, 3).map((p, i) => (
          <li key={p.title} className={`shot s${i}`}>
            <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title}: ${tr(ui.demo)}`}>
              <img src={p.shots[0].src} alt="" />
              <span className="tag label"><i />{p.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="marquee" aria-hidden="true">
        <div>{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div>
      </div>
    </header>
  );
};

const About = () => {
  const { tr } = usePrefs();
  return (
    <section id="sobre-mi" className="section about">
      <Heading className="label">{ui.about}</Heading>
      <div className="prose">
        <p className="big">{tr(ui.aboutWhoami)}</p>
        <p>{tr(ui.aboutContext)}</p>
      </div>
    </section>
  );
};

const Timeline = ({ title, items }) => {
  const { tr } = usePrefs();
  return (
    <div>
      <h3 className="label">{tr(title)}</h3>
      <ol className="timeline">
        {items.map(e => (
          <li key={e.org + (e.title.es ?? e.title)}>
            <time>{tr(e.time)}</time>
            <div>
              <Scramble as="h4" text={tr(e.title)} />
              <p className="org">{e.org}</p>
              {e.text && <p>{tr(e.text)}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const Journey = () => {
  return (
    <section id="experiencia" className="section journey-sec">
      <Heading className="h-xl">{ui.journey}</Heading>
      <div className="journey">
        <Timeline title={ui.experience} items={experience} />
        <Timeline title={ui.education} items={education} />
      </div>
    </section>
  );
};

// Tarjetas apiladas (cascada). La captura principal abre un <dialog> nativo con todas las capturas.
const Projects = () => {
  const { tr } = usePrefs();
  const [lb, setLb] = useState(null); // { shots, i }
  const dlg = useRef();
  useEffect(() => { if (lb && !dlg.current.open) dlg.current.showModal(); }, [lb]);
  const go = n => setLb(l => ({ ...l, i: (l.i + n + l.shots.length) % l.shots.length }));
  const cur = lb && lb.shots[lb.i];
  return (
    <section id="proyectos" className="section projects-sec">
      <Heading className="h-xl">{ui.projects}</Heading>
      <div className="project-grid">
        {projects.map(p => (
          <article key={p.title} className="project-card" style={{ '--c': p.accent }}>
            <div className="project-info">
              <Scramble as="h3" text={p.title} />
              <p>{tr(p.text)}</p>
              <ul className="bullets">{p.bullets.map(b => <li key={b.es}>{tr(b)}</li>)}</ul>
              <p className="tags">{p.tags.map(x => tr(x)).join(', ')}</p>
              <div className="links">
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link-main">{tr(ui.demo)}</a>}
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="link-alt">{tr(ui.code)}</a>
              </div>
            </div>
            <button type="button" className={`preview ${p.tall ? 'tall' : ''}`} onClick={() => setLb({ shots: p.shots, i: 0 })} aria-label={`${p.title}: ${p.shots.length} ${tr(ui.shots)}`}>
              <img src={p.shots[0].src} alt={tr(p.shots[0].alt)} loading="lazy" />
              {p.shots.length > 1 && <span className="count">{p.shots.length} {tr(ui.shots)}</span>}
            </button>
          </article>
        ))}
      </div>
      <dialog ref={dlg} className="lightbox" aria-label={cur ? tr(cur.alt) : tr(ui.projects)} onClose={() => setLb(null)} onClick={e => !e.target.closest('img, button, figcaption') && dlg.current.close()}
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
    <section id="habilidades" className="section stack-sec">
      <Heading className="h-xl">{ui.stack}</Heading>
      <dl className="stack">
        {stack.map(g => (
          <div key={g.group.es}>
            <dt className="label">{tr(g.group)}</dt>
            <dd>
              <ul className="chips">
                {g.items.map(i => (
                  <li key={i.name}>{i.icon && <img src={i.icon} alt="" width="28" height="28" loading="lazy" className={i.invert ? 'invert' : ''} />}<Scramble text={i.name} /></li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const ContactForm = () => {
  const { tr } = usePrefs();
  const f = ui.form;
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'error'
  const submit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return; // trampa para bots: un humano no lo ve ni lo marca
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, access_key: FORM_KEY, subject: 'Mensaje desde el portafolio' }),
      });
      if (!(await res.json()).success) throw new Error('web3forms');
      form.reset();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  };
  return (
    <form className="contact-form" onSubmit={submit}>
      <label>{tr(f.name)}<input type="text" name="name" autoComplete="name" required maxLength="80" /></label>
      <label>{tr(f.email)}<input type="email" name="email" autoComplete="email" required maxLength="120" /></label>
      <label>{tr(f.message)}<textarea name="message" rows="5" required maxLength="2000" /></label>
      <input type="checkbox" name="botcheck" className="botcheck" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>{tr(status === 'sending' ? f.sending : f.send)}</button>
      <p className={`form-msg ${status === 'error' ? 'err' : ''}`} role="status">{status === 'ok' && tr(f.ok)}{status === 'error' && tr(f.error)}</p>
      <p className="form-note">{tr(f.note)}</p>
    </form>
  );
};

const Contact = () => {
  const { tr } = usePrefs();
  const mail = socials.find(x => x.key === 'email');
  return (
    <section id="contacto" className="section contact-sec">
      <Heading className="h-xl">{ui.contact}</Heading>
      <p className="label mail-label">{tr(ui.mailLabel)}</p>
      <Scramble as="a" href={mail.href} className="mail" text={ui.contactCopy.email.es} />
      <div className="contact-body">
        <ul className="socials">
          {socials.filter(x => x.key !== 'email').map(x => (
            <li key={x.key}>
              <a href={x.href} target="_blank" rel="noopener noreferrer" className="social-row" aria-label={x.label}>
                <Icon name={x.key} size={34} mono />
                <Scramble as="h3" text={x.label} />
                <span className="label">{tr(ui.contactCopy[x.key])}</span>
              </a>
            </li>
          ))}
        </ul>
        {FORM_KEY && <ContactForm />}
      </div>
    </section>
  );
};

// Raíl de progreso: el punto ámbar baja con el scroll y cada tick está donde empieza su sección.
// En móvil pasa a ser una línea fina bajo la barra (ver .spine en style.css).
const Spine = () => {
  const { tr } = usePrefs();
  return (
    <nav className="spine" aria-label={tr(ui.spine)}>
      <div className="spine-track">
        {[{ id: 'inicio', label: ui.home }, ...links].map(l => (
          <a key={l.id} href={`#${l.id}`}><span className="label">{tr(l.label)}</span></a>
        ))}
        <i className="spine-dot" aria-hidden="true" />
      </div>
    </nav>
  );
};

function Page() {
  const { lang, tr } = usePrefs();

  // Título y descripción según el idioma (el HTML estático está en español)
  useEffect(() => {
    document.title = tr(ui.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', tr(ui.description));
  }, [lang]);

  useEffect(() => startDriver(), []);

  return (
    <>
      <Boot />
      <a href="#main" className="skip-link">{tr(ui.skip)}</a>
      <Nav />
      <Spine />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <footer>
        <div className="foot-logo"><Logo height={120} /></div>
        <p className="label">&copy; {new Date().getFullYear()} Piero Funes</p>
      </footer>
      <button type="button" className="to-top" aria-label={tr(ui.top)} onClick={() => scrollTo({ top: 0 })}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
      {typeof window !== 'undefined' && <Telemetry />}
    </>
  );
}

export default function App() {
  return <PrefsProvider><Page /></PrefsProvider>;
}
