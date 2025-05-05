import { HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './style/index.css'

import App from './modules/app/App.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)