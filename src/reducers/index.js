const initialState = {
  heroes: [],
  filteredHeroes: [],
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
      const arrHeroes = state.heroes.filter(
        (elem) => elem.id !== action.payload
      );
      return {
        ...state,
        heroes: action.payload,
        filteredHeroes: state.filterType === "all" ? action.payload : arrHeroes,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "DELETE_HEROES":
      const newArr = state.heroes.filter((elem) => elem.id !== action.payload);
      console.log(state.filterType);
      return {
        ...state,
        heroes: newArr,
        filteredHeroes:
          state.filterType === "all"
            ? newArr
            : newArr.filter((elem) => elem.element === state.filterType),
      };
    case "HEROES__FILTER":
      const filterArr = state.heroes.filter(
        (elem) => elem.element === action.payload
      );
      return {
        ...state,
        filteredHeroes: action.payload === "all" ? state.heroes : filterArr,
        filterType: action.payload,
      };

    case "CHANGE_FILTER_TYPE":
      console.log(action.payload);
      return {
        ...state,
        filterType: action.payload,
      };

    case "FILTERS__DATA":
      return {
        ...state,
        filters: action.payload,
      };

    case "CREATE_HEROES": {
      const newHeroList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes:
          state.filterType === "all"
            ? newHeroList
            : newHeroList.filter((elem) => elem.element === state.filterType),
      };
    }
    default:
      return state;
  }
};

export default reducer;
