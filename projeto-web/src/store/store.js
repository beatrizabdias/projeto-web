import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import loginReducer from '../redux/loginSlice';
import catalogoReducer from '../redux/catalogoSlice';
import playerBebelReducer from '../redux/playerSliceBebel';
import playlistsReducer from '../redux/playlistsSlice';
import userReducer from '../redux/userSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playerBebel: playerBebelReducer,
    auth: loginReducer,
    catalog: catalogoReducer,
    playlists: playlistsReducer,
    user: userReducer,
  },
});
