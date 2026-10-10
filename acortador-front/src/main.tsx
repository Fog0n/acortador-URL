import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'      // Bootstrap 5 completo (CSS + utilidades: grid, table-responsive, badges, alerts…)

import './styles.css'     // Ajustes propios del acortador (responsive) — va después para poder sobreescribir
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
