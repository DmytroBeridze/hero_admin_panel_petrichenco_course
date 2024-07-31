import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import heroesReducer from "../components/heroesList/heroesSlice";
import filterRuducer from "../components/heroesFilters/filterSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// -------middleware
const customMiddleWare = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

// -----combine two reducers
// const reducer = combineReducers({
//   heroesReducer,
//   filterRuducer,
// });

// -----create store with configureStore
const store = configureStore({
  // ---- reducers
  reducer: {
    heroesReducer,
    filterRuducer,
  },
  // -----middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleWare),

  // ----devtools redux
  devTools: process.env.NODE_ENV !== "production",
});

// const store = createStore(
//   reducer,

//   compose(
//     applyMiddleware(middleWare, thunk),

//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
