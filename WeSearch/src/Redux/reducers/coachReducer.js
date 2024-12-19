// coachReducer.js
const initialState = {
    firstName: '',
    lastName: '',
    contactMethod: '',
    contact: '',
    projectDescription: '',
    specialization: '',
    city: '',
    image: null,
    availabilityDays: [],
    availableFrom: '',
    availableTo: '',
    budget: '',
    agreedTerms: false,
    responseMessage: '',
  };
  
  const coachReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COACH_DATA':
        return {
          ...state,
          ...action.payload,
        };
      case 'SET_AVAILABILITY_DAYS':
        return {
          ...state,
          availabilityDays: action.payload,
        };
      case 'SET_IMAGE':
        return {
          ...state,
          image: action.payload,
        };
      case 'SET_RESPONSE_MESSAGE':
        return {
          ...state,
          responseMessage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default coachReducer;
  