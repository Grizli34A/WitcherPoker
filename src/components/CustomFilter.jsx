import { useEffect, useState } from "react";
import "./CustomFilter.css";

const CustomFilter = (props) => {
  const [filterId, setFilterId] = useState();
  const [resultFilter, setResultFilter] = useState();
  const [predictFilter, setPredictFilter] = useState(100);
  useEffect(() => {
    let filteredPredictions = props.originalPredictions;

    if (resultFilter === "win") {
      filteredPredictions = filteredPredictions.filter(
        (predict) => predict.result === true
      );
    } else if (resultFilter === "lose") {
      filteredPredictions = filteredPredictions.filter(
        (predict) => predict.result === false
      );
    }

    if (filterId && filterId.trim() !== "") {
      filteredPredictions = filteredPredictions.filter(
        (predict) => predict.number === Number(filterId)
      );
    }
    if (predictFilter !== 100) {
      const minPredict = predictFilter / 100;
      filteredPredictions = filteredPredictions.filter(
        (predict) => predict.predict >= minPredict
      );
    }
    // Здесь можно добавить другие условия фильтрации, если они есть

    props.setPredictions(filteredPredictions);
  }, [resultFilter, filterId, predictFilter, props.originalPredictions]); // Добавьте здесь все переменные состояния, которые влияют на фильтрацию

  return (
    <div className="filterSorting">
      <h2>Фильтровать</h2>
      <div className="filter">
        {/* Остальные элементы фильтрации */}
        <p>Поиск игры по ID</p>
        <input
          type="text"
          value={filterId}
          className="idFilter"
          onChange={(e) => setFilterId(e.target.value)}
          placeholder="Введите ID"
        />

        <div className="result__filter">
          <p>Фильтрация по результату</p>
          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
          >
            <option value="">Все</option>
            <option value="win">Победа</option>
            <option value="lose">Поражение</option>
          </select>
        </div>
      </div>
      <div className="percent__filter">
        <p>Фильтрация по вероятности</p>
        <p>{predictFilter}</p>
        <span>0%</span>
        <input
          className="input__percent"
          type="range"
          min="0"
          max="100"
          value={predictFilter}
          onChange={(e) => setPredictFilter(e.target.value)}
        />
        <span>100%</span>
      </div>

      <h2>Сортировать</h2>
      <select
        value={props.sortBy}
        onChange={(e) => props.setSortBy(e.target.value)}
      >
        <option>сначала старые</option>
        <option>сначала новые</option>
        <option>по победам</option>
        <option>по поражениям</option>
        <option>по возрастанию процента</option>
        <option>по убыванию процента</option>
      </select>
    </div>
  );
};
export default CustomFilter;
