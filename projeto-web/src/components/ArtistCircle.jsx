import React from 'react';

const ArtistCircle = ({ image, name }) => {
  return (
    <div className="artist-circle">
      <img src={image} alt={name} className="artist-image" />
      <h3 className="artist-name">{name}</h3>
    </div>
  );
};

export default ArtistCircle;
