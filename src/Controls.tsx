import React from "react";
import { aiPlayer, GameResult, humanPlayer, Model, Player } from "./model";
import "./Controls.css";

type ControlsProps = {
  model: Model | null;
  onGameStart: (firstPlayer: Player) => void;
};

function renderGameResult(gameResult: GameResult | undefined) {
  return gameResult === "draw" ? (
    <>Draw!</>
  ) : (
    <>
      Player <span className={"player"}>{gameResult}</span> won.
    </>
  );
}

function renderStartGame(onGameStartClick: (firstPlayer: Player) => void) {
  return (
    <div>
      Who plays first?{" "}
      <button onClick={() => onGameStartClick(humanPlayer)}>Me!</button>{" "}
      <button onClick={() => onGameStartClick(aiPlayer)}>GLaDOS!</button>
    </div>
  );
}

function renderPlayerOnMove(playerOnMove: Player | undefined) {
  return (
    <span className={"on-move"}>
      Player <span className={"player"}>{playerOnMove}</span> is on move.
    </span>
  );
}

const Controls: React.FC<ControlsProps> = (props) => {
  const { onGameStart, model } = props;
  const newGame = model === null;
  const gameInProgress = model !== null && model.gameResult === null;
  const gameFinished = model !== null && model.gameResult !== null;
  return (
    <section className={"controls"}>
      {newGame && renderStartGame(onGameStart)}
      {gameInProgress && renderPlayerOnMove(model?.playerOnMove)}
      {gameFinished && (
        <>
          {renderGameResult(model?.gameResult)}
          {" Another game? "}
          {renderStartGame(onGameStart)}
        </>
      )}
    </section>
  );
};

export default Controls;
