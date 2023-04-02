import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

type LOLMatches = {
  stats: {
    component: string;
    value: string;
  }[][];
};

// Define an initial state
const initialState: LOLMatches  = {
 stats:[]
};

const lolSlice = createSlice({
  name: 'LOL',
  initialState,
  reducers: {
    updateLOLMatches(state, action: PayloadAction<LOLMatches>) {
      state=action.payload;
      return(state)
  },
}
});

// Export each reducers function defined in createSlice
export const { updateLOLMatches } = lolSlice.actions;

// Export default the slice reducer
export default lolSlice.reducer;