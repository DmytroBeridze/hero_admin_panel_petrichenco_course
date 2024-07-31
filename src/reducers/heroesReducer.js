import { createReducer } from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDelete,
  addPerson,
} from "../actions";
const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(heroesFetching, (state, action) => {
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    })
    .addCase(heroesFetched, (state, action) => {
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    })
    .addCase(heroesFetchingError, (state, action) => {
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    })
    .addCase(heroesDelete, (state, action) => {
      return {
        ...state,
        heroes: state.heroes.filter((elem) => elem.id !== action.payload),
      };
    })
    .addCase(addPerson, (state, action) => {
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    })
    .addDefaultCase((state, action) => {});
});

// const heroesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };
//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };
//     case "HEROES_FETCHING_ERROR":
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };
//     case "HEROES_DELETE":
//       return {
//         ...state,
//         heroes: state.heroes.filter((elem) => elem.id !== action.payload),
//       };

//     case "ADD_HERO":
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       };
//     default:
//       return state;
//   }
// };

export default heroesReducer;
