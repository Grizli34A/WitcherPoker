import "./Constructor.css";
import { useState } from "react";
import axios from "axios";
const Constructor = ({ setDices, setShowFinalForm }) => {
  const [inputs, setInputs] = useState(Array(10).fill(""));
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };
  const postData = async () => {
    try {
      const response = await axios.post("http://45.10.247.30:8080/game/step", {
        idGame: localStorage.getItem("idGame"),
        dropValuesPlayer: inputs.slice(5, 10),
        dropValuesEnemy: inputs.slice(0, 5),
      });
      setDices(inputs);
      localStorage.setItem("probability", response.data.probability);
      localStorage.setItem("dicesChange", response.data.set);
      setShowFinalForm(true);
      console.log(response);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };
  return (
    <>
      <div className="constructor">
        <h2>Кубики противника</h2>
        {inputs.map((input, index) => (
          <>
            <p>{input}</p>
            <input
              className="constructor__input"
              min={1}
              max={6}
              key={index}
              type="range"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            {index === 4 && <h2>Мои кубики</h2>}
          </>
        ))}
        <div>
          <button className="constructor__btn" onClick={postData}>
            Отправить данные
          </button>
        </div>
      </div>
    </>
  );
};
export default Constructor;
