// src/components/MobileNav.js

import React from 'react';
import { Link } from 'react-router-dom';

function MobileNav() {
  return (
    <nav className="menu-rodape-mobile">
      <Link to="/fila">
        <button><i className="material-icons">queue_music</i></button>
        <p>Fila</p>
      </Link>
      <Link to="/playlists">
        <button><i className="material-icons">playlist_play</i></button>
        <p>Playlists</p>
      </Link>
      <Link to="/grupos">
        <button><i className="material-icons">groups</i></button>
        <p>Grupos</p>
      </Link>
      <Link to="/perfil">
        <button><i className="fa-solid fa-user"></i></button>
        <p>Perfil</p>
      </Link>
    </nav>
  );
}

export default MobileNav;