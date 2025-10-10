import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import axios from 'axios';

export const toggleLikeSongAsync = createAsyncThunk(
  'auth/toggleLikeSong',
  async ({ userId, songId, currentLikedSongs }, { rejectWithValue }) => {
    const isLiked = currentLikedSongs.includes(songId);
   
    const newLikedSongs = isLiked
      ? currentLikedSongs.filter(id => id !== songId) 
      : [...currentLikedSongs, songId];             

    try {
      await api.patch(`/users/${userId}`, { likedSongs: newLikedSongs });
      
      return newLikedSongs; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleFollowArtistAsync = createAsyncThunk(
  'auth/toggleFollowArtist',
  async ({ userId, artistId, currentFollowing }, { rejectWithValue }) => {
    const isFollowing = currentFollowing.includes(artistId);
    
    const newFollowing = isFollowing
      ? currentFollowing.filter(id => id !== artistId) // Deixa de seguir
      : [...currentFollowing, artistId];              // Começa a seguir

    try {
      await api.patch(`/users/${userId}`, { following: newFollowing });
      return newFollowing;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchUsersByIds = createAsyncThunk(
  'auth/fetchUsersByIds',
  async (ids, { rejectWithValue }) => {
    try {
      const userPromises = ids.map(id =>
        axios.get(`http://localhost:3001/users/${id}`)
      );

      const responses = await Promise.all(userPromises);

      const users = responses.map(response => response.data);
      
      return users;

    } catch (error) {
      console.error("Erro ao buscar usuários um por um:", error);
      return rejectWithValue('Falha ao buscar os detalhes dos amigos.');
    }
  }
);


const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  friends: {
    items: [],
    status: 'idle',
    error: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeSongAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.likedSongs = action.payload;

          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(toggleFollowArtistAsync.fulfilled, (state, action) => {
        if (state.user) {
          state.user.following = action.payload;

          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(fetchUsersByIds.pending, (state) => {
        state.friends.status = 'loading';
      })
      .addCase(fetchUsersByIds.fulfilled, (state, action) => {
        state.friends.status = 'succeeded';
        state.friends.items = action.payload;
      })
      .addCase(fetchUsersByIds.rejected, (state, action) => {
        state.friends.status = 'failed';
        state.friends.error = action.error.message;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

