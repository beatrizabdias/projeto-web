import React, { createContext, useState, useContext } from 'react';
// 💥 MANTIDO: Importação do JSON
import musicasData from '../pages/musicas/musicas.json'; 

// 1. Cria o Contexto
const MusicPlayerContext = createContext();

// 2. Componente Provedor (Provider)
export const MusicPlayerProvider = ({ children }) => {
    
    // 💥 ALTERAÇÃO 1: Define a primeira música do JSON como a currentSong inicial
    const [currentSong, setCurrentSong] = useState(musicasData[0] || null); 
    const [isPlaying, setIsPlaying] = useState(false);

    // 💥 ALTERAÇÃO 2: A função agora recebe o ID e busca a música na lista.
    const playSong = (songId) => {
        // Encontra a música pelo ID
        const songToPlay = musicasData.find(song => song.id === songId);
        
        if (songToPlay) {
            // Define a música encontrada como a atual
            setCurrentSong(songToPlay);
            // Inicia a reprodução
            setIsPlaying(true);
        } else {
            console.error(`Música com ID ${songId} não encontrada.`);
        }
    };
    
    // Função para alternar o estado de reprodução (INALTERADA)
    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <MusicPlayerContext.Provider value={{ 
            // 💥 NOVO: Exporta a lista completa de músicas
            musicas: musicasData,
            
            currentSong, 
            isPlaying, 
            
            // As funções de controle
            playSong, 
            togglePlayPause,
            
            // 💥 EXTRAS (Opcional, mas útil): Para que outros componentes possam alterar a música/status diretamente
            setCurrentSong,
            setIsPlaying,
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

// 3. Hook Personalizado para uso fácil (INALTERADO)
export const useMusicPlayer = () => {
    return useContext(MusicPlayerContext);
};