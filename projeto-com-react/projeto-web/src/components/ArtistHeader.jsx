import React from 'react';

const ArtistHeader = () => {
  return (
    <div className="artist-header flex">
      <div className="artist-info flex">
        <h1 className="username">username</h1>
        <p className="artist-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, inventore quisquam fuga vel...{' '}
          <a href="#">
            <strong>Ver mais</strong>
          </a>
        </p>
        <span>10 ouvintes mensais</span>
      </div>
    </div>
  );
};

export default ArtistHeader;