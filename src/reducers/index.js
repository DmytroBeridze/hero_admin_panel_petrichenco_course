const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  heroesFiltered: [],
  filterType: "all",
  // activeFilter: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,

        heroesFiltered:
          state.filterType === "all"
            ? action.payload
            : action.payload.filter((elem) => elem.element === action.payload),

        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "HEROES_DELETE":
      const newHeroList = state.heroes.filter(
        (elem) => elem.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroList,

        heroesFiltered:
          state.filterType === "all"
            ? newHeroList
            : newHeroList.filter(
                (elem) => elem.element === state.filterType
                // (elem) => elem.element === action.payload.element
              ),
      };

    case "ADD_HEROES":
      const newHero = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newHero,
        heroesFiltered:
          state.filterType === "all"
            ? newHero
            : newHero.filter((elem) => elem.element === action.payload.element),
      };

    case "ADD_FILTERS":
      return { ...state, filters: action.payload };

    case "FILTERED_HEROES":
      //   const filtered = state.heroes.filter(
      //     (elem) => elem.element === action.payload
      //   );

      return {
        ...state,
        heroesFiltered:
          state.filterType === "all"
            ? state.heroes
            : state.heroes.filter((elem) => elem.element === action.payload),
      };

    case "FILTER_TYPE":
      return {
        ...state,
        filterType: action.payload,

        heroesFiltered:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((elem) => elem.element === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
