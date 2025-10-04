// main.jsx (Código REVISADO para usar Redux)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Importar o Provider e o Store
import { Provider } from 'react-redux';
import { store } from './store/store'; // IMPORTANTE: Ajuste o caminho se seu store.js estiver em outro lugar!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Envolver o App com o Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);