import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: funciona en cualquier ruta (Cloudflare, dominio propio) y en local
// publicDir: 'img' sirve las capturas desde la raíz (/projects/resilio/dashboard.webp) sin duplicarlas
export default defineConfig({ base: './', publicDir: 'img', plugins: [react()] });
