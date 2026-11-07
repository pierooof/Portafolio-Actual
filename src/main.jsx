import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource/young-serif/latin-400.css';
import '@fontsource/young-serif/latin-ext-400.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import '../css/base.css';
import '../css/style.css';

createRoot(document.getElementById('root')).render(<App />);
