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
export const heroesDelete = (value) => {
  return {
    type: "HEROES_DELETE",
    payload: value,
  };
};
export const filtersGet = (data) => {
  return {
    type: "FILERS_GET",
    payload: data,
  };
};

export const filterTypeToggle = (type) => {
  return {
    type: "FILTER_TYPE_TOGGLE",
    payload: type,
  };
};

export const addPerson = (data) => {
  return {
    type: "ADD_HERO",
    payload: data,
  };
};
