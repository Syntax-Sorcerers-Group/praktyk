// navigationReducer.js
const initialState = {
    currentScreen: "Home",
  };
  
  const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "NAVIGATE":
        return {
          ...state,
          currentScreen: action.payload.screen,
        };
      default:
        return state;
    }
  };
  
  export default navigationReducer;
  