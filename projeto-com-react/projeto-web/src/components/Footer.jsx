// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="barra-progresso">
        <div className="progresso"></div>
      </div>
      <div className="player">
        <div className="controle-musica">
          <button className="controle-btn"><i className="fas fa-backward"></i></button>
          <button className="play-pause-btn"><i className="fas fa-play"></i></button>
          <button className="controle-btn"><i className="fas fa-forward"></i></button>
        </div>
        <p className="song-info">Música muito legal - Artista legal</p>
      </div>
      <div className="foo">
        <p>&copy; 2025 Moosica. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;