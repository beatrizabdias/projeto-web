import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function ArtistHeader({ artist = {} }) {
    const { name, about, image } = artist;
    const monthlyListeners = (Math.random() * 10 + 1).toFixed(1); 

    return (
        <>
            <div className="artist-header flex">
                <div className="artist-info flex">
                    <h1 className="name-artist">{name}</h1>
                    <p className="artist-description">
                        {about} 
                        <a href="#"><strong>Ver mais</strong></a>
                    </p>
                    <span>10 ouvintes mensais</span>
                </div>
            </div>

            <div className="artist-actions flex">
                <button className="play-btn">
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button className="follow-btn">
                     Seguir
                </button>
            </div>
        </>
    );
}