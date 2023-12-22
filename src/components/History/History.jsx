import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./History.css";
const History = ({ exitPath }) => {
  const [predictions, setPredictions] = useState([]);

  const navigator = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get("http://45.10.247.30:8080/history", {
            params: {
              playerId: localStorage.getItem("playerId"),
              pagination: 1000,
              page: 1,
            },
          })
          .then((response) => setPredictions(response.data));
        // console.log(response);
        //ну или как-то иначе
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <h1>История прогнозов</h1>
      {predictions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>№ Прогноза</th>
              <th>Прогноз системы</th>
              <th>Исход</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((predict, index) => {
              console.log(predict);
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{Math.round(predict.predict * 100).toString() + " %"}</td>
                  <td>{predict.result ? "win" : "lose"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Нет данных</p>
      )}
      <button
        className="btn_History"
        onClick={() => {
          localStorage.setItem("isFormDisplayed", "true");
          navigator(-1);
        }}
      >
        Выйти
      </button>
    </>
  );
};
export default History;
