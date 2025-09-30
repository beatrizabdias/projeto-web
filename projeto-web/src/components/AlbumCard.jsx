import React from 'react';
import { FaPlay } from 'react-icons/fa';

const AlbumCard = ({ cover, title, artist }) => {
  return (
    <div className="card">
      <img src={cover} alt={title} className="card-image" />
      <div className="card-info">
        <h4 className="card-title">{title}</h4>
        <p className="card-artist">{artist}</p>
      </div>
      <button className="play-button">
        <FaPlay />
      </button>
    </div>
  );
};

export default AlbumCard;