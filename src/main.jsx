import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CardapioProvider } from './context/CardapioContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardapioProvider>
      <App />
    </CardapioProvider>  
  </StrictMode>,
)
