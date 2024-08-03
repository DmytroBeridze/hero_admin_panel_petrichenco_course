import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
// import { fetchFilters } from "../../actions";
import { filterTypeToggle, selectAll, fetchFilters } from "./filterSlice";
import classNames from "classnames";
import store from "../../store";
const HeroesFilters = () => {
  const { request } = useHttp();
  const { filters, filterType } = useSelector((state) => state.filterRuducer);
  const dispatch = useDispatch();

  const getFilters = () => {
    dispatch(fetchFilters(request));
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
          {selectAll(store.getState()).map(({ element, ...props }) => {
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
          {/* {filters.map(({ element, ...props }) => {
            return (
              <View
                key={element}
                {...props}
                filterType={filterType}
                element={element}
                toggleFilter={toggleFilter}
              />
            );
          })} */}
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
