import React from 'react';
import { FaPlay } from 'react-icons/fa';

export default function ArtistHeader( {name, about} ) {
    return (
        <>
            <div className="artist-header flex">
                <div className="artist-info flex">
                    <h1 className="username">{name}</h1>
                    <p className="artist-description">
                        {about} 
                        <a href="#"><strong>Ver mais</strong></a>
                    </p>
                    <span>10 ouvintes mensais</span>
                </div>
            </div>

            <div className="artist-actions flex">
                <button className="play-btn">
                    <FaPlay />
                </button>
                <button className="follow-btn">
                     Seguir
                </button>
            </div>
        </>
    );
}