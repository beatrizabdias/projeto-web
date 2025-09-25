import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Playlists from './pages/playlists/Playlists';
import Home from './pages/home/Home';


function App() {
  return (
  
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="*" element={<h1>Página Não Encontrada (404)</h1>} />

      </Routes>
    </Router>
  );
}

export default App;
