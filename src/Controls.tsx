import React from "react";
import { GameResult } from "./model";
import "./Controls.css";

type ControlsProps = {
  gameResult: GameResult;
  onPlayAgainClick: () => void;
};

const Controls: React.FC<ControlsProps> = props => {
  return (
    <section className={"controls"}>
      {props.gameResult !== null ? (
        <span className={"game-result"}>
          Player {props.gameResult} won.{" "}
          <button onClick={props.onPlayAgainClick}>Play again.</button>{" "}
        </span>
      ) : (
        ""
      )}
    </section>
  );
};

export default Controls;
