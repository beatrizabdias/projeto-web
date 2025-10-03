// MusicPlayerContext.js (Código REVISADO)

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
// IMPORTANTE: Se você não está mais usando musicas.json e sim a fila, 
// o estado inicial da música precisa ser compatível. 
import musicasData from '../pages/musicas/musicas.json'; 


const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
    
    // ESTADOS GLOBAIS
    const [currentSong, setCurrentSong] = useState(musicasData[0] || null); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); 
    const [duration, setDuration] = useState(0); 
    
    // ESTADO DA FILA E ÍNDICE
    const [queue, setQueue] = useState([]); // Array de objetos de música
    const [queueIndex, setQueueIndex] = useState(-1); 
    
    const audioRef = useRef(new Audio());

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!currentSong) return;

        if (audio.paused) {
            audio.play().catch(error => {
                console.warn("Erro ao tentar tocar (Autoplay Policy?):", error);
            });
            setIsPlaying(true);
        } else {
            audio.pause();
        }
    };

    const playSong = (songId) => {
        // Encontra a música, seja nos mocks globais ou na fila, se for o caso.
        const songToPlay = musicasData.find(song => song.id === songId) || queue.find(song => song.id === songId);

        if (songToPlay) {
            if (songToPlay.id === currentSong?.id) {
                 if (audioRef.current.paused) {
                    togglePlayPause();
                 }
            } else {
                 setCurrentSong(songToPlay);
                 setIsPlaying(true);
                 
                 // Se estiver tocando uma música individualmente, a fila é limpa
                 const indexInQueue = queue.findIndex(s => s.id === songId);
                 if (indexInQueue === -1) {
                     setQueue([]);
                     setQueueIndex(-1);
                 } else {
                     setQueueIndex(indexInQueue);
                 }
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
            
            if (audio.paused) { 
                togglePlayPause();
            }
        }
    };

    const addPlaylistToQueue = (songs) => {
        if (songs.length === 0) return;

        setQueue(songs);
        setQueueIndex(0); 

        const firstSong = songs[0];
        setCurrentSong(firstSong); 
        setIsPlaying(true); 
    };
    
    // =========================================================
    // NOVAS FUNÇÕES: PULAR E VOLTAR
    // =========================================================

    const skipNext = () => {
        if (queueIndex !== -1 && queueIndex < queue.length - 1) {
            const nextIndex = queueIndex + 1;
            const nextSong = queue[nextIndex];
            
            setQueueIndex(nextIndex);
            setCurrentSong(nextSong);
            setIsPlaying(true);
        } else if (queueIndex === queue.length - 1 && queue.length > 0) {
            // Se for a última música, apenas pausa e volta para o início
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };
    
    const skipPrevious = () => {
        if (currentTime > 3 || queueIndex === -1 || queueIndex === 0) {
            // Se a música já tocou por mais de 3 segundos OU não está na fila OU é a primeira música
            // apenas reinicia a música atual.
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
        } else if (queueIndex > 0) {
            // Se for o início da música e não for a primeira da fila, volta para a anterior
            const prevIndex = queueIndex - 1;
            const prevSong = queue[prevIndex];

            setQueueIndex(prevIndex);
            setCurrentSong(prevSong);
            setIsPlaying(true);
        }
    };
    
    // =========================================================
    // FIM DAS NOVAS FUNÇÕES
    // =========================================================

    // ... (Restante dos useEffects mantidos)
    
    // Efeito 1: Carregamento de Música 
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentSong) return;

        const songPath = currentSong.caminho || `/assets/audio/relaxingpiano.mp3`; 

        if (audio.src !== songPath) {
            audio.src = songPath;
            audio.load(); 
            audio.currentTime = 0;
            
            setDuration(0); 
            setCurrentTime(0); 
        }
    }, [currentSong]); 

    // Efeito 2: Sincronização de Reprodução
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentSong) return;
        
        const songPath = currentSong.caminho || `/assets/audio/relaxingpiano.mp3`; 

        if (isPlaying && audio.paused && audio.src.includes(songPath.replace('/assets/audio/', ''))) {
             audio.play().catch(error => {
                console.warn("Tentativa de reprodução de sincronização falhou:", error);
             });
        } 
        else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
        
    }, [isPlaying, currentSong]);


    // Efeito 3: Listeners Permanentes (Lógica de avanço de fila)
    useEffect(() => {
        const audio = audioRef.current;
        
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime); 
        };
        
        const handleLoadedMetadata = () => {
             setDuration(audio.duration);
        };
        
        // LÓGICA DE AVANÇO DE FILA AUTOMÁTICA
        const handleEnded = () => {
            if (queueIndex !== -1 && queueIndex < queue.length - 1) {
                const nextIndex = queueIndex + 1;
                const nextSong = queue[nextIndex];

                setQueueIndex(nextIndex);
                setCurrentSong(nextSong); 
            } else {
                // Fim da fila: reseta e para
                setIsPlaying(false);
                audio.currentTime = 0; 
                setCurrentTime(0); 
                setQueueIndex(-1);
                setQueue([]);
            }
        };
        
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
    // Dependências CRUCIAIS para a fila e navegação:
    }, [queue, queueIndex]); 

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
            
            queue, 
            queueIndex,
            addPlaylistToQueue,
            
            // EXPORTAÇÃO DAS NOVAS FUNÇÕES
            skipNext,
            skipPrevious,
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};


export const useMusicPlayer = () => {
    return useContext(MusicPlayerContext);
};