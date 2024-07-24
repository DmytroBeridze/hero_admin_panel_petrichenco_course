// Задача для этого компонента:
// *Фильтры должны формироваться на основании загруженных данных
// *Фильтры должны отображать только нужных героев при выборе
// *Активный фильтр имеет класс active
// *Изменять json-файл для удобства МОЖНО!
// *Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { filtersDataGet, filterTypeChange } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import classNames from "classnames";
const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { filters, filterType } = useSelector((state) => state);
  const { request } = useHttp();

  const getFilters = () => {
    request("http://localhost:3001/filters").then((data) =>
      dispatch(filtersDataGet(data))
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
              elem={elem}
              key={elem.element}
              filterType={filterType}
            />
          ))}

          {/* <button
            className="btn btn-outline-dark active"
            onClick={() => dispatch(filterTypeChange("all"))}
          >
            Все
          </button>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(filterTypeChange("fire"))}
          >
            Огонь
          </button>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(filterTypeChange("water"))}
          >
            Вода
          </button>
          <button
            className="btn btn-success"
            onClick={() => dispatch(filterTypeChange("wind"))}
          >
            Ветер
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(filterTypeChange("earth"))}
          >
            Земля
          </button> */}
        </div>
      </div>
    </div>
  );
};

const View = ({ dispatch, elem, filterType }) => {
  const btnClass = classNames({
    btn: true,
    [elem.clasElem]: true,
    active: elem.element === filterType,
  });

  return (
    <button
      className={btnClass}
      onClick={() => dispatch(filterTypeChange(elem.element))}
    >
      {elem.name}
    </button>
  );
};

export default HeroesFilters;
