import { createStore } from "redux";
// import reducer from '../reducers';
import heroesReducer from "../reducers/heroesReducer";
import filterRuducer from "../reducers/filterRuducer";
import { combineReducers } from "@reduxjs/toolkit";
const reducer = combineReducers({
  heroesReducer,
  filterRuducer,
});
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
