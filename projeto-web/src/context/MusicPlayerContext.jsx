// src/context/MusicPlayerContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Cria o Contexto
const MusicPlayerContext = createContext();

// 2. Componente Provedor (Provider)
export const MusicPlayerProvider = ({ children }) => {
    // Estado que será compartilhado: qual música está sendo solicitada
    const [currentSong, setCurrentSong] = useState(null); 
    const [isPlaying, setIsPlaying] = useState(false);

    // Função que as páginas usarão para iniciar a reprodução
    const playSong = (songDetails) => {
        setCurrentSong(songDetails);
        setIsPlaying(true);
    };

    // Função para alternar o estado de reprodução
    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <MusicPlayerContext.Provider value={{ 
            currentSong, 
            isPlaying, 
            playSong, 
            togglePlayPause,
            // Adicione outras funções de controle (próxima/anterior, volume, etc.) aqui
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

// 3. Hook Personalizado para uso fácil
export const useMusicPlayer = () => {
    return useContext(MusicPlayerContext);
};