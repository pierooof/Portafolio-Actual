import { createContext, useContext, useEffect, useState } from 'react';

// Tema (claro/oscuro) e idioma (es/en): se recuerdan en localStorage y,
// si no hay elección guardada, siguen al sistema / al idioma del navegador.
const Ctx = createContext(null);
export const usePrefs = () => useContext(Ctx);

const ssr = typeof window === 'undefined'; // durante el prerender del build
const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(key, value); } catch { /* modo privado */ } };

export function PrefsProvider({ children }) {
  const [theme, setTheme] = useState(() => (ssr ? 'dark' : document.documentElement.dataset.theme || 'dark'));
  const [lang, setLang] = useState(() => (ssr ? 'es' : read('lang', navigator.language?.startsWith('es') ? 'es' : 'en')));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1a16' : '#F1F8F5');
  }, [theme]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const toggleTheme = () => setTheme(t => { const n = t === 'dark' ? 'light' : 'dark'; save('theme', n); return n; });
  const toggleLang = () => setLang(l => { const n = l === 'es' ? 'en' : 'es'; save('lang', n); return n; });
  // tr({es, en}) devuelve el texto del idioma activo; los textos sin traducción se devuelven tal cual
  const tr = x => (x && typeof x === 'object' && !Array.isArray(x) && 'es' in x ? x[lang] : x);

  return <Ctx.Provider value={{ theme, lang, toggleTheme, toggleLang, tr }}>{children}</Ctx.Provider>;
}
