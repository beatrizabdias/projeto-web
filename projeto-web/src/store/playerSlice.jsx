// src/store/playerSlice.js

import { createSlice } from '@reduxjs/toolkit';
// Assumindo que você terá uma lista de músicas mais completa, 
// o JSON é importado aqui.
import musicasData from '../pages/musicas/musicas.json'; 

// Adicione os campos 'titulo', 'artista', 'caminho', 'imagem', 'duracao' ao seu JSON
// E certifique-se que o campo 'id' é único.

// Estado inicial do player
const initialState = {
    // CORREÇÃO: Começa sem música.
    currentSong: null, 
    // CORREÇÃO: Começa sem tocar.
    isPlaying: false,
    currentTime: 0, 
    duration: 0,
    volume: 0.5,
    // CORREÇÃO: A fila começa vazia.
    queue: [], 
    queueIndex: -1, // -1 indica que não há índice válido na fila
    musicas: musicasData,
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        togglePlayPause: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        // Seta a música atual (usado para tocar algo que não está na fila, ex: busca)
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
            state.currentTime = 0; 
            state.queueIndex = state.queue.findIndex(s => s.id === action.payload.id);
        },
        updateCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        
        seekTo: (state, action) => {
            state.currentTime = action.payload;
        },

        setVolume: (state, action) => {
            state.volume = action.payload;
        },

        // Define a fila completa e a música de início
        setQueue: (state, action) => {
            state.queue = action.payload.songs;
            state.queueIndex = action.payload.startIndex || 0;
            
            if (state.queue.length > 0) {
                state.currentSong = state.queue[state.queueIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            }
        },
        
        // NOVO: Adiciona uma única música ao final da fila
        addSingleSongToQueue: (state, action) => {
             const song = action.payload;
             state.queue.push(song);
             // Se não houver música tocando, inicia esta
             if (!state.currentSong) {
                 state.queueIndex = state.queue.length - 1;
                 state.currentSong = song;
                 state.isPlaying = true;
             }
        },

        // NOVO: Reordena a fila (usado pelo Drag and Drop)
        reorderQueue: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;
            const [movedItem] = state.queue.splice(sourceIndex, 1);
            state.queue.splice(destinationIndex, 0, movedItem);
            
            // Reajusta o queueIndex se a música atual for movida
            // (Lógica mais complexa de index seria necessária aqui, mas para D&D simples, isso basta)
        },
        
        skipNext: (state) => {
            if (state.queueIndex < state.queue.length - 1) {
                state.queueIndex += 1;
                state.currentSong = state.queue[state.queueIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            } else {
                state.isPlaying = false; 
            }
        },
        
        skipPrevious: (state) => {
            if (state.queueIndex > 0) {
                state.queueIndex -= 1;
                state.currentSong = state.queue[state.queueIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            } else {
                state.currentTime = 0;
            }
        },
    },
});

export const { 
    togglePlayPause, 
    setCurrentSong, 
    updateCurrentTime, 
    setDuration,
    setQueue,
    addSingleSongToQueue,
    reorderQueue,
    skipNext,
    skipPrevious,
    setVolume,
    seekTo
} = playerSlice.actions;

export default playerSlice.reducer;