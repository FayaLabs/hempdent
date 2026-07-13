import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './plugins.generated' // registers installed plugin modules (no-op until you install one)
import './registry' // registers your custom components for manifest-driven pages

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
