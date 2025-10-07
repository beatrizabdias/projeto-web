import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './components/Header';
import Footer from './components/Footer'; 
import FilaPage from './components/FilaPage'; 
import Home from './pages/home/Home';
import Playlists from './pages/playlists/Playlists';
import PlaylistDetalhe from './pages/playlists/PlaylistDetalhe';
import Pesquisa from './pages/pesquisa/Pesquisa';
import TelaMusica from './pages/musicas/TelaMusica.jsx';
import UploadM from './pages/musicas/criarmusica.jsx';
import Grupos from './pages/grupos/Grupos.jsx';
import GrupoDetalhe from './pages/grupos/GrupoDetalhe.jsx';
import AlbumDetail from './pages/albuns/AlbumDetail';
import Artist from './pages/artists/Artist'; 
import SongDetail from './pages/musicas/SongDetail.jsx';
import Perfil from './pages/perfil/Perfil.jsx'


function App() {
  return (
    <Router>
      
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
            <Route path="/grupos/:id" element={<GrupoDetalhe />} />
            <Route path="/artista/:id" element={<Artist />} />
            <Route path="/perfil" element={<Perfil />} />

            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/albumDetail/:id" element={<AlbumDetail />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/playlist/:id" element={<PlaylistDetalhe />} />
            <Route path="/artistDetail/:id" element={<Artist />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/fila" element={<FilaPage />} />
            <Route path="*" element={<main><h1>Página Não Encontrada (404)</h1></main>} />
          </Routes>
        </main>
        <Footer />
        
    </Router>
  );
}

export default App;