import { createStore } from "redux";
import { combineReducers } from "redux";
import filterReducer from "../reducers/filterReducer";
import herosReducer from "../reducers/herosReducer";
const reducer = combineReducers({
  filterReducer,
  herosReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
