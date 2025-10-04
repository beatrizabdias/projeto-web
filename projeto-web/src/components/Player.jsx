// Player.jsx (Código COMPLETO adaptado para Redux)

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { IconButton } from '@mui/material'; 
import AlbumIcon from '@mui/icons-material/Album'; 

// Importa todas as ações necessárias do seu Slice
import { 
    togglePlayPause, 
    updateCurrentTime, 
    setDuration, 
    skipNext, 
    skipPrevious,
    // Note: setVolume e seekTo precisarão ser adicionados ao playerSlice se forem usados
} from '../store/playerSlice'; 

const MUSIC_DETAIL_PATH_BASE = '/musica/'; 
const audioRef = new Audio(); // Instância única do objeto Audio fora do componente

const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function Player() {
    // 1. LER o estado do Redux Store
    const { 
        currentSong, 
        isPlaying, 
        currentTime, 
        duration, 
        volume // O volume inicial é lido do Redux
    } = useSelector((state) => state.player);
    
    // 2. DISPARAR ações
    const dispatch = useDispatch();
    
    // O volume local é mantido para o controle deslizante (slider)
    const [localVolume, setLocalVolume] = useState(volume); 

    // Efeito: Sincronizar volume local com volume do Redux na inicialização
    useEffect(() => {
        audioRef.volume = volume;
        setLocalVolume(volume);
    }, [volume]);


    // ----------------------------------------------------
    // Lógica do Áudio e Efeitos (Substituindo o Context)
    // ----------------------------------------------------

    // Efeito 1: Carregar Nova Música
    useEffect(() => {
        if (currentSong && currentSong.caminho) {
            // Se a música for a mesma, apenas garante que está pronta
            if (audioRef.src !== currentSong.caminho) {
                audioRef.src = currentSong.caminho;
                audioRef.load();
            }
            // Toca automaticamente se isPlaying for verdadeiro no Redux
            if (isPlaying) {
                audioRef.play().catch(e => console.error("Erro ao tentar tocar áudio:", e));
            }
        }
    }, [currentSong]);
    
    // Efeito 2: Sincronizar Play/Pause
    useEffect(() => {
        if (isPlaying) {
            audioRef.play().catch(e => console.error("Erro ao tentar tocar áudio:", e));
        } else {
            audioRef.pause();
        }
    }, [isPlaying]);

    // Efeito 3: Adicionar Listeners Permanentes
    useEffect(() => {
        const setAudioData = () => {
            dispatch(setDuration(audioRef.duration));
        };
        const updateTime = () => {
            dispatch(updateCurrentTime(audioRef.currentTime));
        };
        const handleEnded = () => {
             // Dispara a action para pular para a próxima no Redux
             dispatch(skipNext());
        };

        audioRef.addEventListener('loadedmetadata', setAudioData);
        audioRef.addEventListener('timeupdate', updateTime);
        audioRef.addEventListener('ended', handleEnded);

        // Limpeza dos Listeners
        return () => {
            audioRef.removeEventListener('loadedmetadata', setAudioData);
            audioRef.removeEventListener('timeupdate', updateTime);
            audioRef.removeEventListener('ended', handleEnded);
        };
    }, [dispatch]); // Depende apenas do dispatch (que é constante)


    // ----------------------------------------------------
    // Handlers (Usando Dispatch)
    // ----------------------------------------------------

    const handlePlayPause = (e) => {
        e.stopPropagation();
        // Dispara a action Redux
        dispatch(togglePlayPause()); 
    };
    
    const handleVolumeChange = (event) => {
        if (event) event.stopPropagation(); 
        const newVolume = parseFloat(event.target.value);
        setLocalVolume(newVolume);
        
        audioRef.volume = newVolume;
        
        // Se você quiser que o Redux saiba do volume, precisa de uma action 'setVolume'
        // dispatch(setVolume(newVolume)); 
    };
    
    const handleSeek = (event) => {
        if (event) event.stopPropagation(); 
        if (!duration) return;
    
        const bar = event.currentTarget;
        const clickPosition = event.clientX - bar.getBoundingClientRect().left;
        const clickPercent = clickPosition / bar.offsetWidth;
        
        const newTime = clickPercent * duration;
        
        // Ação de seek é feita diretamente no objeto Audio
        audioRef.currentTime = newTime;
        
        // Atualiza imediatamente o estado Redux para feedback visual
        dispatch(updateCurrentTime(newTime)); 
    };
    
    const handleSkipNext = (e) => {
        e.stopPropagation();
        if (currentSong) dispatch(skipNext()); // Dispara a action Redux
    }
    
    const handleSkipPrevious = (e) => {
        e.stopPropagation();
        if (currentSong) dispatch(skipPrevious()); // Dispara a action Redux
    }
    
    // ----------------------------------------------------
    // Renderização
    // ----------------------------------------------------

    const progress = (currentTime / duration) * 100 || 0;
    const songName = currentSong 
        ? `${currentSong.title} - ${currentSong.artist}` 
        : "Nenhuma Música Tocando";
    const detailRoute = currentSong 
        ? `${MUSIC_DETAIL_PATH_BASE}${currentSong.id}` 
        : MUSIC_DETAIL_PATH_BASE;
    
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