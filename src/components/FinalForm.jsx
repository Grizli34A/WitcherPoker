import axios from "axios";
import "./FinalForm.css";
import { useState } from "react";
const FinalForm = ({ setShowFinalForm, setFieldData }) => {
  const [enemyMoney, setEnemyMoney] = useState("");
  const [userMoney, setUserMoney] = useState("");
  const [result, setResult] = useState(false);
  const [isChecked, setIsChecked] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const handleChange = (checkbox) => {
    setIsChecked({
      checkbox1: checkbox === "checkbox1",
      checkbox2: checkbox === "checkbox2",
    });
  };
  const changeData = () => {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    if (result) {
      gameData.userMoney = parseInt(gameData.userMoney) + parseInt(enemyMoney);
      gameData.enemyMoney -= enemyMoney;
    } else {
      gameData.enemyMoney = parseInt(gameData.enemyMoney) + parseInt(userMoney);
      gameData.userMoney -= userMoney;
    }
    localStorage.setItem("gameData", JSON.stringify(gameData));
    setFieldData(gameData);
  };
  const sendResult = async () => {
    try {
      await axios.post("http://45.10.247.30:8080/game/end", {
        idGame: localStorage.getItem("idGame"),
        predictResult: localStorage.getItem("probability"),
        realResult: result,
      });
      changeData();
      setShowFinalForm(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="finalForm">
      <div className="enemyResult">
        <input
          placeholder="Деньги противники"
          value={enemyMoney}
          onChange={(e) => setEnemyMoney(e.target.value)}
        ></input>
        <input
          type="checkbox"
          className="result"
          checked={isChecked.checkbox1}
          onChange={() => {
            handleChange("checkbox1");
            setResult(false);
          }}
        ></input>
      </div>
      <div className="userResult">
        <input
          placeholder="Мои деньги"
          value={userMoney}
          onChange={(e) => setUserMoney(e.target.value)}
        ></input>
        <input
          type="checkbox"
          className="result"
          checked={isChecked.checkbox2}
          onChange={() => {
            handleChange("checkbox2");
            setResult(true);
          }}
        ></input>
      </div>
      <button onClick={sendResult}>Отправить</button>
    </div>
  );
};
export default FinalForm;
