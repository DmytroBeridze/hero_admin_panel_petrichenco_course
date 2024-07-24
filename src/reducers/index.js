const initialState = {
  heroes: [],
  heroesFiltered: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filterType: "all",
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
            : action.payload.filter(
                (elem) => elem.element === state.filterType
              ),
        heroesLoadingStatus: "idle",
      };

    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "HEROES_DELETE":
      const changedHerroes = state.heroes.filter(
        (elem) => elem.id !== action.payload
      );

      return {
        ...state,
        heroes: changedHerroes,
        heroesFiltered:
          state.filterType === "all"
            ? changedHerroes
            : changedHerroes.filter(
                (elem) => elem.element === state.filterType
              ),
      };

    case "FILTER_TYPE_CHANGE":
      return {
        ...state,
        filterType: action.payload,

        heroesFiltered:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((elem) => elem.element === action.payload),
      };

    case "HEROES_FILERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "HEROES_ADD":
      const newArray = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newArray,

        heroesFiltered:
          state.filterType === "all"
            ? newArray
            : newArray.filter((elem) => elem.element === state.filterType),
      };

    default:
      return state;
  }
};

export default reducer;
