const initialState = {
    userInfo: null,
    token: null,
    loading: true,
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_USER_INFO':
        return { ...state, userInfo: action.payload, loading: false };
      case 'SET_TOKEN':
        return { ...state, token: action.payload };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  }
  