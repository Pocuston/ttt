import React from "react";
import { GameResult, Player } from "./model";
import "./Controls.css";

type ControlsProps = {
  gameResult: GameResult;
  onPlayAgainClick: () => void;
};

function getGameResultText(gameResult: Player | "draw") {
  return gameResult === "draw" ? (
    <>Draw!</>
  ) : (
    <>
      Player <span className={"player"}>{gameResult}</span> won.
    </>
  );
}

const Controls: React.FC<ControlsProps> = props => {
  return (
    <section className={"controls"}>
      {props.gameResult !== null ? (
        <span className={"game-result"}>
          {getGameResultText(props.gameResult)}
          <button onClick={props.onPlayAgainClick}>Play again.</button>{" "}
        </span>
      ) : (
        ""
      )}
    </section>
  );
};

export default Controls;
