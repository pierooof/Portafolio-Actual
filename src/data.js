const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
// Cada tecnología: nombre, ruta devicon (o null), invertir color
const t = (name, d = null, invert = false) => ({ name, icon: d && `${D}${d}.svg`, invert });

export const CV = 'https://cv.pierooof.dev/?origen=portafolio';

export const links = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Trayectoria' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Stack' },
  { id: 'contacto', label: 'Contacto' },
];

export const socials = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/pierooof' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/piero-funes-larios-44360a166' },
  { key: 'email', label: 'Email', href: 'mailto:pierofl2005@gmail.com' },
];

export const stack = [
  { group: 'Frontend', items: [t('HTML5', 'html5/html5-original'), t('CSS3', 'css3/css3-original'), t('JavaScript', 'javascript/javascript-original'), t('TypeScript', 'typescript/typescript-original'), t('React', 'react/react-original'), t('Tailwind CSS', 'tailwindcss/tailwindcss-original'), t('Bootstrap', 'bootstrap/bootstrap-original')] },
  { group: 'Backend', items: [t('Python', 'python/python-original'), t('Flask', 'flask/flask-original', true), t('Node.js', 'nodejs/nodejs-original'), t('PHP', 'php/php-original'), t('API REST')] },
  { group: 'Bases de datos', items: [t('MySQL', 'mysql/mysql-original', true), t('MongoDB', 'mongodb/mongodb-original')] },
  { group: 'Herramientas', items: [t('Git', 'git/git-original'), t('GitHub', 'github/github-original', true), t('Docker', 'docker/docker-original'), t('Railway'), t('Ubuntu', 'ubuntu/ubuntu-plain', true), t('VS Code', 'vscode/vscode-original')] },
];

export const marquee = ['Python', 'Flask', 'React', 'TypeScript', 'Node.js', 'MySQL', 'MongoDB', 'Tailwind CSS', 'Git', 'Ubuntu', 'VS Code', 'Railway'];

export const experience = [
  { time: '03/2026 – 06/2026', title: 'Desarrollador Web (prácticas)', org: 'Corner Estudios', text: 'Interfaces y componentes interactivos con React, TypeScript y Tailwind CSS, con vistas funcionales y diseño responsivo. Colaboración en servicios backend con Node.js integrados con el frontend.' },
  { time: '01/2023 – 04/2023', title: 'Soporte técnico y atención al cliente', org: 'Servicios Industriales KIP E.I.R.L.', text: 'Asesoría técnica, resolución de incidencias e implementación de hardware de realidad virtual (VR).' },
];

export const education = [
  { time: '09/2025 – 06/2027 (previsto)', title: 'CFGS Desarrollo de Aplicaciones Web', org: 'CEAC FP' },
  { time: '2023 – 2024', title: 'Psicología', org: 'Universidad de Lima' },
];

export const projects = [
  {
    title: 'Resilio', img: 'Resiliopanel.png', alt: 'Panel de administración de Resilio', pill: 'En producción',
    text: 'Plataforma para detectar el síndrome de burnout digitalizando el test BAT-12, con métricas, gráficos de resultados y consejos generados con IA.',
    bullets: ['Modelo multitenant con roles (RR. HH., empleado, administrador) y un panel por rol.', 'Backend en Flask con rutas modulares y MySQL.'],
    tags: ['Python', 'Flask', 'MySQL', 'IA'],
    demo: 'https://resilio.pierooof.dev/', code: 'https://github.com/pierooof/Resilio',
  },
  {
    title: 'Respira', brand: 'respira', pill: 'En producción',
    text: 'Calidad del aire y polen por barrio de Valencia: mapa de los 19 distritos coloreado por el índice europeo EAQI, ficha con previsión, histórico y avisos por Telegram.',
    bullets: ['Worker en un proceso aparte (APScheduler) que guarda el histórico diario con datos de Open-Meteo respetando los límites de su API.', 'Usuarios con barrios favoritos y avisos por Telegram; tests con pytest.'],
    tags: ['Python', 'Flask', 'MySQL', 'Leaflet', 'Telegram'],
    demo: 'https://respira.pierooof.dev/', code: 'https://github.com/pierooof/Respira',
  },
  {
    title: 'CaféPunto', brand: 'cafe', pill: 'En producción · Docker',
    text: 'Tarjeta de fidelización digital para cafeterías: el cliente enseña su QR, el barista suma sellos desde el móvil y al llegar a 10 la bebida es gratis.',
    bullets: ['MVC propio en PHP 8.3 sin framework: router, sesiones, CSRF y límite de intentos de login.', 'Roles de cliente, barista y administrador, escáner de QR, estadísticas y modo claro/oscuro.', 'Tests con PHPUnit y despliegue con Docker en Railway.'],
    tags: ['PHP', 'MySQL', 'Docker', 'PHPUnit'],
    demo: 'https://cafe.pierooof.dev/', code: 'https://github.com/pierooof/CafePunto',
  },
  {
    title: 'RetroPlay', img: 'Retroplay.png', alt: 'Captura de Retroplay', pill: 'E-commerce',
    text: 'Alquiler de consolas y videojuegos retro: catálogo filtrable, carrito, pedidos y gestión de stock en tiempo real.',
    bullets: ['Panel de administración para controlar el inventario.', 'Frontend con JavaScript y Bootstrap sobre backend PHP.'],
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    code: 'https://github.com/samonzfu/Retroplay',
  },
];
