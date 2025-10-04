// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';

export const store = configureStore({
    reducer: {
        // Você pode ter múltiplos slices aqui (ex: user: userReducer)
        player: playerReducer,
    },
});