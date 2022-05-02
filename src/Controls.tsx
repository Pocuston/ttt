import React from "react";
import { aiPlayer, GameResult, humanPlayer, Model, Player } from "./model";
import "./Controls.css";

/**
 * Control component props
 */
export type ControlsProps = {
  model: Model | null;
  onGameStart: (firstPlayer: Player) => void;
};

function renderGameResult(gameResult: GameResult | undefined) {
  switch (gameResult) {
    case "draw":
      return <h1 className={"draw"}>Draw!</h1>;
    case humanPlayer:
      return <h1 className={"you-win"}>You win!</h1>;
    case aiPlayer:
      return <h1 className={"you-loose"}>You loose!</h1>;
    default:
      return null;
  }
}

function renderStartGame(
  onGameStartClick: (firstPlayer: Player) => void,
  firstGame: boolean = true
) {
  return (
    <div>
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
        Computer!
      </button>
    </div>
  );
}

function renderPlayerOnMove(playerOnMove: Player | undefined) {
  return playerOnMove === humanPlayer ? (
    <h1 className={"your-move"}>Your move...</h1>
  ) : (
    <h1 className={"ai-move"}>GlaDOS is on move ...</h1>
  );
}

const Controls: React.FC<ControlsProps> = ({ onGameStart, model }) => {
  const newGame = model === null;
  const gameInProgress = model !== null && model.gameResult === null;
  const gameFinished = model !== null && model.gameResult !== null;
  return (
    <section className={"controls"}>
      {newGame && renderStartGame(onGameStart)}
      {gameInProgress && renderPlayerOnMove(model?.playerOnMove)}
      {gameFinished && (
        <div>
          <div className={"game-result"}>
            {renderGameResult(model?.gameResult)}
          </div>
          {renderStartGame(onGameStart, false)}
        </div>
      )}
    </section>
  );
};

export default Controls;
