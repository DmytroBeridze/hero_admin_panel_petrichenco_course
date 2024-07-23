export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};
export const heroesDelete = (id) => {
  return {
    type: "HEROES_DELETE",
    payload: id,
  };
};

export const addHeroes = (data) => {
  return {
    type: "ADD_HEROES",
    payload: data,
  };
};

export const addFilters = (data) => {
  return {
    type: "ADD_FILTERS",
    payload: data,
  };
};
