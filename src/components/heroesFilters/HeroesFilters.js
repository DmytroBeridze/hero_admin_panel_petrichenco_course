// Задача для этого компонента:
//* Фильтры должны формироваться на основании загруженных данных
//* Фильтры должны отображать только нужных героев при выборе
//* Активный фильтр имеет класс active
//* Изменять json-файл для удобства МОЖНО!
//* Представьте, что вы попросили бэкенд-разработчика об этом
import { useDispatch, useSelector } from "react-redux";
import { filteredHeroes, toggleFilterType } from "../../actions";
import classNames from "classnames";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { filters, filterType } = useSelector((state) => state.filterReducer);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <View filters={filters} dispatch={dispatch} filterType={filterType} />
        </div>
      </div>
    </div>
  );
};

const View = ({ filters, dispatch, filterType }) => {
  return filters.map(({ value, name, elemClass }) => {
    const btnClass = classNames({
      btn: true,
      [elemClass]: true,
      active: value === filterType,
    });

    return (
      <button
        key={value}
        className={btnClass}
        onClick={(e) => {
          dispatch(toggleFilterType(value));
        }}
      >
        {name}
      </button>
    );
  });
};

export default HeroesFilters;
