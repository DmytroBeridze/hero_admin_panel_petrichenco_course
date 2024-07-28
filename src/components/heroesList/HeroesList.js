import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDelete,
  toggleFilterType,
  filteredHeroes,
} from "../../actions/index.js";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { createSelector } from "reselect";

// Задача для этого компонента:
//* При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
//* Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  console.log("|!!!");
  const { heroes, heroesLoadingStatus } = useSelector(
    (state) => state.heroesReducer
  );

  // const { filterType } = useSelector((state) => state.filterReducer);

  // const { heroes, heroesLoadingStatus, filterType } = useSelector(
  //   (state) => state
  // );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .then(() => dispatch(toggleFilterType("all")))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  // -------------filter heroes
  // ---memoised
  const heroesFilteredMemois = createSelector(
    (state) => state.heroesReducer.heroes,
    (state) => state.filterReducer.filterType,
    (heroes, filterType) => {
      if (filterType === "all") {
        return heroes;
      } else return heroes.filter((elem) => elem.element === filterType);
    }
  );

  const heroesFiltered = useSelector(heroesFilteredMemois);

  // const heroesFiltered = useSelector((state) => {
  //   if (state.filterReducer.filterType === "all") {
  //     return state.heroesReducer.heroes;
  //   } else
  //     return state.heroesReducer.heroes.filter(
  //       (elem) => elem.element === state.filterReducer.filterType
  //     );
  // });

  // const heroesFiltered = useSelector((state) => {
  //   if (state.filterReducer.filterType === "all") {
  //     return state.heroesReducer.heroes;
  //   } else
  //     return state.heroesReducer.heroes.filter(
  //       (elem) => elem.element === state.filterReducer.filterType
  //     );
  // });

  // const heroesFiltered = () => {
  //   if (filterType === "all") {
  //     return heroes;
  //   } else return heroes.filter((elem) => elem.element === filterType);
  // };

  // -----------delete heroes
  const deleteHeroes = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(() => {
          dispatch(heroesDelete(id));
        })
        .catch((e) => console.log(e));
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
      return (
        <HeroesListItem
          key={id}
          {...props}
          deleteHeroes={() => deleteHeroes(id)}
        />
      );
    });
  };
  const elements = renderHeroesList(heroesFiltered);

  // const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
