import { useEffect, useState } from "react";
//import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";
import { useUser } from "../UserContext";
import StartConstructor from "./StartConstructor/StartConstructor";
import Field from "./Field/Field";
import Constructor from "./Constructor/Constructor";
import FinalForm from "./FinalForm";
import "./Game.css";
const Game = () => {
  const { userName } = useUser();
  const [startFormDisplayed, setStartFormDisplayed] = useState(false);
  const [fieldData, setFieldData] = useState({});
  const [showConstructor, setShowConstructor] = useState(false);
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [dices, setDices] = useState([]);

  //отображаем начальную форму
  useEffect(() => {
    const isFormDisplayed = localStorage.getItem("isFormDisplayed");
    // Если форма не была отображена, обновляем состояние и сохраняем в локальное хранилище
    if (!isFormDisplayed) {
      setStartFormDisplayed(true);
      localStorage.setItem("isFormDisplayed", "true");
    }
    return () => {
      localStorage.removeItem("isFormDisplayed");
    };
  }, []);

  //отображаем данные
  useEffect(() => {
    // Логика загрузки данных из localStorage при монтировании компонента
    const storedData = localStorage.getItem("gameData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFieldData(parsedData);
    }
  }, []);
  //отрисовываем компоненты
  const handleFormSubmit = (data) => {
    // Обработка данных из формы
    console.log("Данные из формы:", data);

    setFieldData(data);
    localStorage.setItem("gameData", JSON.stringify(data));
    setStartFormDisplayed(false);
  };

  return (
    <>
      {startFormDisplayed && <StartConstructor onSubmit={handleFormSubmit} />}
      <div className="game">
        <Sidebar setShowConstructor={setShowConstructor} />
        {showFinalForm && (
          <FinalForm
            setShowFinalForm={setShowFinalForm}
            setFieldData={setFieldData}
          />
        )}
        <Field
          data={fieldData}
          dices={dices}
          userName={userName}
          className="game__field"
        />
        {showConstructor && (
          <Constructor
            setDices={setDices}
            setShowFinalForm={setShowFinalForm}
          />
        )}
      </div>
    </>
  );
};
export default Game;
