// src/store/playerSlice.js

import { createSlice } from '@reduxjs/toolkit';
// Importa suas músicas para o estado inicial
import musicasData from '../pages/musicas/musicas.json'; 

// Estado inicial do player
const initialState = {
    // Música inicial
    currentSong: musicasData[0] || null, 
    isPlaying: false,
    currentTime: 0, 
    duration: 0,
    volume: 0.5, // Exemplo de volume padrão
    queue: [], // A fila de músicas
    queueIndex: -1, // Índice da música atual na fila
    musicas: musicasData, // Mantém todas as músicas disponíveis
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        // Reducer para alternar entre play e pause
        togglePlayPause: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        // Reducer para configurar a música atual
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
            // Opcional: Quando uma nova música é setada, resetamos o tempo
            state.currentTime = 0; 
        },
        // Reducer para atualizar o tempo de reprodução (usado pelo Player.jsx)
        updateCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        // Reducer para definir a duração da música
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        
        // NOVO: Reducer para buscar uma posição na música (seek)
        // Usamos ele apenas para atualizar o estado Redux. A lógica de áudio fica no Player.jsx.
        seekTo: (state, action) => {
            state.currentTime = action.payload;
        },

        // NOVO: Reducer para definir o volume
        setVolume: (state, action) => {
            state.volume = action.payload;
        },

        // Reducer para definir a fila (usado quando uma playlist é iniciada)
        setQueue: (state, action) => {
            state.queue = action.payload.songs;
            state.queueIndex = action.payload.startIndex || 0;
            
            // Define a primeira música da fila como a música atual
            if (state.queue.length > 0) {
                 state.currentSong = state.queue[state.queueIndex];
                 state.isPlaying = true;
                 state.currentTime = 0; // Resetar tempo ao iniciar fila
            }
        },
        
        // Reducer para avançar para a próxima música na fila
        skipNext: (state) => {
            if (state.queueIndex < state.queue.length - 1) {
                state.queueIndex += 1;
                state.currentSong = state.queue[state.queueIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            } else {
                // Opcional: Pausar se a fila acabar
                state.isPlaying = false; 
            }
        },
        
        // NOVO: Reducer para voltar para a música anterior
        skipPrevious: (state) => {
            if (state.queueIndex > 0) {
                state.queueIndex -= 1;
                state.currentSong = state.queue[state.queueIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            } else {
                // Opcional: Reiniciar a música atual se estiver no início da fila
                state.currentTime = 0;
            }
        },
    },
});

// Exporta as ações que os componentes usarão para MUDAR o estado
// Adicionando skipPrevious, setVolume e seekTo
export const { 
    togglePlayPause, 
    setCurrentSong, 
    updateCurrentTime, 
    setDuration,
    setQueue,
    skipNext,
    skipPrevious, // NOVO
    setVolume,    // NOVO
    seekTo        // NOVO
} = playerSlice.actions;

// Exporta o reducer para o store principal
export default playerSlice.reducer;