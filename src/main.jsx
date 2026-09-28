import { StrictMode } from 'react' // the brain
import { createRoot } from 'react-dom/client' // the browser
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
