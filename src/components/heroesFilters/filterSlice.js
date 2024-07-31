import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filters: [],
  filterType: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtersGet: (state, action) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
    filterTypeToggle: (state, action) => {
      return {
        ...state,
        filterType: action.payload,
      };
    },
  },
});

const { actions, reducer } = filterSlice;
export const { filtersGet, filterTypeToggle } = actions;
export default reducer;
