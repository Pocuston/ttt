import React from "react";
import { aiPlayer, GameResult, humanPlayer, Model, Player } from "./model";
import "./Controls.css";

type ControlsProps = {
  model: Model | null;
  onGameStart: (firstPlayer: Player) => void;
};

function renderGameResult(gameResult: GameResult | undefined) {
  return (
    <div className={"game-result"}>
      {gameResult === "draw" ? (
        <h1 className={"draw"}>Draw!</h1>
      ) : (
        <>
          {gameResult === humanPlayer ? (
            <h1 className={"you-win"}>You win!</h1>
          ) : (
            <h1 className={"you-loose"}>You loose!</h1>
          )}
        </>
      )}
    </div>
  );
}

function renderStartGame(
  onGameStartClick: (firstPlayer: Player) => void,
  firstGame: boolean = true
) {
  return (
    <span>
      {firstGame ? (
        <h1 className={"first-player"}>Who plays first?</h1>
      ) : (
        <h3 className={"first-player"}>Another game? Who plays first?</h3>
      )}
      <button
        className={"button-primary"}
        onClick={() => onGameStartClick(humanPlayer)}
      >
        Me!
      </button>{" "}
      <button
        className={"button-primary"}
        onClick={() => onGameStartClick(aiPlayer)}
      >
        GlaDOS!
      </button>
    </span>
  );
}

function renderPlayerOnMove(playerOnMove: Player | undefined) {
  return playerOnMove === humanPlayer ? (
    <h1 className={"your-move"}>Your move...</h1>
  ) : (
    <h1 className={"ai-move"}>GlaDOS is on move ...</h1>
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
        <div>
          {renderGameResult(model?.gameResult)}
          {renderStartGame(onGameStart, false)}
        </div>
      )}
    </section>
  );
};

export default Controls;
