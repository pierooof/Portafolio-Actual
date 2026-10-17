import { useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@<>/\\{}[]=+*';

// Al pasar el cursor, las letras se cambian por caracteres aleatorios y se resuelven una a una.
export default function Scramble({ text, as: Tag = 'span', ...rest }) {
  const [out, setOut] = useState(text);
  const timer = useRef();

  const run = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      setOut([...text].map((c, i) => (c === ' ' || i < frame / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''));
      if (frame / 2 >= text.length) { clearInterval(timer.current); setOut(text); }
    }, 30);
  };

  return <Tag {...rest} onMouseEnter={run} onFocus={run} aria-label={text}>{out}</Tag>;
}
