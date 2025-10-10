import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import loginReducer from '../redux/loginSlice'
import catalogoReducer from '../redux/catalogoSlice'
import playerReduce from '../redux/playerSliceBebel'
import playlistsReducer from '../redux/playlistsSlice';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        auth: loginReducer,
        catalog: catalogoReducer,
        player: playerReduce,
        playlists: playlistsReducer,
    },
});