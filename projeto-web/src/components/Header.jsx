// src/components/Header.jsx

import React from 'react';
// Importe seu CSS aqui, por exemplo:
import '../index.css'; 
import '../pages/playlists/Playlists.css'; 

function Header() {
  return (
    <header>
      {/* Menu Superior */}
      <nav className="menu-cima">
        <a href="/">
          <img src="../assets/img/vaca-logo.png" alt="Logo Moosica" />
        </a>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="search" />
        </div>
        <div className="theme-switch-container" id="theme-toggle">
          <i className="fas fa-sun" id="sun-icon"></i>
          <i className="fas fa-moon" id="moon-icon"></i>
          <span className="theme-toggle-btn"></span>
        </div>
      </nav>

      {/* Menu Lateral */}
      <nav className="menu-lateral">
        <a href="#fila">
          <button><i className="material-icons">queue_music</i></button>
        </a>
        <a href="/playlists">
          <button><i className="material-icons">playlist_play</i></button>
        </a>
        <a href="/grupos">
          <button><i className="material-icons">groups</i></button>
        </a>
        <a href="/perfil">
          <button className="btn-profile"><i className="fa-solid fa-user"></i></button>
        </a>
      </nav>
    </header>
  );
}

export default Header;