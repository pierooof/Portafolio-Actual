# Reglas del proyecto

## Después de cada cambio, pruébalo antes de darlo por terminado

Hazlo siempre, también en cambios pequeños de CSS o de contenido. Arranca el servidor con `preview_start` (configuración `dev` de `launch.json`) y comprueba:

1. **Compilación**: `npm run build` termina sin errores.
2. **Móvil**: con `resize_window` en `mobile` (375x812) y también en 375x667. Sin scroll horizontal, nada cortado ni tapado por la barra fija, menú hamburguesa y visor de capturas funcionan.
3. **Escritorio**: tamaño normal y 768 de ancho (tablet).
4. **Claro y oscuro**: cambia el tema con el botón de la barra (o `colorScheme` de `resize_window`) y revisa que los textos se lean y no haya colores rotos en ninguno.
5. **Idioma**: alterna ES/EN; los textos largos no deben desbordar ni cambiar la altura de las tarjetas de forma que se rompa la cascada.
6. **Que no se rompa nada**: recorre la página entera de arriba abajo: hero, sobre mí, trayectoria, proyectos (cascada: cada tarjeta se pega arriba y la anterior se encoge, el título nunca queda bajo la barra), visor de capturas (abrir, flechas, Esc), stack y contacto. Revisa la consola: sin errores.
7. **Limpieza**: deja el tamaño de ventana en `desktop` (`resize_window` preset `desktop`) y para el servidor con `preview_stop`.

**Ojo al medir posiciones con JS**: `.reveal` desplaza 24 px (`translateY`) con una transición de 0,7 s y solo se activa cuando el `IntersectionObserver` recibe fotogramas (el panel no pinta mientras solo se ejecuta JS). Medir con eso en marcha da "fallos" de 8, 16 o 24 px que no son bugs (pasó con la tarjeta de RetroPlay en tablet). Las tarjetas son `sticky`, así que su `offsetTop` cambia con el scroll: lee la posición natural con `.project-card{position:relative!important;top:auto!important}` aplicado un momento. Antes de medir, inyecta `.reveal{transition:none!important;opacity:1!important;transform:none!important}` y mide con `offsetTop`/`getBoundingClientRect` tras `scrollTo(0,0)`; tras recargar espera a que el navegador restaure el scroll. Para ver capturas de lo recién desplazado, haz `wait` 2 s antes del `screenshot`.

El formulario de contacto lleva una clave real de Web3Forms: prueba con `fetch` simulado (`window.fetch = ...`), nunca envíes un mensaje real sin que el usuario lo pida. Los errores `ERR_CONNECTION_REFUSED` de la consola suelen ser de servidores anteriores ya parados: recarga y vuelve a leer. Si un cambio de CSS no se refleja en la página (la recarga en caliente de Vite a veces conserva una hoja antigua tras dos ediciones seguidas), reinicia el servidor con `preview_stop` + `preview_start` antes de dar el resultado por bueno.

Cuenta en la respuesta final qué probaste y qué no pudiste probar; no digas "funciona" sin haberlo visto.

## Notas

- El contenido (proyectos, textos ES/EN) vive en `src/data.js`; las capturas en `img/projects/<proyecto>/` en webp.
- Las animaciones deben respetar `prefers-reduced-motion`.
