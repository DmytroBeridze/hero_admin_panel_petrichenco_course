import { useHttp } from "../../hooks/http.hook";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

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

// Задача для этого компонента:
//* При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
//* Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const heroesLoadingStatus = useSelector((state) => state.herosReducer);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .then(() => dispatch(toggleFilterType("all")))
      .catch(() => dispatch(heroesFetchingError()));
  }, []);

  const selector = createSelector(
    (state) => state.filterReducer.filterType,
    (state) => state.herosReducer.heroes,
    (filterType, heroes) => {
      console.log("!!!");
      if (filterType === "all") {
        return heroes;
      } else return heroes.filter((elem) => elem.element === filterType);
    }
  );
  const heroesFiltered = useSelector(selector);

  // const heroesFiltered = useSelector((state) => {
  //   console.log("!!!");
  //   if (state.filterReducer.filterType === "all") {
  //     return state.herosReducer.heroes;
  //   } else
  //     return state.herosReducer.heroes.filter(
  //       (elem) => elem.element === state.filterReducer.filterType
  //     );
  // });

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

  return <ul>{elements}</ul>;
};

export default HeroesList;
