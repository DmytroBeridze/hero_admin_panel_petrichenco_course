// Задача для этого компонента:
//* Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
//* Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
//* Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
//* Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { addHeroes, addFilters } from "../../actions";
const HeroesAddForm = () => {
  const [formState, setFormState] = useState({});
  const { request } = useHttp();
  const dispatch = useDispatch();
  const options = useSelector((state) => state.filters);

  //   add heroes
  const addPerson = (data) => {
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data)).then(
      (data) => dispatch(addHeroes(data))
    );
  };

  // add options
  const addOptions = () => {
    request("http://localhost:3001/filters").then((data) =>
      dispatch(addFilters(data))
    );
  };

  useEffect(() => {
    addOptions();
  }, []);
  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={(e) => {
        setFormState((formState) => ({ ...formState, id: uuidv4() }));
        e.preventDefault();
        addPerson(formState);
      }}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              name: e.target.value,
            }))
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          onChange={(e) =>
            setFormState((formState) => ({
              ...formState,
              element: e.target.value,
            }))
          }
        >
          <option>Я владею элементом...</option>
          <View options={options} />
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

const View = ({ options }) => {
  return options.slice(1).map((elem) => (
    <option key={elem.value} value={elem.value}>
      {elem.name}
    </option>
  ));
};
export default HeroesAddForm;
