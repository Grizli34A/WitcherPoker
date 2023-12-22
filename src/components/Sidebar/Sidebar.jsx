import constructorImage from "../../img/constructor.svg";
import bookImage from "../../img/book.svg";
import exitImage from "../../img/exit.svg";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = ({ setShowConstructor }) => {
  const handleConstructorClick = () => {
    setShowConstructor((prevShowConstructor) => !prevShowConstructor);
  };

  return (
    <section className="menu">
      <ul>
        <li>
          <Link to="/game">
            <img
              src={constructorImage}
              alt="Constructor"
              onClick={handleConstructorClick}
            />
          </Link>
        </li>
        <li>
          <Link to="/history">
            <img src={bookImage} alt="History" />
          </Link>
        </li>
        <li>
          <Link
            to="/game-menu"
            onClick={() => {
              localStorage.removeItem("gameData");
              localStorage.removeItem("idGame");
              localStorage.removeItem("probability");
              localStorage.removeItem("dicesChange");
            }}
          >
            <img src={exitImage} alt="Exit" />
          </Link>
        </li>
      </ul>
    </section>
  );
};
export default Sidebar;
