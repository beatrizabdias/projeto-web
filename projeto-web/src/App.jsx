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
import Grupos from './pages/grupos/Grupos.jsx';
<<<<<<< Updated upstream
import Artistas from './pages/artists/Artist.jsx';
=======
import AlbumDetail from './pages/albuns/AlbumDetail';
import ArtistDetail from './pages/artists/ArtistDetail';
import PlaylistDetail from './pages/playlists/PlaylistDetail';
import SongDetail from './pages/musicas/SongDetail.jsx';
>>>>>>> Stashed changes


function App() {
  return (
    <Router>
      <MusicPlayerProvider>
        <Header />
        
        <main className="main-content-area">
          <Routes>        
            <Route path="/" element={<Home />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/:id" element={<PlaylistDetalhe />} /> 
            <Route path="/pesquisa" element={<Pesquisa />} />
            <Route path="/musica/:id" element={<TelaMusica />} />
            <Route path="/uploadmusica" element={<UploadM />} />
            <Route path="/grupos" element={<Grupos />} />
<<<<<<< Updated upstream
            <Route path="/artistas" element={<Artistas />} />
=======

            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/albumDetail/:id" element={<AlbumDetail />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/playlistDetail/:id" element={<PlaylistDetail />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            <Route path="/artistDetail/:id" element={<ArtistDetail />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />

>>>>>>> Stashed changes
            <Route path="*" element={<main><h1>Página Não Encontrada (404)</h1></main>} />
          </Routes>
        </main>
        <Footer />
      </MusicPlayerProvider>
    </Router>
  );
}

export default App;