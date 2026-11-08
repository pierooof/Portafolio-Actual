# DESIGN.md: rediseño del portafolio de Piero Funes

Stack: el que ya había (Vite + React 18, CSS con tokens). Sin librerías nuevas de movimiento: un solo módulo
de scroll (`src/driver.js`) y animaciones CSS. Reason: el sitio es de una página, GSAP/Lenis no aportan nada que CSS no haga.

## Brief
- Sujeto: Piero Funes, desarrollador web junior (Python/Flask, React). Viene de Psicología y de soporte al cliente.
- Audiencia: reclutadores y equipos que contratan a un junior. Trabajo: que le contraten (prácticas/primer empleo).
- Contenido: el de `src/data.js` (4 proyectos, 3 en producción con demo real). Sin datos inventados.

## Concept Card
Idea:        Un scroll lleva una necesidad desde el diseño hasta el deploy, y el punto ámbar del logo es el "en vivo".
Anclaje:     En el logo pierooof.dev el punto de ".dev" es ámbar, y es el único elemento ámbar de la marca. Tres de sus
             proyectos están publicados de verdad en subdominios propios.
Metáfora:    Un pipeline de publicación: observar al usuario, construir, publicar, hablar.
Signature:   El punto ámbar. Es el punto final del titular, viaja por el raíl derecho con el scroll (y se enciende en cada
             sección). Las demos reales del héroe llevan su propio punto ámbar.
Emotion:     Seguridad tranquila: poster tipográfico, gran escala, un solo color vivo.
Motion verb: "resolver" (las letras se resuelven, los botones se inundan de ámbar de izquierda a derecha, las tarjetas se
             pegan una sobre otra).
Screenshot:  Titular gigante "Del diseño / al deploy●" con el punto ámbar latiendo y tres demos reales debajo.

## Sistema
- Paleta (por rol). Oscuro: ground #08110e, surface #101b17, ink #edf3ef, muted #8fa59b, line #20302a, primary #5cb79a, live #f0b44c.
  Claro: ground #e2e9df, surface #f6f8f3, ink #0b2019, muted #4b625a, line #b4c4b9, primary #1f6f58, live #c98510.
  Verde pino + menta + ámbar son los de la marca; lo nuevo es la profundidad del fondo y que el ámbar se use solo para "vivo".
- Tipografía: Bricolage Grotesque Variable (titulares, 600-700, tracking -0.045em) · Hanken Grotesk Variable (texto 17px) ·
  JetBrains Mono Variable (etiquetas, 12-13px, mayúsculas).
- Rejilla: 12 columnas, gutter 1.5rem, contenedor 1240px, margen lateral clamp(1.25rem, 5vw, 4.5rem).
- Forma: tarjeta 20px, imagen 10px, controles en píldora.
- Movimiento: ease cubic-bezier(.2,.7,.2,1); 200ms controles, 700-900ms entradas. Todo con transform/opacity/clip-path.
- Reposo (idle): el punto ámbar late, la cinta de tecnologías avanza, las demos del héroe flotan 3-4px. Todo se apaga con reduced-motion.

## Composición (una familia de layout por sección)
```
HERO     titular a sangre (2 líneas, 10vw)  |  debajo: lead+CTA (5 col)  collage escalonado de 3 demos (7 col) | cinta
SOBRE MÍ etiqueta pequeña a la izquierda, afirmación enorme a la derecha, párrafo corto en media columna
TRAYECT. título sticky a la izquierda (5 col), lista de filas con fecha mono a la derecha (7 col)
PROYECT. título gigante arriba, tarjetas a todo el ancho en cascada, cada una con su tinte (color-mix del acento del proyecto)
STACK    filas: etiqueta mono + nombres a 2.4rem con icono, que se resuelven al pasar el cursor
CONTACTO "Hablemos" a todo el ancho, email gigante, GitHub/LinkedIn como filas, formulario al lado
FOOTER   wordmark pierooof.dev a todo el ancho con el punto ámbar
```

## Genericness test
Un modelo genérico haría héroe centrado con degradado, tres tarjetas iguales y chips. Aquí: titular poster con el punto de la
marca como signo de puntuación, raíl de progreso que mide secciones reales, filas tipográficas en
lugar de chips. Cambiado respecto al primer borrador: la cinta de telemetría fija se aparta al bajar (no tapa contenido).
