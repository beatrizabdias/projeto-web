// Player.jsx (Código REVISADO para exibir o nome da música)

import React, { useState, useEffect } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext'; 
import { Link } from 'react-router-dom'; 
import { IconButton } from '@mui/material'; 
import AlbumIcon from '@mui/icons-material/Album'; 

const MUSIC_DETAIL_PATH_BASE = '/musica/'; 

const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function Player() {
    // DESESTRUTURANDO AS NOVAS FUNÇÕES
    const { 
        currentSong, isPlaying, togglePlayPause, 
        currentTime, duration, setVolume, seekTo, volume: contextVolume,
        skipNext, 
        skipPrevious 
    } = useMusicPlayer();
    
    const [localVolume, setLocalVolume] = useState(contextVolume);

    useEffect(() => {
        setLocalVolume(contextVolume);
    }, [contextVolume]);

    // CORREÇÃO AQUI: Usando 'title' e 'artist' em vez de 'titulo' e 'artista'
    const songName = currentSong 
        ? `${currentSong.title} - ${currentSong.artist}` 
        : "Nenhuma Música Tocando";

    const detailRoute = currentSong 
        ? `${MUSIC_DETAIL_PATH_BASE}${currentSong.id}` 
        : MUSIC_DETAIL_PATH_BASE;
    
    const handlePlayPause = (e) => {
        e.stopPropagation();
        togglePlayPause();
    };
    
    const handleVolumeChange = (event) => {
        if (event) event.stopPropagation(); 
        const newVolume = parseFloat(event.target.value);
        setLocalVolume(newVolume);
        setVolume(newVolume); 
    };
    
    const handleSeek = (event) => {
        if (event) event.stopPropagation(); 
        if (!duration) return;
    
        const bar = event.currentTarget;
        const clickPosition = event.clientX - bar.getBoundingClientRect().left;
        const clickPercent = clickPosition / bar.offsetWidth;
        
        const newTime = clickPercent * duration;
        seekTo(newTime); 
    };
    
    const handleSkipNext = (e) => {
        e.stopPropagation();
        if (currentSong) skipNext(); 
    }
    
    const handleSkipPrevious = (e) => {
        e.stopPropagation();
        if (currentSong) skipPrevious();
    }
    
    const progress = (currentTime / duration) * 100 || 0;

    const PlayPauseIcon = isPlaying ? "fas fa-pause" : "fas fa-play"; 
    const VolumeIcon = localVolume === 0 ? "fas fa-volume-mute" : localVolume < 0.5 ? "fas fa-volume-down" : "fas fa-volume-up";

    return (
        <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'transparent' }}> 
            
            {/* Container da Barra de Progresso e Tempos */}
            <div className="barra-progresso-container">
                <span className="current-time">{formatTime(currentTime)}</span>
                <div 
                    className="barra-progresso"
                    onClick={handleSeek}
                >
                    <div 
                        className="progresso" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
                <span className="duration-time">{formatTime(duration)}</span>
            </div>

            <div className="player">
                <div className="controle-musica">
                    {/* Botão de VOLTAR */}
                    <button className="controle-btn" onClick={handleSkipPrevious}> 
                        <i className="fas fa-backward"></i>
                    </button>
                    
                    <button 
                        className="play-pause-btn"
                        onClick={handlePlayPause} 
                    >
                        <i className={PlayPauseIcon}></i> 
                    </button>
                    
                    {/* Botão de PULAR */}
                    <button className="controle-btn" onClick={handleSkipNext}> 
                        <i className="fas fa-forward"></i>
                    </button>
                </div>

                {/* Exibindo o nome da música corrigido */}
                <p className="song-info">{songName}</p> 
                
                <div className="volume-control">
                    <i className={VolumeIcon}></i>
                    <input 
                        type="range"
                        min="0" max="1" step="0.01"
                        value={localVolume} 
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            </div>

            <Link 
                to={detailRoute} 
                style={{
                    position: 'absolute',
                    right: '10px', 
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10, 
                }}
                onClick={(e) => e.stopPropagation()} 
            >
                <IconButton
                    aria-label="Abrir página da música"
                    disabled={!currentSong} 
                    sx={{ 
                        color: 'var(--orange)', 
                        '&:hover': { backgroundColor: 'rgba(255, 117, 51, 0.1)' } 
                    }}
                >
                    <AlbumIcon sx={{ fontSize: '30px' }} /> 
                </IconButton>
            </Link>
        </div>
    );
}

export default Player;