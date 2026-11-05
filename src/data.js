const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
// Cada tecnología: nombre, ruta devicon (o null), invertir color en modo oscuro
const t = (name, d = null, invert = false) => ({ name, icon: d && `${D}${d}.svg`, invert });

export const CV = 'https://cv.pierooof.dev/?origen=portafolio';

// Los textos traducibles son { es, en }; los demás datos son comunes a los dos idiomas.
export const links = [
  { id: 'sobre-mi', label: { es: 'Sobre mí', en: 'About' } },
  { id: 'experiencia', label: { es: 'Trayectoria', en: 'Journey' } },
  { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' } },
  { id: 'habilidades', label: { es: 'Stack', en: 'Stack' } },
  { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export const socials = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/pierooof' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/piero-funes-larios-44360a166' },
  { key: 'email', label: 'Email', href: 'mailto:pierofl2005@gmail.com' },
];

export const stack = [
  { group: { es: 'Frontend', en: 'Frontend' }, items: [t('HTML5', 'html5/html5-original'), t('CSS3', 'css3/css3-original'), t('JavaScript', 'javascript/javascript-original'), t('TypeScript', 'typescript/typescript-original'), t('React', 'react/react-original'), t('Tailwind CSS', 'tailwindcss/tailwindcss-original'), t('Bootstrap', 'bootstrap/bootstrap-original')] },
  { group: { es: 'Backend', en: 'Backend' }, items: [t('Python', 'python/python-original'), t('Flask', 'flask/flask-original', true), t('Node.js', 'nodejs/nodejs-original'), t('PHP', 'php/php-original'), t('API REST')] },
  { group: { es: 'Bases de datos', en: 'Databases' }, items: [t('MySQL', 'mysql/mysql-original', true), t('MongoDB', 'mongodb/mongodb-original')] },
  { group: { es: 'Herramientas', en: 'Tools' }, items: [t('Git', 'git/git-original'), t('GitHub', 'github/github-original', true), t('Docker', 'docker/docker-original'), t('Railway'), t('Ubuntu', 'ubuntu/ubuntu-plain', true), t('VS Code', 'vscode/vscode-original')] },
];

export const marquee = ['Python', 'Flask', 'React', 'TypeScript', 'Node.js', 'MySQL', 'MongoDB', 'Tailwind CSS', 'Git', 'Ubuntu', 'VS Code', 'Railway'];

export const experience = [
  {
    time: '03/2026 – 06/2026',
    title: { es: 'Desarrollador Web (prácticas)', en: 'Web Developer (internship)' },
    org: 'Corner Estudios',
    text: {
      es: 'Interfaces y componentes interactivos con React, TypeScript y Tailwind CSS, con vistas funcionales y diseño responsivo. Colaboración en servicios backend con Node.js integrados con el frontend.',
      en: 'Interfaces and interactive components with React, TypeScript and Tailwind CSS, with working views and responsive design. Contributed to Node.js backend services integrated with the frontend.',
    },
  },
  {
    time: '01/2023 – 04/2023',
    title: { es: 'Soporte técnico y atención al cliente', en: 'Technical support & customer service' },
    org: 'Servicios Industriales KIP E.I.R.L.',
    text: {
      es: 'Asesoría técnica, resolución de incidencias e implementación de hardware de realidad virtual (VR).',
      en: 'Technical advice, incident resolution and rollout of virtual reality (VR) hardware.',
    },
  },
];

export const education = [
  { time: { es: '09/2025 – 06/2027 (previsto)', en: '09/2025 – 06/2027 (expected)' }, title: { es: 'CFGS Desarrollo de Aplicaciones Web', en: 'Higher Vocational Degree in Web Application Development (DAW)' }, org: 'CEAC FP' },
  { time: '2023 – 2024', title: { es: 'Psicología', en: 'Psychology' }, org: 'Universidad de Lima' },
];

// Captura: archivo en img/projects/ (sin extensión) + texto alternativo bilingüe
const s = (f, es, en) => ({ src: `projects/${f}.webp`, alt: { es, en } });

export const projects = [
  {
    title: 'Resilio', pill: { es: 'En producción', en: 'In production' },
    text: {
      es: 'Plataforma para detectar el síndrome de burnout digitalizando el test BAT-12, con métricas, gráficos de resultados y consejos generados con IA.',
      en: 'Platform that detects burnout by digitising the BAT-12 test, with metrics, result charts and AI-generated advice.',
    },
    bullets: [
      { es: 'Modelo multitenant con roles (RR. HH., empleado, administrador) y un panel por rol.', en: 'Multi-tenant model with roles (HR, employee, admin) and a dashboard per role.' },
      { es: 'Backend en Flask con rutas modulares y MySQL.', en: 'Flask backend with modular routes and MySQL.' },
    ],
    tags: ['Python', 'Flask', 'MySQL', { es: 'IA', en: 'AI' }],
    shots: [
      s('resilio/dashboard', 'Panel personal con puntuación global, dimensiones y gráfico radar', 'Personal dashboard with overall score, dimensions and radar chart'),
      s('resilio/test', 'Test BAT-12', 'BAT-12 test'),
      s('resilio/historial', 'Historial de evaluaciones con consejos de IA', 'Assessment history with AI advice'),
      s('resilio/admin', 'Panel de administración: resumen del sistema, usuarios recientes y acciones rápidas', 'Admin dashboard: system overview, recent users and quick actions'),
      s('resilio/informe', 'Informe global con distribución de riesgo, media por dimensión y radar', 'Global report with risk distribution, average per dimension and radar'),
      s('resilio/login', 'Inicio de sesión', 'Sign in'),
      s('resilio/register', 'Registro', 'Sign up'),
      s('resilio/forgot', 'Recuperar contraseña', 'Password recovery'),
    ],
    demo: 'https://resilio.pierooof.dev/', code: 'https://github.com/pierooof/Resilio',
  },
  {
    title: 'Respira', pill: { es: 'En producción', en: 'In production' },
    text: {
      es: 'Calidad del aire y polen por barrio de Valencia: mapa de los 19 distritos coloreado por el índice europeo EAQI, ficha con previsión, histórico y avisos por Telegram.',
      en: 'Air quality and pollen by neighbourhood in Valencia: a map of the 19 districts coloured by the European EAQI index, with forecast, history and Telegram alerts.',
    },
    bullets: [
      { es: 'Worker en un proceso aparte (APScheduler) que guarda el histórico diario con datos de Open-Meteo respetando los límites de su API.', en: 'Separate worker process (APScheduler) that stores daily history from Open-Meteo while respecting its API limits.' },
      { es: 'Usuarios con barrios favoritos y avisos por Telegram; tests con pytest.', en: 'Users with favourite neighbourhoods and Telegram alerts; tested with pytest.' },
    ],
    tags: ['Python', 'Flask', 'MySQL', 'Leaflet', 'Telegram'],
    shots: [
      s('respira/mapa', 'Mapa de calidad del aire de Valencia', 'Valencia air quality map'),
      s('respira/ficha', 'Ficha de barrio: EAQI, contaminantes y polen', 'Neighbourhood card: EAQI, pollutants and pollen'),
      s('respira/prevision', 'Previsión de 5 días, polen por tipo e histórico', '5-day forecast, pollen by type and history'),
      s('respira/movil-mapa', 'Mapa en móvil', 'Map on mobile'),
      s('respira/movil-ficha', 'Ficha en móvil', 'Card on mobile'),
    ],
    demo: 'https://respira.pierooof.dev/', code: 'https://github.com/pierooof/Respira',
  },
  {
    title: 'CaféPunto', pill: { es: 'En producción · Docker', en: 'In production · Docker' },
    text: {
      es: 'Tarjeta de fidelización digital para cafeterías: el cliente enseña su QR, el barista suma sellos desde el móvil y al llegar a 10 la bebida es gratis.',
      en: 'Digital loyalty card for coffee shops: the customer shows a QR, the barista adds stamps from their phone, and the 10th drink is free.',
    },
    bullets: [
      { es: 'MVC propio en PHP 8.3 sin framework: router, sesiones, CSRF y límite de intentos de login.', en: 'Custom MVC in PHP 8.3 with no framework: router, sessions, CSRF and login rate limiting.' },
      { es: 'Roles de cliente, barista y administrador, escáner de QR, estadísticas y modo claro/oscuro.', en: 'Customer, barista and admin roles, QR scanner, statistics and light/dark mode.' },
      { es: 'Tests con PHPUnit y despliegue con Docker en Railway.', en: 'PHPUnit tests and Docker deployment on Railway.' },
    ],
    tags: ['PHP', 'MySQL', 'Docker', 'PHPUnit'],
    tall: true, // capturas de móvil: miniaturas más altas
    shots: [
      s('cafe/inicio', 'Pantalla de inicio', 'Home screen'),
      s('cafe/login-claro', 'Login en modo claro', 'Login in light mode'),
      s('cafe/login-oscuro', 'Login en modo oscuro', 'Login in dark mode'),
      s('cafe/registro-contrasena-visible', 'Registro con la contraseña visible', 'Sign-up with the password visible'),
      s('cafe/login-bloqueado', 'Mensaje de demasiados intentos', 'Too many attempts message'),
      s('cafe/tarjeta-cliente-claro', 'Tarjeta del cliente en modo claro', 'Customer card in light mode'),
      s('cafe/tarjeta-cliente-oscuro', 'Tarjeta del cliente en modo oscuro', 'Customer card in dark mode'),
      s('cafe/panel-barista-claro', 'Panel del barista en modo claro', 'Barista dashboard in light mode'),
      s('cafe/panel-barista-oscuro', 'Panel del barista en modo oscuro', 'Barista dashboard in dark mode'),
      s('cafe/ficha-cliente', 'Ficha de cliente con botones de sellos', 'Customer profile with stamp buttons'),
      s('cafe/equipo-claro', 'Pantalla Equipo en modo claro', 'Team screen in light mode'),
      s('cafe/equipo-oscuro', 'Pantalla Equipo en modo oscuro', 'Team screen in dark mode'),
    ],
    demo: 'https://cafe.pierooof.dev/', code: 'https://github.com/pierooof/CafePunto',
  },
  {
    title: 'RetroPlay', pill: 'E-commerce',
    text: {
      es: 'Alquiler de consolas y videojuegos retro: catálogo filtrable, carrito, pedidos y gestión de stock en tiempo real.',
      en: 'Retro console and video game rentals: filterable catalogue, cart, orders and real-time stock management.',
    },
    bullets: [
      { es: 'Panel de administración para controlar el inventario.', en: 'Admin dashboard to manage the inventory.' },
      { es: 'Frontend con JavaScript y Bootstrap sobre backend PHP.', en: 'JavaScript and Bootstrap frontend on a PHP backend.' },
    ],
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    shots: [s('retroplay/catalogo', 'Captura de Retroplay', 'RetroPlay screenshot')],
    code: 'https://github.com/samonzfu/Retroplay',
  },
];

// Textos de la interfaz
export const ui = {
  skip: { es: 'Saltar al contenido', en: 'Skip to content' },
  home: { es: 'Inicio', en: 'Home' },
  menuOpen: { es: 'Abrir menú', en: 'Open menu' },
  menuClose: { es: 'Cerrar menú', en: 'Close menu' },
  cv: { es: 'Ver CV', en: 'View CV' },
  themeToLight: { es: 'Cambiar a modo claro', en: 'Switch to light mode' },
  themeToDark: { es: 'Cambiar a modo oscuro', en: 'Switch to dark mode' },
  langSwitch: { es: 'Cambiar idioma a inglés', en: 'Switch language to Spanish' },
  badge: { es: 'Disponible para nuevas oportunidades', en: 'Open to new opportunities' },
  h1: [{ es: 'Diseño.', en: 'Design.' }, { es: 'Código.', en: 'Code.' }, { es: 'Producción.', en: 'Production.' }],
  role: { es: 'Piero Funes · Desarrollador Web Junior', en: 'Piero Funes · Junior Web Developer' },
  lead: {
    es: 'Creo herramientas y MVPs con Python y Flask, y vengo de prácticas con React, TypeScript y Node.js. Mi base en Psicología me ayuda a entender a los usuarios y convertir necesidades reales en soluciones prácticas.',
    en: 'I build tools and MVPs with Python and Flask, and I come from an internship with React, TypeScript and Node.js. My background in Psychology helps me understand users and turn real needs into practical solutions.',
  },
  ctaProjects: { es: 'Ver proyectos', en: 'View projects' },
  ctaContact: { es: 'Contacto', en: 'Contact' },
  statProjects: { es: 'proyectos en producción', en: 'projects in production' },
  statInternship: { es: 'meses de prácticas con React + Node', en: 'months interning with React + Node' },
  statDaw: { es: 'fin del ciclo DAW (previsto)', en: 'expected end of DAW degree' },
  about: { es: 'Sobre mí', en: 'About me' },
  aboutWhoami: {
    es: 'Estudiante de Desarrollo de Aplicaciones Web enfocado en crear herramientas y MVPs de forma ágil con Python y Flask.',
    en: 'Web Application Development student focused on quickly building tools and MVPs with Python and Flask.',
  },
  aboutFile: { es: 'cat contexto.txt', en: 'cat context.txt' },
  aboutContext: {
    es: 'Mi paso por Psicología y mi experiencia en soporte y atención al cliente me permiten detectar fricciones en los flujos de trabajo de los usuarios y resolverlas con software.',
    en: 'My time studying Psychology and my experience in support and customer service let me spot friction in users’ workflows and solve it with software.',
  },
  journey: { es: 'Trayectoria', en: 'Journey' },
  experience: { es: 'Experiencia', en: 'Experience' },
  education: { es: 'Formación', en: 'Education' },
  dossier: { es: 'Dossier profesional', en: 'Professional dossier' },
  dossierText: { es: 'Resumen de mi experiencia, formación y proyectos destacados.', en: 'A summary of my experience, education and featured projects.' },
  projects: { es: 'Proyectos', en: 'Projects' },
  lbClose: { es: 'Cerrar', en: 'Close' },
  lbPrev: { es: 'Anterior', en: 'Previous' },
  lbNext: { es: 'Siguiente', en: 'Next' },
  demo: { es: 'Ver demo ↗', en: 'Live demo ↗' },
  code: { es: 'Código →', en: 'Code →' },
  stack: { es: 'Stack', en: 'Stack' },
  contact: { es: 'Hablemos', en: 'Let’s talk' },
  contactCopy: {
    github: { es: 'Mira mi código', en: 'See my code' },
    linkedin: { es: 'Conectemos profesionalmente', en: 'Let’s connect professionally' },
    email: { es: 'pierofl2005@gmail.com', en: 'pierofl2005@gmail.com' },
  },
  bootLines: {
    es: ['$ systemctl start portfolio.service', '→ Cargando módulos... [Python, Flask, React, TypeScript]', '→ Conectando con pierooof... OK', '→ Listo.'],
    en: ['$ systemctl start portfolio.service', '→ Loading modules... [Python, Flask, React, TypeScript]', '→ Connecting to pierooof... OK', '→ Ready.'],
  },
  bootSkip: { es: 'Pulsa para omitir', en: 'Click to skip' },
  title: { es: 'Piero Funes | Desarrollador web junior · Python, Flask y React', en: 'Piero Funes | Junior web developer · Python, Flask & React' },
  description: {
    es: 'Portafolio de Piero Funes, desarrollador web junior. Python, Flask, React, TypeScript, MySQL y MongoDB. Proyectos en producción: Resilio, Respira y CaféPunto.',
    en: 'Portfolio of Piero Funes, junior web developer. Python, Flask, React, TypeScript, MySQL and MongoDB. Projects in production: Resilio, Respira and CaféPunto.',
  },
};
