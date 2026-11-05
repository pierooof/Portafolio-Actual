import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: funciona en https://piero2809.github.io/Portafolio/ y en local
// publicDir: 'img' sirve las capturas desde la raíz (/projects/resilio/dashboard.webp) sin duplicarlas
export default defineConfig({ base: './', publicDir: 'img', plugins: [react()] });
