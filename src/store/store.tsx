import { configureStore } from '@reduxjs/toolkit';
import LOLSlice from './features/LOL';

// Create the store, adding the search slice to it
export const store = configureStore({
  reducer: {
    LOL: LOLSlice,
  },
});

// Export some helper types used to improve type-checking
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


