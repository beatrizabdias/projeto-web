import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FaPlay } from 'react-icons/fa';
 
const LIMITE_CARACTERES = 280; 
const monthlyListeners = (Math.random() * 10 + 1).toFixed(1);

export default function ArtistHeader({ artist = {} }) {
    const { name, about, image } = artist;

    const [isExpanded, setIsExpanded] = useState(false);
    const [estaSeguindo, setEstaSeguindo] = useState(false);

    const isLongText = about && about.length > LIMITE_CARACTERES;

    const handleToggleExpand = (e) => {
        e.preventDefault(); 
        setIsExpanded(!isExpanded);
    };
    
    const handleFollowClick = () => {
        setEstaSeguindo(!estaSeguindo);
    };

    const displayedText = isExpanded || !isLongText 
        ? about 
        : about.substring(0, LIMITE_CARACTERES) + '...';

    const textoBotao = estaSeguindo ? 'Seguindo' : 'Seguir';
    const classeCondicional = estaSeguindo ? 'following' : '';


    return (
        <>
            <div className="artist-header flex">
                <div className="artist-info flex">
                    <h1 className="name-artist">{name}</h1>
                    <p className="artist-description">
                        {displayedText} 
                        
                        {isLongText && (
                            <a href="#" onClick={handleToggleExpand}>
                                <strong>
                                    {isExpanded ? ' Ver menos' : ' Ver mais'}
                                </strong>
                            </a>
                        )}
                    </p>
                    <span>{monthlyListeners} Milhões de ouvintes mensais</span>
                </div>
            </div>

            <div className="artist-actions flex">
                <button className="play-btn">
                    <FaPlay />
                </button>
                <button 
                    className={`follow-btn ${classeCondicional}`} 
                    onClick={handleFollowClick}
                >
                    {textoBotao}
                </button>
            </div>
        </>
    );
}