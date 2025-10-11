import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setUserData, updateProfile } = userSlice.actions;
export default userSlice.reducer;