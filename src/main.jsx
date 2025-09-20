import React from 'react'
import ReactDOM from 'react-dom/client'

import '@unocss/reset/tailwind.css' // reset similar a Tailwind
import 'uno.css'                    // 👈 genera las utilidades
import './index.css'                // tu tema base

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
