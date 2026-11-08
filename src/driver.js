// El "driver" de la página: una sola variable (progreso de scroll, 0..1) mueve todo lo que lleva el concepto.
//  · el punto ámbar del raíl (.spine) y los ticks, colocados donde empieza cada sección de verdad
//  · la cascada de proyectos (cada tarjeta se pega un poco más abajo y la tapada se encoge y oscurece)
//  · data-dir en <html> (down|up): la telemetría fija se aparta al bajar
// Un único listener de scroll, pasivo; el reposo (punto latiendo, cinta) vive en CSS.
export function startDriver() {
  const root = document.documentElement;
  const spine = document.querySelector('.spine');
  const ticks = [...spine.querySelectorAll('a')];
  const secs = ticks.map(a => document.getElementById(a.hash.slice(1)));
  const cards = [...document.querySelectorAll('.project-card')];
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const tops = [], at = [];
  let max = 1, on = -1, last = scrollY;

  const layout = () => {
    max = Math.max(1, root.scrollHeight - innerHeight);
    // Una tarjeta más alta que la pantalla se pega más arriba para verse entera
    const base = innerWidth <= 860 ? 76 : 96;
    cards.forEach((c, i) => { tops[i] = Math.min(base + i * 14, innerHeight - c.offsetHeight - 12); c.style.setProperty('--top', tops[i] + 'px'); });
    secs.forEach((s, i) => { at[i] = Math.min(1, Math.max(0, (s.getBoundingClientRect().top + scrollY - 2) / max)); ticks[i].style.setProperty('--at', at[i]); });
    spine.style.setProperty('--h', spine.querySelector('.spine-track').clientHeight + 'px');
  };

  const frame = () => {
    const y = scrollY, p = Math.min(1, Math.max(0, y / max));
    spine.style.setProperty('--p', p);
    const now = at.reduce((k, v, i) => (v <= p + 0.002 ? i : k), 0);
    if (now !== on) { ticks[on]?.classList.remove('on'); ticks[now].classList.add('on'); ticks[now].setAttribute('aria-current', 'true'); ticks[on]?.removeAttribute('aria-current'); on = now; }
    root.toggleAttribute('data-away', y > innerHeight * 0.6);
    if (Math.abs(y - last) > 6) { root.dataset.dir = y > last ? 'down' : 'up'; last = y; }
    if (still.matches) return;
    cards.forEach((c, i) => {
      if (!cards[i + 1]) return;
      const q = Math.min(1, Math.max(0, 1 - (cards[i + 1].getBoundingClientRect().top - tops[i + 1]) / c.offsetHeight));
      c.style.scale = 1 - q * 0.05;
      c.style.filter = q ? `brightness(${1 - q * 0.4})` : '';
    });
  };

  const relayout = () => { layout(); frame(); };
  // La altura de las tarjetas cambia con el idioma, las fuentes o el ancho: recalcula en cada caso
  const ro = new ResizeObserver(relayout);
  cards.forEach(c => ro.observe(c));
  ro.observe(root);
  addEventListener('scroll', frame, { passive: true });
  addEventListener('resize', relayout);
  document.fonts?.ready.then(relayout);
  relayout();
  return () => { removeEventListener('scroll', frame); removeEventListener('resize', relayout); ro.disconnect(); };
}
