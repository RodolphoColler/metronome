import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import MetronomeProvider from './context/MetronomeProvider.jsx';

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MetronomeProvider>
      <App />
    </MetronomeProvider>
  </React.StrictMode>,
);
