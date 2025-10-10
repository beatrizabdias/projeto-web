import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: null,
    queue: [],      
    currentIndex: -1,  
    isPlaying: false,
    volume: 1,
    duration: 0,
    currentTime: 0,
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentSong: (state, action) => {
            state.queue = [action.payload];
            state.currentIndex = 0;
            state.currentSong = action.payload;
            state.isPlaying = true;
            state.currentTime = 0;
        },

        setQueue: (state, action) => {
            state.queue = action.payload.songs;
            state.currentIndex = action.payload.startIndex || 0;
            
            if (state.queue.length > 0) {
                state.currentSong = state.queue[state.currentIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            }
        },

        togglePlayPause: (state) => {
            if (state.currentSong) state.isPlaying = !state.isPlaying;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        updateCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },

        skipNext: (state) => {
            const nextIndex = state.currentIndex + 1;
            if (nextIndex < state.queue.length) {
                state.currentIndex = nextIndex;
                state.currentSong = state.queue[nextIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            } else {
                state.isPlaying = false; 
            }
        },
        skipPrevious: (state) => {
            const prevIndex = state.currentIndex - 1;
            if (prevIndex >= 0) {
                state.currentIndex = prevIndex;
                state.currentSong = state.queue[prevIndex];
                state.isPlaying = true;
                state.currentTime = 0;
            }
        },
    },
});

export const {
    setCurrentSong,
    setQueue,
    togglePlayPause,
    setDuration,
    updateCurrentTime,
    skipNext,
    skipPrevious,
} = playerSlice.actions;

export default playerSlice.reducer;