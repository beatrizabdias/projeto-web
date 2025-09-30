import React from 'react';
import { FaPlay } from 'react-icons/fa';

const PlaylistCard = ({ cover, title, artist }) => {
  return (
    <div className="album-card">
      <img src={cover} alt={title} className="album-card-image" />
      <div className="album-card-info">
        <h4 className="album-title">{title}</h4>
        <p className="album-artist">{artist}</p>
      </div>
      <button className="play-button">
        <FaPlay />
      </button>
    </div>
  );
};

export default PlaylistCard;