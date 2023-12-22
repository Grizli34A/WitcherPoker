import userImg from "../../img/user.png";
import cashLogo from "../../img/coin.svg";
// import cash from "../../img/cash.png";
// import cashAvg from "../../img/cashAvg.png";
// import cashBig from "../../img/cashBig.png";
import cub1 from "../../img/dices/cub1.png";
import cub2 from "../../img/dices/cub2.png";
import cub3 from "../../img/dices/cub3.png";
import cub4 from "../../img/dices/cub4.png";
import cub5 from "../../img/dices/cub5.png";
import cub6 from "../../img/dices/cub6.png";
import "./Field.css";
const Field = (props) => {
  const enemyDices = props.dices?.slice(0, 5);
  const playerDices = props.dices?.slice(5, 10);
  const dicesChange = localStorage.getItem("dicesChange")?.split(",");
  console.log(dicesChange);
  return (
    <div className="field">
      <div className="enemy">
        <img src={userImg} />
        <div className="userInfo">
          <p>{props.data.enemyName}</p>
          <div>
            {props.data.enemyMoney}
            <img src={cashLogo} />
          </div>
        </div>
      </div>
      <div className="mainField">
        <div className="dices">
          {enemyDices.map((dice, index) => (
            <img
              key={index}
              src={
                dice === "1"
                  ? cub1
                  : dice === "2"
                  ? cub2
                  : dice === "3"
                  ? cub3
                  : dice === "4"
                  ? cub4
                  : dice === "5"
                  ? cub5
                  : cub6
              }
            />
          ))}
        </div>
        {localStorage.getItem("probability") !== null && (
          <div className="probability">
            <p>
              Вероятность победы равна{" "}
              {Math.round(
                parseFloat(localStorage.getItem("probability")) * 100
              )}
              %
            </p>
          </div>
        )}
        <div className="summa">
          {/* <img src={cash}></img>
          <p>1000</p> */}
        </div>
        <div className="dices">
          {playerDices.map((dice, index) => (
            <img
              className={dicesChange[index] === "1" ? "dice__choice" : ""}
              key={index}
              src={
                dice === "1"
                  ? cub1
                  : dice === "2"
                  ? cub2
                  : dice === "3"
                  ? cub3
                  : dice === "4"
                  ? cub4
                  : dice === "5"
                  ? cub5
                  : cub6
              }
            />
          ))}
        </div>
      </div>
      <div className="user">
        <img src={userImg} />
        <div className="userInfo">
          <p>{props.userName}</p>
          <div>
            {props.data.userMoney}
            <img src={cashLogo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Field;
