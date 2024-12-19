import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentData: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentData: (state, action) => {
      state.studentData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStudentData, setLoading, setError } = studentSlice.actions;
export default studentSlice.reducer;