import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/heroes");
});

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

const heriesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesDelete: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
      // return {
      //   ...state,
      //   heroes: state.heroes.filter((elem) => elem.id !== action.payload),
      // };
    },

    heroesAdd: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
      // return {
      //   ...state,
      //   heroes: [...state.heroes, action.payload],
      // };
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
        heroesAdapter.setAll(state, action.payload);
        state.heroesLoadingStatus = "idle";

        // return {
        //   ...state,
        //   heroes: action.payload,
        //   heroesLoadingStatus: "idle",
        // };
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
export const { selectAll } = heroesAdapter.getSelectors(
  (state) => state.heroesReducer
);
// ?---- filetredMemoisHeroesList можна писати прямо в HeroesList
// ? а можна єкспортувати звідси
export const filetredMemoisHeroesList = createSelector(
  // (state) => state.heroesReducer.heroes,
  selectAll,

  (state) => state.filterRuducer.filterType,
  (heroes, filterType) => {
    if (filterType === "all") {
      return heroes;
    } else return heroes.filter((elem) => elem.element === filterType);
  }
);
