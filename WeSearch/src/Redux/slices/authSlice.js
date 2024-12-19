import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      AsyncStorage.setItem('authToken', action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('authToken');
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
