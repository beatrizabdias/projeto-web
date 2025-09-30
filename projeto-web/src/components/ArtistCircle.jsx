import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ArtistCircle = ({ id, image, name }) => {
  return (
    <Link to={`/artist/${id}`} className="artist-circle">
      <img src={image} alt={name} className="artist-image" />
      <h3 className="artist-name">{name}</h3>
    </Link>
  );
};

export default ArtistCircle;
