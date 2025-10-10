import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchPlaylistsByUserId = createAsyncThunk(
  'playlists/fetchByUserId',
  async (userId) => {
    const response = await api.get(`/playlists?userId=${userId}`);
    return response.data;
  }
);

const initialState = {
  userPlaylists: {
    items: [],
    status: 'idle', 
    error: null,
  },
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistsByUserId.pending, (state) => {
        state.userPlaylists.status = 'loading';
      })
      .addCase(fetchPlaylistsByUserId.fulfilled, (state, action) => {
        state.userPlaylists.status = 'succeeded';
        state.userPlaylists.items = action.payload;
      })
      .addCase(fetchPlaylistsByUserId.rejected, (state, action) => {
        state.userPlaylists.status = 'failed';
        state.userPlaylists.error = action.error.message;
      });
  },
});

export default playlistsSlice.reducer;