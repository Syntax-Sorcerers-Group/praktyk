import { createStore } from "redux";
import rootReducer from "./reducers"; // Create your reducers

const store = createStore(rootReducer);

export default store;
