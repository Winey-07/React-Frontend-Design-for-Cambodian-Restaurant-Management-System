import { StrictMode } from 'react' // the brain
import { createRoot } from 'react-dom/client' // the browser
import './index.css'
import App from './App.jsx'
import Reaksa from './app/Reaksa.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Reaksa/>
  </StrictMode>,
)
