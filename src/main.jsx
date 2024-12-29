import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NoteApp from './NoteApp.jsx'
import Expanse from'./Expanse.jsx'
createRoot(document.getElementById('root')).render(
      // <App />
      // <NoteApp />
      <Expanse/>
)
