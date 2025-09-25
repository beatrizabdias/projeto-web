// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import MobileNav from './components/ui/MobileNav'; 
import Player from './components/ui/Player'; 
import MobileBottomBar from './components/ui/MobileBottomBar';
import Home from './pages/home/Home';
import Playlists from './pages/playlists/Playlists';
import Albuns from './pages/albuns/Albuns';
import PlaylistDetalhe from './pages/playlists/PlaylistDetalhe';
import Pesquisa from './pages/pesquisa/Pesquisa';

//...
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        {/* Adiciona padding-top para o header e padding-bottom para o player */}
        <main style={{ flexGrow: 1, paddingTop: '80px', paddingBottom: '100px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/albuns" element={<Albuns />} />
            <Route path="/playlists/:id" element={<PlaylistDetalhe />} />
          </Routes>
        </main>
        <Footer />
        <Player />
        <MobileBottomBar />
      </div>
    </Router>
  );
}

export default App;