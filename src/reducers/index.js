const initialState = {
  heroes: [],
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
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "HEROES_DELETE":
      return {
        ...state,
        heroes: state.heroes.filter((elem) => elem.id !== action.payload),
      };
    case "FILERS_GET":
      return {
        ...state,
        filters: (state.filters = action.payload),
      };

    case "FILTER_TYPE_TOGGLE":
      return {
        ...state,
        filterType: (state.filterType = action.payload),
      };

    case "ADD_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
