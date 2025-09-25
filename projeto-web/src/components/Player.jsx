// src/components/Player.jsx

import React from 'react';

function Player() {
  return (
    <>
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
    </>
  );
}

export default Player;