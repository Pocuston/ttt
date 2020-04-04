import React, { useState } from "react";
import "./App.css";

import {
  aiPlayer,
  createModel,
  Model,
  makeMove,
  Player,
  Position,
} from "./model";
import Grid from "./Grid";
import { resolveNextMove } from "./ai";
import Controls from "./Controls";

function startGame(firstPlayer: Player) {
  let model = createModel(firstPlayer);

  if (firstPlayer === aiPlayer) {
    let aiMove = resolveNextMove(model);
    model = makeMove(model, aiMove);
  }

  return model;
}

function makePlayerMove(model: Model, position: Position): Model {
  model = makeMove(model, position);

  if (model.gameResult !== null) {
    console.log("Game finished:", model);
    return model;
  }

  let aiMove = resolveNextMove(model);
  model = makeMove(model, aiMove);
  return model;
}

const App: React.FC = () => {
  const [model, setModel] = useState<Model | null>(null);
  return (
    <div className="App">
      <Controls
        model={model}
        onGameStart={(firstPlayer) => setModel(startGame(firstPlayer))}
      />
      <Grid
        model={model}
        onSpaceClick={(position) =>
          model && setModel(makePlayerMove(model, position))
        }
      />
    </div>
  );
};

export default App;
