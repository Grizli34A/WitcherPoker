import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./History.css";
import CustomFilter from "../CustomFilter";
const History = ({ exitPath }) => {
  const [originalPredictions, setOriginalPredictions] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
          .then((response) => {
            setPredictions(response.data);
            setOriginalPredictions(response.data);
          });
        // console.log(response);
        //ну или как-то иначе
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(predictions.length / itemsPerPage);
  const currentData = predictions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Функции для управления пагинацией
  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };
  useEffect(() => {
    let sortedPredictions = [...predictions];
    switch (sortBy) {
      case "сначала старые":
        sortedPredictions.sort(function (a, b) {
          return a.number - b.number;
        });
        break;
      case "сначала новые":
        console.log("новые");
        sortedPredictions.sort(function (a, b) {
          return b.number - a.number;
        });
        break;
      case "по победам":
        sortedPredictions.sort((a, b) => {
          return Number(b.result) - Number(a.result);
        });
        break;
      case "по поражениям":
        sortedPredictions.sort((a, b) => {
          return Number(a.result) - Number(b.result);
        });
        break;
      case "по возрастанию процента":
        sortedPredictions.sort((a, b) => {
          return a.predict - b.predict;
        });
        break;
      case "по убыванию процента":
        sortedPredictions.sort((a, b) => {
          return b.predict - a.predict;
        });
        break;
    }

    setPredictions(sortedPredictions);
  }, [sortBy]);
  return (
    <>
      <h1>История прогнозов</h1>
      <CustomFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        predictions={predictions}
        setPredictions={setPredictions}
        originalPredictions={originalPredictions}
      />
      {predictions.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>№ Прогноза</th>
                <th>№ Игры</th>
                <th>Прогноз системы</th>
                <th>Исход</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((predict, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{predict.number}</td>
                    <td>
                      {Math.round(predict.predict * 100).toString() + "%"}
                    </td>
                    <td>{predict.result ? "win" : "lose"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="btn-page">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Назад
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>
        </>
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
