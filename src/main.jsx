import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import '../css/base.css';
import '../css/style.css';

createRoot(document.getElementById('root')).render(<App />);
