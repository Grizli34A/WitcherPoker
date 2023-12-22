import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../UserContext";
import axios from "axios";
import "./Login.css";
const Login = () => {
  const { setUserNameContext } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState(false);
  const navigator = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://45.10.247.30:8080/authorization",
        {
          login: userName,
          password: password,
        }
      );
      console.log("Успешный вход:", response);
      if (!response.data.right) {
        setPassword("");
        setCorrectPassword(true);
      } else {
        setUserNameContext(userName);
        localStorage.setItem("playerId", response.data.playerId);
        navigator("/game-menu");
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userName}
          placeholder="Логин"
          onChange={(e) => setUserName(e.target.value)}
        ></input>

        <input
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {correctPassword && (
          <p className="error-message">{"Введен неверный пароль"}</p>
        )}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
export default Login;
