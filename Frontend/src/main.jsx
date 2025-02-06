import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketProvider from './context/SocketContext.jsx';
import {Toaster} from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>

    <BrowserRouter>
    <SocketProvider>
      <App />
      <Toaster />
        </SocketProvider>
    </BrowserRouter>

    </UserContext>
    </CaptainContext>
  </StrictMode>
)
