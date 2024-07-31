import { createReducer } from "@reduxjs/toolkit";
import { filtersGet, filterTypeToggle } from "../actions";
const initialState = {
  filters: [],
  filterType: "all",
};

const filterRuducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filtersGet, (state, action) => ({
      ...state,
      filters: action.payload,
    }))

    .addCase(filterTypeToggle, (state, action) => {
      return {
        ...state,
        filterType: action.payload,
      };
    })
    .addDefaultCase((state, action) => {});
});

// const filterRuducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "FILERS_GET":
//       return {
//         ...state,
//         filters: action.payload,
//       };

//     case "FILTER_TYPE_TOGGLE":
//       return {
//         ...state,
//         filterType: action.payload,
//       };

//     default:
//       return state;
//   }
// };

export default filterRuducer;
