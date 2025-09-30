import React, { useState, useRef, useEffect } from 'react';
import { useMusicPlayer } from '../context/MusicPlayerContext'; 
import { Link } from 'react-router-dom'; 
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 

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


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;

        audio.src = currentSong.caminho;
        
        const playWhenReady = () => {
            audio.play().catch(error => {
                console.error("Tentativa de reprodução falhou (interação necessária):", error);
                setIsPlaying(false); 
            });
            audio.removeEventListener('canplay', playWhenReady);
        };

        audio.addEventListener('canplay', playWhenReady);
        
        return () => {
            audio.removeEventListener('canplay', playWhenReady);
        };

    }, [currentSong]); 

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
        
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata); 
        audio.addEventListener('ended', handleEnded);
    
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [volume]);

    const PlayPauseIcon = isPlaying ? "fas fa-pause" : "fas fa-play"; 
    const VolumeIcon = volume === 0 ? "fas fa-volume-mute" : volume < 0.5 ? "fas fa-volume-down" : "fas fa-volume-up";


    return (
        <div style={{ position: 'relative', width: '100%', padding: '10px 0' }}> 
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

            {/* BOTÃO DE TROCA DE TELA COM ROTA DINÂMICA (Mobile) */}
            <Link 
                to={detailRoute} 
                style={{
                    position: 'absolute',
                    right: '10px', 
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10, 
                    color: 'var(--orange)', 
                    textDecoration: 'none',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={(e) => e.stopPropagation()} 
            >
                <KeyboardArrowUpIcon sx={{ fontSize: '30px' }} />
            </Link>
        </div>
    );
}

export default Player;