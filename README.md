# Portafolio

Portafolio personal de Piero Funes, desarrollador web junior: <https://portafolio.pierooof.dev/>

Hecho con React 18 y Vite, sin librerías de UI. Bilingüe (ES/EN), tema claro/oscuro y proyectos en cascada con visor de capturas.

## Uso

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # genera dist/ y prerenderiza el HTML (scripts/prerender.mjs)
npm run preview  # sirve dist/ en local
```

## Estructura

- `src/data.js`: todo el contenido (proyectos, trayectoria, stack, textos ES/EN). Para añadir un proyecto basta con editar este archivo.
- `src/App.jsx`: secciones de la página. `src/driver.js`: un solo listener de scroll que mueve el raíl de progreso y la cascada de proyectos.
- `DESIGN.md`: concepto y sistema de diseño (paleta, tipografía, rejilla, movimiento).
- `css/base.css`: sistema de diseño reutilizable (tokens, tipografía, botones, tarjetas). `css/style.css`: estilos del portafolio.
- `img/`: se sirve desde la raíz (`publicDir`): iconos, `og-image.png` y capturas en `img/projects/<proyecto>/*.webp`.

## Formulario de contacto

Usa [Web3Forms](https://web3forms.com): pide una clave con tu correo y pégala en `FORM_KEY` (`src/data.js`). Mientras esté vacía, el formulario no se muestra.

## Despliegue

Lo hace Cloudflare a partir de `dist/` (ver `wrangler.jsonc`).
