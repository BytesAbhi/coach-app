import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserInfo = () => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    dispatch({ type: 'SET_USER_INFO', payload: userInfo });
  } catch (error) {
    console.error('Failed to load user info:', error);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const setToken = token => ({
  type: 'SET_TOKEN',
  payload: token,
});
