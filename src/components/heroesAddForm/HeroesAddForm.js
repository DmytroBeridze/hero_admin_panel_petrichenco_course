// Задача для этого компонента:
// *Реализовать создание нового героя с введенными данными. Он должен попадать
// *в общее состояние и отображаться в списке + фильтроваться
// *Уникальный идентификатор персонажа можно сгенерировать через uiid
// *Усложненная задача:
// *Персонаж создается и в файле json при помощи метода POST
// *Дополнительно:
// *Элементы <option></option> желательно сформировать на базе
// *данных из фильтров

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { addPerson } from "../../actions";

const HeroesAddForm = () => {
  const { filters } = useSelector((state) => state);
  const [formData, setFormdata] = useState({});
  const { request } = useHttp();
  const dispatch = useDispatch();

  const addHeroes = () => {
    request(
      "http://localhost:3001/heroes",
      "POST",
      JSON.stringify(formData)
    ).then((data) => dispatch(addPerson(data)));
  };
  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={(e) => {
        e.preventDefault();
        setFormdata({ ...formData, id: uuidv4() });
        addHeroes();
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
          onChange={(e) => setFormdata({ ...formData, name: e.target.value })}
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
            setFormdata({ ...formData, description: e.target.value })
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
            setFormdata({ ...formData, element: e.target.value })
          }
        >
          <option>Я владею элементом...</option>
          {filters.map(({ element, ...props }) => {
            if (element === "all") return;
            return <View element={element} {...props} key={element} />;
          })}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

const View = ({ element, name }) => {
  return <option value={element}>{name}</option>;
};

export default HeroesAddForm;
