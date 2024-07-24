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
  return { type: "HEROES_DELETE", payload: id };
};

export const filterTypeChange = (type) => {
  return {
    type: "FILTER_TYPE_CHANGE",
    payload: type,
  };
};

export const filtersDataGet = (data) => {
  return { type: "HEROES_FILERS", payload: data };
};
export const heroesAdd = (data) => {
  return { type: "HEROES_ADD", payload: data };
};
