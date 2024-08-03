import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  heroesDelete,
  fetchHeroes,
  selectAll,
  filetredMemoisHeroesList,
} from "./heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const { heroesLoadingStatus } = useSelector((state) => state.heroesReducer);
  const dispatch = useDispatch();
  const { request } = useHttp();

  // ---------get elements
  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  // ---можно filetredMemoisHeroesList зберігати в heroesSlice, а сюди
  // імпортувати тільки результат
  // const filetredMemoisHeroesList = createSelector(
  //   // (state) => state.heroesReducer.heroes,
  //   selectAll,

  //   (state) => state.filterRuducer.filterType,
  //   (heroes, filterType) => {
  //     if (filterType === "all") {
  //       return heroes;
  //     } else return heroes.filter((elem) => elem.element === filterType);
  //   }
  // );
  const heroesFilter = useSelector(filetredMemoisHeroesList);

  // ---------delete element
  const deleteElement = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE").then(() => {
        dispatch(heroesDelete(id));
      });
    },
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      // return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          deleteElement={() => deleteElement(id)}
        />
      );
    });
  };

  const elements = renderHeroesList(heroesFilter);
  return <ul>{elements}</ul>;
};

export default HeroesList;
