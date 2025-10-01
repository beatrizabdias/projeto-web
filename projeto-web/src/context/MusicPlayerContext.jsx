// MusicPlayerContext.js

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import musicasData from '../pages/musicas/musicas.json'; 


const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    
    // ESTADOS GLOBAIS
    const [currentSong, setCurrentSong] = useState(musicasData[0] || null); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); 
    const [duration, setDuration] = useState(0); 
    
    const audioRef = useRef(new Audio());

    // ⚠️ MUDANÇA CRÍTICA AQUI: O play/pause agora é controlado diretamente
    // na função para satisfazer as políticas de autoplay dos navegadores.
    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!currentSong) return;

        if (audio.paused) {
            // Tenta tocar diretamente ao receber o comando de clique
            audio.play().catch(error => {
                console.warn("Erro ao tentar tocar (Autoplay Policy?):", error);
                // Mesmo que o play falhe, o listener 'pause' irá sincronizar o isPlaying
            });
            // Definimos o estado imediatamente para dar feedback na UI
            setIsPlaying(true);
        } else {
            // Pausa (mantém a posição)
            audio.pause();
            // O listener 'pause' garantirá que o estado isPlaying seja false
        }
    };

    const playSong = (songId) => {
        const songToPlay = musicasData.find(song => song.id === songId);
        if (songToPlay) {
            // Se for a mesma música, apenas garante que toque (chama o togglePlayPause se necessário)
            if (songToPlay.id === currentSong?.id) {
                 if (audioRef.current.paused) {
                    togglePlayPause(); // Dispara o play
                 }
            } else {
                 // Nova música
                 setCurrentSong(songToPlay);
                 // O useEffect 1 e 2 tratarão o SRC e o início da reprodução
                 setIsPlaying(true);
            }
        } else {
            console.error(`Música com ID ${songId} não encontrada.`);
        }
    };
    
    const seekTo = (newTime) => {
        const audio = audioRef.current;
        if (audio && audio.duration) {
            audio.currentTime = newTime;
            setCurrentTime(newTime); 
            
            // Garante que comece a tocar após o seek, se não estiver
            if (audio.paused) { // Usa o estado DOM para verificar
                togglePlayPause(); // Dispara o play através da função de clique
            }
        }
    };
    
    // ------------------------------------------------------------------
    // Efeito 1: Carregamento de Música (roda apenas quando currentSong muda)
    // ------------------------------------------------------------------
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentSong) return;

        // Verifica se o caminho do áudio no DOM é diferente do caminho da música atual
        if (audio.src !== currentSong.caminho) {
            console.log("Música nova detectada. Carregando:", currentSong.titulo);
            audio.src = currentSong.caminho;
            audio.load(); 
            audio.currentTime = 0;
            
            setDuration(0); 
            setCurrentTime(0); 
        }
    }, [currentSong]); 

    // ------------------------------------------------------------------
    // Efeito 2: Sincronização de Reprodução (MUITO MAIS SIMPLES)
    // ------------------------------------------------------------------
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentSong) return;

        // Se o estado é 'tocando', e o áudio DOM não está, tentamos sincronizar.
        // Isso é importante caso a música tenha sido trocada rapidamente ou a inicialização falhe.
        if (isPlaying && audio.paused && audio.src === currentSong.caminho) {
             audio.play().catch(error => {
                console.warn("Tentativa de reprodução de sincronização falhou:", error);
             });
        } 
        // Se o estado é 'pausado', e o áudio DOM está tocando, sincronizamos.
        else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
        
    }, [isPlaying, currentSong]); // Mantém a dependência para cobrir trocas rápidas e MiniPlayer.


    // ------------------------------------------------------------------
    // Efeito 3: Listeners Permanentes (Roda uma vez)
    // ------------------------------------------------------------------
    useEffect(() => {
        const audio = audioRef.current;
        
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime); 
        };
        
        const handleLoadedMetadata = () => {
             setDuration(audio.duration);
        };
        
        const handleEnded = () => {
            setIsPlaying(false);
            audio.currentTime = 0; 
            setCurrentTime(0); 
        };
        
        // CORREÇÃO: Usamos os listeners handlePlay/handlePause para *forçar* a sincronização do estado isPlaying
        // Isso é crucial porque o togglePlayPause agora altera o estado do DOM primeiro.
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.volume = 0.5;

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
    }, []); 

    const setVolume = (newVolume) => {
        audioRef.current.volume = newVolume;
    }

    return (
        <MusicPlayerContext.Provider value={{ 
            musicas: musicasData,
            currentSong, 
            isPlaying, 
            currentTime,      
            duration,         
            volume: audioRef.current.volume, 
            playSong, 
            togglePlayPause,
            setVolume,        
            seekTo,           
            setCurrentSong,
            setIsPlaying, 
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};


export const useMusicPlayer = () => {
    return useContext(MusicPlayerContext);
};