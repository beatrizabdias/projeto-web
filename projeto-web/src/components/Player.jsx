import React, { useState, useRef, useEffect } from 'react';
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
    const { currentSong, isPlaying, togglePlayPause, setIsPlaying } = useMusicPlayer();
    
    const [progress, setProgress] = useState(0); 
    const [currentTime, setCurrentTime] = useState(0); 
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5); 

    const audioRef = useRef(null);
    
    const songName = currentSong 
        ? `${currentSong.titulo} - ${currentSong.artista}` 
        : "Nenhuma Música Tocando";

    const detailRoute = currentSong 
        ? `${MUSIC_DETAIL_PATH_BASE}${currentSong.id}` 
        : MUSIC_DETAIL_PATH_BASE;
    
    
    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => console.error("Erro ao tocar:", error));
        }
        togglePlayPause();
    };
    
    const handleVolumeChange = (event) => {
        if (event) event.stopPropagation(); 
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };
    
    const handleSeek = (event) => {
        if (event) event.stopPropagation(); 
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
    
        const bar = event.currentTarget;
        const clickPosition = event.clientX - bar.getBoundingClientRect().left;
        const clickPercent = clickPosition / bar.offsetWidth;
        
        audio.currentTime = clickPercent * audio.duration;
    };

    // ------------------------------------------------------------------
    // EFEITO 1: Controle de Música (Combinação da lógica de 'main')
    // ------------------------------------------------------------------
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;

        const isNewSong = audio.src !== currentSong.caminho;
        
        // 1. Define o novo SRC se for uma nova música
        if (isNewSong) {
             audio.src = currentSong.caminho;
             audio.load(); // Garante que a mídia será carregada
        }

        // 2. Controla a reprodução estritamente pelo estado isPlaying do Contexto
        if (isPlaying) {
            // Se o estado é 'tocando', tenta tocar
            audio.play().catch(error => {
                 console.warn("Tentativa de reprodução falhou:", error);
                 // Se falhar, atualiza o estado do contexto
                 setIsPlaying(false);
            });
        } else {
            // Se o estado é 'pausado', pausa
            audio.pause();
        }
        
        // Esta função de limpeza (return) foi removida, pois não é necessária
        // com esta nova abordagem que depende do estado 'isPlaying'.
    }, [currentSong, isPlaying]); // Depende tanto da música quanto do estado de reprodução
    
    // ------------------------------------------------------------------


    // --- EFEITO 2: Listeners e UI Updates (inalterado, mas crucial) ---
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.volume = volume; 
    
        const handleTimeUpdate = () => {
            if (audio.duration) {
                setCurrentTime(audio.currentTime);
                const currentProgress = (audio.currentTime / audio.duration) * 100;
                setProgress(currentProgress);
            }
        };
    
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };
    
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            audio.currentTime = 0;
        };
        
        // Este listener é CRÍTICO para manter o estado do contexto sincronizado com o DOM
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata); 
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay); 
        audio.addEventListener('pause', handlePause);
    
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [volume]);


    // Lógica Dinâmica para os Ícones (Font Awesome)
    const PlayPauseIcon = isPlaying ? "fas fa-pause" : "fas fa-play"; 
    const VolumeIcon = volume === 0 ? "fas fa-volume-mute" : volume < 0.5 ? "fas fa-volume-down" : "fas fa-volume-up";


    return (
        // Mantido o estilo de 'main' que garante o fundo transparente e posição relativa
        <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'transparent' }}> 
            
            <audio ref={audioRef} src={""} preload="metadata" />
            
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
                    <button className="controle-btn" onClick={(e) => e.stopPropagation()}> 
                        <i className="fas fa-backward"></i>
                    </button>
                    
                    <button 
                        className="play-pause-btn"
                        onClick={handlePlayPause} 
                    >
                        <i className={PlayPauseIcon}></i> 
                    </button>
                    
                    <button className="controle-btn" onClick={(e) => e.stopPropagation()}> 
                        <i className="fas fa-forward"></i>
                    </button>
                </div>

                <p className="song-info">{songName}</p> 
                
                <div className="volume-control">
                    <i className={VolumeIcon}></i>
                    <input 
                        type="range"
                        min="0" max="1" step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            </div>

            {/* Link para a página da música com ícone MUI */}
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