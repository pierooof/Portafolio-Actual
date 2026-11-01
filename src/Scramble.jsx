import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@<>/\\{}[]=+*';

// Al pasar el cursor, las letras se cambian por caracteres aleatorios y se resuelven una a una.
// El texto real (.sc-ghost) fija siempre el tamaño de la caja; el texto animado (.sc-live) se
// dibuja encima sin aportar ancho, así que el diseño no se mueve durante el efecto.
export default function Scramble({ text, as: Tag = 'span', ...rest }) {
  const [anim, setAnim] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearInterval(timer.current), []);

  const run = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      if (frame / 2 >= text.length) { clearInterval(timer.current); setAnim(null); return; }
      setAnim([...text].map((c, i) => (c === ' ' || i < frame / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''));
    }, 30);
  };

  return (
    <Tag {...rest} onMouseEnter={run} onFocus={run} aria-label={text}>
      <span className="sc">
        <span className={`sc-ghost${anim === null ? '' : ' hide'}`}>{text}</span>
        {anim !== null && <span className="sc-live" aria-hidden="true">{anim}</span>}
      </span>
    </Tag>
  );
}
