import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicPlayerProvider } from './context/MusicPlayerContext';

// Componentes Fixos
import Header from './components/Header';
import Footer from './components/Footer'; // O Footer contém o Player

// Páginas que mudam
import Home from './pages/home/Home';
import Playlists from './pages/playlists/Playlists';
import PlaylistDetalhe from './pages/playlists/PlaylistDetalhe';
import Pesquisa from './pages/pesquisa/Pesquisa';
import TelaMusica from './pages/musicas/TelaMusica.jsx';
import UploadM from './pages/musicas/criarmusica.jsx';

function App() {
  return (
    <Router>
      <MusicPlayerProvider>
        <Header />
        
        <Routes>        
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<PlaylistDetalhe />} /> 
          <Route path="/pesquisa" element={<Pesquisa />} />
          <Route path="/musica/:id" element={<TelaMusica />} />
          <Route path="/uploadmusica" element={<UploadM />} />
          <Route path="*" element={<main><h1>Página Não Encontrada (404)</h1></main>} />
        </Routes>

        <Footer />
      </MusicPlayerProvider>
    </Router>
  );
}

export default App;