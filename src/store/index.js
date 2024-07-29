import { createStore, compose } from "redux";
import heroesReducer from "../reducers/heroesReducer";
import filterRuducer from "../reducers/filterRuducer";
import { combineReducers } from "@reduxjs/toolkit";

const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
      if (typeof action === "string") {
        return oldDispatch({
          type: action,
        });
      }
      return oldDispatch(action);
    };
    return store;
  };

const reducer = combineReducers({
  heroesReducer,
  filterRuducer,
});
const store = createStore(
  reducer,
  compose(
    enhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;
