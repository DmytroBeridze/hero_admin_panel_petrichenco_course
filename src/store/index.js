import { createStore } from "redux";
import reducer from "../reducers";
import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "../reducers/filterReducer";
import heroesReducer from "../reducers/heroesReducer";

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
  combineReducers({ filterReducer, heroesReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
