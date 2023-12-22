import { useState } from "react";
import "./StartConstructor.css";
const StartConstructor = ({ onSubmit }) => {
  const [enemyName, setEnemyName] = useState("");
  const [enemyMoney, setEnemyMoney] = useState("");
  const [userMoney, setUserMoney] = useState("");
  const handleMoney = (e, setState) => {
    if (!isNaN(e.target.value)) {
      setState(e.target.value);
    }
  };
  const handleSubmit = () => {
    const formData = {
      enemyName,
      enemyMoney,
      userMoney,
    };
    // Вызываем функцию onSubmit, передавая ей данные формы
    onSubmit(formData);
  };
  return (
    <div className="modal">
      <h1>Ввод начальных данных</h1>
      <input
        type="text"
        value={enemyName}
        placeholder="Никнейм противника"
        onChange={(e) => setEnemyName(e.target.value)}
      ></input>
      <input
        type="text"
        value={enemyMoney}
        placeholder="Деньги противника"
        onChange={(e) => handleMoney(e, setEnemyMoney)}
      ></input>
      <input
        type="text"
        value={userMoney}
        placeholder="Мои деньги"
        onChange={(e) => handleMoney(e, setUserMoney)}
      ></input>
      <button onClick={handleSubmit}>Создать игру</button>
    </div>
  );
};
export default StartConstructor;
