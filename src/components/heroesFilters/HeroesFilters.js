// Задача для этого компонента:
// *Фильтры должны формироваться на основании загруженных данных
// *Фильтры должны отображать только нужных героев при выборе
// *Активный фильтр имеет класс active
// *Изменять json-файл для удобства МОЖНО!
// *Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { filterHeroes, filtersData } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import classNames from "classnames";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filters, filterType } = useSelector((state) => state);

  const getFilters = () => {
    request("http://localhost:3001/filters").then((data) =>
      dispatch(filtersData(data))
    );
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((elem) => (
            <View
              dispatch={dispatch}
              key={elem.element}
              elem={elem}
              filterType={filterType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const View = ({ dispatch, elem, filterType }) => {
  const { element, name, elemStyle } = elem;
  const btnActive = classNames({
    btn: true,
    [elemStyle]: true,
    active: element === filterType,
  });
  return (
    <button
      className={btnActive}
      onClick={() => dispatch(filterHeroes(element))}
    >
      {name}
    </button>
  );
};

export default HeroesFilters;
