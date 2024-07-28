const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesReducer = (state = initialState, action) => {
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
      const newHeroList = state.heroes.filter(
        (elem) => elem.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroList,
      };

    case "ADD_HEROES":
      const newHero = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newHero,
      };

    default:
      return state;
  }
};

export default heroesReducer;
