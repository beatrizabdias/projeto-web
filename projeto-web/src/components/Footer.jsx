// src/components/Footer.jsx

import React from 'react';
import Player from './Player';

function Footer() {
  return (
    <footer>
      {/* O Player está contido aqui */}
      <Player /> 

      <div className="foo">
        <p>&copy; 2025 Moosica. Todos os direitos reservados.</p>
      </div>

      {/* Menu Rodapé Mobile */}
      <nav className="menu-rodape-mobile">
        <a href="#fila">
          <button><i className="material-icons">queue_music</i></button>
          <p>Fila</p>
        </a>
        <a href="/playlists">
          <button><i className="material-icons">playlist_play</i></button>
          <p>Playlists</p>
        </a>
        <a href="/grupos">
          <button><i className="material-icons">groups</i></button>
          <p>Grupos</p>
        </a>
        <a href="/perfil">
          <button className="btn-profile"><i className="fa-solid fa-user"></i></button>
          <p>Perfil</p>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;