import { createSlice } from '@reduxjs/toolkit';

const coachSlice = createSlice({
  name: 'coach',
  initialState: {
    coaches: [],
  },
  reducers: {
    setCoaches: (state, action) => {
      state.coaches = action.payload;
    },
    clearCoaches: (state) => {
      state.coaches = [];
    },
  },
});

export const { setCoaches, clearCoaches } = coachSlice.actions;
export default coachSlice.reducer;
