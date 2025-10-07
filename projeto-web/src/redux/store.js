import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comentarioSlice';
import votesReducer from './votesSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    votes: votesReducer,
  },
});