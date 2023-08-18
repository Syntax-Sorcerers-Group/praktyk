// reducers/index.js
import { combineReducers } from "redux";
import navigationReducer from "./navigationReducer"; // Your navigation reducer
import dataReducer from "./dataReducer"; // Your data reducer

const rootReducer = combineReducers({
  navigation: navigationReducer,
  data: dataReducer, // Combine your data reducer here
  // Other reducers...
});

export default rootReducer;
