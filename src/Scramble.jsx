import { useEffect, useRef, useState } from 'react';

// Sin W, M, @, % ni & (son anchas y se solaparían con las letras vecinas)
const CHARS = 'ABCDEFGHIJKLNOPQRSTUVXYZ0123456789#$<>/\\{}[]=+*';

// Al pasar el cursor, las letras se cambian por caracteres aleatorios y se resuelven una a una.
// El texto real (.sc-ghost) fija siempre el tamaño de la caja y queda invisible durante el efecto.
// Cada letra animada se dibuja encima (posición absoluta), centrada sobre su letra original,
// así que el diseño no se mueve y tampoco se recorta nada.
export default function Scramble({ text, as: Tag = 'span', ...rest }) {
  const [anim, setAnim] = useState(null);
  const box = useRef();     // contenedor .sc
  const ghost = useRef();   // texto real
  const cells = useRef([]); // posición de cada letra: { l, t, w, h }
  const timer = useRef();
  useEffect(() => () => clearInterval(timer.current), []);

  const measure = () => {
    const node = ghost.current?.firstChild;
    if (!node) return false;
    const origin = box.current.getBoundingClientRect();
    const range = document.createRange();
    cells.current = [...text].map((_, i) => {
      range.setStart(node, i); range.setEnd(node, i + 1);
      const r = range.getClientRects()[0];
      return r ? { l: r.left - origin.left, t: r.top - origin.top, w: r.width, h: r.height } : null;
    });
    return true;
  };

  const run = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer.current);
    if (!measure()) return;
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      if (frame / 2 >= text.length) { clearInterval(timer.current); setAnim(null); return; }
      setAnim([...text].map((c, i) => (c === ' ' || i < frame / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)])));
    }, 30);
  };

  return (
    <Tag {...rest} onMouseEnter={run} onFocus={run} aria-label={text}>
      <span className="sc" ref={box}>
        <span className={`sc-ghost${anim === null ? '' : ' hide'}`} ref={ghost}>{text}</span>
        {anim !== null && (
          <span className="sc-live" aria-hidden="true">
            {anim.map((c, i) => cells.current[i] && c !== ' ' && (
              <span key={i} style={{ left: cells.current[i].l, top: cells.current[i].t, width: cells.current[i].w, height: cells.current[i].h, lineHeight: `${cells.current[i].h}px` }}>{c}</span>
            ))}
          </span>
        )}
      </span>
    </Tag>
  );
}
