// dataReducer.js
const initialState = {
    items: [], // Initial empty array of items
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: [...state.items, action.payload.item],
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.itemId),
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;
  