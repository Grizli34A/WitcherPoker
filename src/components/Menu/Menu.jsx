import "./Menu.css";
import axios from "axios";
import { useNavigate } from "react-router";
const Menu = () => {
  const navigator = useNavigate();
  const createGame = async () => {
    try {
      const response = await axios.post("http://45.10.247.30:8080/game/start", {
        playerId: localStorage.getItem("playerId"),
      });
      localStorage.setItem("idGame", response.data);
      console.log(response);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };
  return (
    <div className="container">
      <form>
        <button
          className="btn_Menu"
          onClick={() => {
            localStorage.removeItem("isFormDisplayed");
            createGame();
            navigator("/game");
          }}
        >
          Создать игру
        </button>
        <button className="btn_Menu" onClick={() => navigator("/history")}>
          История игр
        </button>
        <button
          className="btn_Menu"
          onClick={() => {
            localStorage.removeItem("playerId");
            navigator("/");
          }}
        >
          Выйти
        </button>
      </form>
    </div>
  );
};
export default Menu;
