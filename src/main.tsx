import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import AppProvider from './context/AppContext'
import './styles/main.css'
import AppErrorBoundary from './components/AppErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </AppErrorBoundary>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => undefined);
  });
}
