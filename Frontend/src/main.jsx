import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import Contextprovider from './Context/Contextprovider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Contextprovider>
        <App />
        <Toaster />
    </Contextprovider>
  </BrowserRouter>
);