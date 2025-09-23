import React from 'react';
import { Link } from 'react-router-dom';
import vacateste from '../../assets/img/vacateste.jpg'; // Importa a imagem

function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlists/${playlist.id}`}>
      <div className="box-playlist">
        <div className="image-container">
          <img src={playlist.imagem || vacateste} alt={playlist.nome} />
        </div>
        <p>{playlist.nome}</p>
      </div>
    </Link>
  );
}

export default PlaylistCard;