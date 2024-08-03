import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter();
const initialState = filterAdapter.getInitialState({
  filterType: "all",
});

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

// const initialState = {
//   filters: [],
//   filterType: "all",
// };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // filtersGet: (state, action) => {
    //   return {
    //     ...state,
    //     filters: action.payload,
    //   };
    // },
    filterTypeToggle: (state, action) => {
      return {
        ...state,
        filterType: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      filterAdapter.setAll(state, action.payload);
      // return {
      //   ...state,
      //   filters: action.payload,
      // };
    });
  },
});

const { actions, reducer } = filterSlice;
export const { filtersGet, filterTypeToggle } = actions;
export default reducer;
export const { selectAll } = filterAdapter.getSelectors(
  (state) => state.filterRuducer
);
