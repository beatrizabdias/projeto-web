// src/pages/Playlists.jsx

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Dados de exemplo para simular playlists dinâmicas
const playlists = [
  { id: 1, name: "Nome playlist 1", img: "../assets/img/vacateste.jpg" },
  { id: 2, name: "Nome playlist 2", img: "../assets/img/vacateste.jpg" },
  { id: 3, name: "Nome playlist 3", img: "../assets/img/vacateste.jpg" },
  // Adicione mais playlists aqui
];


function Playlists() {
  return (
    <>
      <Header />
      
      {/* Adicione a className "content-area" ao elemento main */}
      <main className="content-area"> 
        <h1>Minhas Playlists</h1>

        {/* Sem mudanças aqui, o ajuste será no CSS */}
        <div className="playlists-container">
          {/* Botão de Adicionar Playlist */}
          <div className="add-playlist">
            <button className="btn-add-playlist"><i className="fas fa-plus"></i></button>
            <p>Nova Playlist</p>
          </div>

          {/* Renderização Dinâmica das Playlists com map() */}
          {playlists.map((playlist) => (
            <a 
              key={playlist.id} 
              href={`/playlist_detalhe?id=${playlist.id}`} 
            >
              <div className="box-playlist">
                <div className="image-container">
                  <img src={playlist.img} alt={`IMG Playlist: ${playlist.name}`} />
                </div>
                <p>{playlist.name}</p>
              </div>
            </a>
          ))}

        </div>

        {/* Formulário escondido */}
        <form hidden action="">
          <input name="plfile" type="file" />
          <input name="plname" type="text" />
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Playlists;