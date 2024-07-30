// Задача для этого компонента:
// *Фильтры должны формироваться на основании загруженных данных
// *Фильтры должны отображать только нужных героев при выборе
// *Активный фильтр имеет класс active
// *Изменять json-файл для удобства МОЖНО!
// *Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilters, filtersGet, filterTypeToggle } from "../../actions";
import classNames from "classnames";
const HeroesFilters = () => {
  const { request } = useHttp();
  const { filters, filterType } = useSelector((state) => state.filterRuducer);
  const dispatch = useDispatch();

  const getFilters = () => {
    dispatch(fetchFilters(request));
    // request("http://localhost:3001/filters").then((data) =>
    //   dispatch(filtersGet(data))
    // );
  };
  useEffect(() => {
    getFilters();
  }, []);

  const toggleFilter = (type) => {
    dispatch(filterTypeToggle(type));
  };
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map(({ element, ...props }) => {
            return (
              <View
                key={element}
                {...props}
                filterType={filterType}
                element={element}
                toggleFilter={toggleFilter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const View = ({ classElem, name, element, toggleFilter, filterType }) => {
  const btnClass = classNames({
    btn: true,
    [classElem]: true,
    active: element === filterType,
  });
  return (
    <button className={btnClass} onClick={() => toggleFilter(element)}>
      {name}
    </button>
  );
};
export default HeroesFilters;
