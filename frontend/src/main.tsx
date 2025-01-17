import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// We need to remove remove react strict mode in order to prevent useEffect from running twice on development mode.
createRoot(document.getElementById('root')!).render(
  <App />
)
