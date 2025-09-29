import React, { createContext, useState, useContext } from 'react';
// Importação do JSON (necessário para buscar dados)
import musicasData from '../pages/musicas/musicas.json'; 

// 1. Cria o Contexto
const MusicPlayerContext = createContext();

// 2. Componente Provedor (Provider)
export const MusicPlayerProvider = ({ children }) => {
    
    // Define a primeira música do JSON como a currentSong inicial
    const [currentSong, setCurrentSong] = useState(musicasData[0] || null); 
    const [isPlaying, setIsPlaying] = useState(false);

    // Função que recebe o ID e busca a música
    const playSong = (songId) => {
        const songToPlay = musicasData.find(song => song.id === songId);
        
        if (songToPlay) {
            setCurrentSong(songToPlay);
            setIsPlaying(true);
        } else {
            console.error(`Música com ID ${songId} não encontrada.`);
        }
    };
    
    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <MusicPlayerContext.Provider value={{ 
            musicas: musicasData,
            currentSong, 
            isPlaying, 
            playSong, 
            togglePlayPause,
            // Exporta funções de set para controle avançado
            setCurrentSong,
            setIsPlaying, 
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

// 3. Hook Personalizado
export const useMusicPlayer = () => {
    return useContext(MusicPlayerContext);
};