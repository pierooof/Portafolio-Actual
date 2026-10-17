import { useEffect, useRef, useState } from 'react';

const host = () => {
  const ua = navigator.userAgent;
  return /Android/.test(ua) ? 'ANDROID' : /iPhone|iPad/.test(ua) ? 'IOS' : /Win/.test(ua) ? 'WINDOWS' : /Mac/.test(ua) ? 'MACOS' : /Linux/.test(ua) ? 'LINUX' : 'UNKNOWN';
};
const pad = n => String(n).padStart(2, '0');

export default function Telemetry() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [latency, setLatency] = useState(null);
  const [cpu, setCpu] = useState(18);
  const t0 = useRef(Date.now());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    // ponytail: CPU simulada con paseo aleatorio; no hay API del navegador para la carga real
    const sim = setInterval(() => setCpu(c => Math.min(95, Math.max(5, c + (Math.random() - 0.5) * 20))), 1500);
    const ping = async () => {
      const s = performance.now();
      try { await fetch(location.pathname, { method: 'HEAD', cache: 'no-store' }); setLatency(Math.round(performance.now() - s)); } catch { setLatency(null); }
    };
    ping();
    const lat = setInterval(ping, 5000);
    return () => { clearInterval(tick); clearInterval(sim); clearInterval(lat); };
  }, []);

  const s = Math.floor((now - t0.current) / 1000);
  const uptime = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
  const rows = [
    ['HOST', host()],
    ['LATENCY', latency == null ? '--' : `${latency}ms`],
    ['UPTIME', uptime],
    ['DATE', now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', ',')],
    ['TIME', now.toLocaleTimeString('en-GB')],
  ];

  return (
    <aside id="telemetry" className={open ? 'open' : ''} aria-label="Telemetría">
      <div className="tele-panel" aria-hidden={!open}>
        <div className="tele-head"><span>▲ TELEMETRY</span><button onClick={() => setOpen(false)} aria-label="Cerrar telemetría" tabIndex={open ? 0 : -1}>⌄</button></div>
        <dl>
          {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="cpu"><span>CPU_LOAD_SIM</span><span>{Math.round(cpu)}%</span></div>
        <div className="cpu-bar"><i style={{ width: `${cpu}%` }} /></div>
      </div>
      <button className="tele-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <b />SYSTEM ONLINE<span>{uptime}</span><em aria-hidden="true">⌃</em>
      </button>
    </aside>
  );
}
