import { createAction } from "@reduxjs/toolkit";

// ---fetch heroes with thunk
export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

// ----fetch filters with thunk
export const fetchFilters = (request) => (dispatch) => {
  request("http://localhost:3001/filters").then((data) =>
    dispatch(filtersGet(data))
  );
};

export const heroesFetching = createAction("HEROES_FETCHING");
// export const heroesFetching = () => {
//   return {
//     type: "HEROES_FETCHING",
//   };
// };

// ----create action with createAction()
export const heroesFetched = createAction("HEROES_FETCHED");
// export const heroesFetched = (heroes) => {
//   return {
//     type: "HEROES_FETCHED",
//     payload: heroes,
//   };
// };

// ----create action with createAction()
export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");
// export const heroesFetchingError = () => {
//   return {
//     type: "HEROES_FETCHING_ERROR",
//   };
// };

export const heroesDelete = createAction("HEROES_DELETE");
// ----create action with createAction()
// export const heroesDelete = (value) => {
//   return {
//     type: "HEROES_DELETE",
//     payload: value,
//   };
// };

// ----create action with createAction()
// --- параметр передається в payload автоматично
export const filtersGet = createAction("FILERS_GET");

// export const filtersGet = (data) => {
//   return {
//     type: "FILERS_GET",
//     payload: data,
//   };
// };

// ----create action with createAction()
export const filterTypeToggle = createAction("FILTER_TYPE_TOGGLE");
// export const filterTypeToggle = (type) => {
//   return {
//     type: "FILTER_TYPE_TOGGLE",
//     payload: type,
//   };
// };

export const addPerson = createAction("ADD_HERO");
// export const addPerson = (data) => {
//   return {
//     type: "ADD_HERO",
//     payload: data,
//   };
// };
