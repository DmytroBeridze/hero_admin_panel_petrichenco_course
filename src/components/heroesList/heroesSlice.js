import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heriesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state, action) => {
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    },
    heroesFetched: (state, action) => {
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    },

    heroesFetchingError: (state, action) => {
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    },
    heroesDelete: (state, action) => {
      return {
        ...state,
        heroes: state.heroes.filter((elem) => elem.id !== action.payload),
      };
    },
    heroesAdd: (state, action) => {
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    },
  },
});

const { actions, reducer } = heriesSlice;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDelete,
  heroesAdd,
} = actions;
export default reducer;
