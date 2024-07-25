import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

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

export const deleteHeroes = (id) => {
  return { type: "DELETE_HEROES", payload: id };
};

export const filterHeroes = (element) => {
  return {
    type: "HEROES__FILTER",
    payload: element,
  };
};

export const filtersData = (data) => {
  return {
    type: "FILTERS__DATA",
    payload: data,
  };
};
export const createHeroes = (data) => {
  return {
    type: "CREATE_HEROES",
    payload: data,
  };
};
