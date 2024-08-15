import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ClientProvider from './redux/ClientProvider'
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ClientProvider>
        <CssBaseline />
        <App />
    </ClientProvider>
)