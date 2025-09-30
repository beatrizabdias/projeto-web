import React from 'react';
import { FaPlay } from 'react-icons/fa';

const SongCard = ({ cover, title, artist }) => {
  return (
    <div className="song-card">
      <img src={cover} alt={title} className="song-card-image" />
      <div className="song-card-info">
        <h4 className="song-title">{title}</h4>
        <p className="song-artist">{artist}</p>
      </div>
      <button className="play-button">
        <FaPlay />
      </button>
    </div>
  );
};

export default SongCard;
