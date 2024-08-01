import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/heroes");
});

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heriesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    // heroesFetching: (state, action) => {
    //   return {
    //     ...state,
    //     heroesLoadingStatus: "loading",
    //   };
    // },
    // heroesFetched: (state, action) => {
    //   return {
    //     ...state,
    //     heroes: action.payload,
    //     heroesLoadingStatus: "idle",
    //   };
    // },

    // heroesFetchingError: (state, action) => {
    //   return {
    //     ...state,
    //     heroesLoadingStatus: "error",
    //   };
    // },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state, action) => {
        return {
          ...state,
          heroesLoadingStatus: "loading",
        };
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        return {
          ...state,
          heroes: action.payload,
          heroesLoadingStatus: "idle",
        };
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        return {
          ...state,
          heroesLoadingStatus: "error",
        };
      });
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
