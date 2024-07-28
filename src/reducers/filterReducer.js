const initialState = {
  filters: [],
  heroesFiltered: [],
  filterType: "all",
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FILTERS":
      return { ...state, filters: action.payload };

    case "FILTER_TYPE":
      return {
        ...state,
        filterType: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
