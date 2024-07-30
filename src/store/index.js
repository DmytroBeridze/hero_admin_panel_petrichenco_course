import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import heroesReducer from "../reducers/heroesReducer";
import filterRuducer from "../reducers/filterRuducer";
import { combineReducers } from "@reduxjs/toolkit";

// -------middleware
const middleWare = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

// -----combine two reducers
const reducer = combineReducers({
  heroesReducer,
  filterRuducer,
});

// -----create store with applyMiddleware
const store = createStore(
  reducer,

  compose(
    applyMiddleware(middleWare, thunk),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

// const thunkMiddleware =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "string") {
//       return next({
//         type: action,
//       });
//     }
//     return next(action);
//   };

// ----middleware
// const middleWare = (store) => (next) => (action) => {
//   if (typeof action === "string") {
//     return next({
//       type: action,
//     });
//   }
//   return next(action);
// };
