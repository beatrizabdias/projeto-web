import { createSlice } from '@reduxjs/toolkit';
import musicasData from '../pages/musicas/musicas.json';

const initialState = {
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    queue: [],
    queueIndex: -1,
    musicas: musicasData,
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        togglePlayPause: (state) => {
            state.isPlaying = !state.isPlaying;
        },
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
        setQueue: (state, action) => {
            state.queue = action.payload.songs;
            state.queueIndex = action.payload.startIndex || 0;
            
            if (state.queue.length > 0) {
                state.currentSong = state.queue[state.queueIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            }
        },
        addSingleSongToQueue: (state, action) => {
             const song = action.payload;
             state.queue.push(song);
             if (!state.currentSong) {
                  state.queueIndex = state.queue.length - 1;
                  state.currentSong = song;
                  state.isPlaying = true;
             }
        },
        reorderQueue: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;
            const [movedItem] = state.queue.splice(sourceIndex, 1);
            state.queue.splice(destinationIndex, 0, movedItem);
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