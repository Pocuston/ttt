import React, {useState} from "react";
import "./App.css";

import {createModel, Model, move, O, Player, Position, X} from "./model";
import Grid from "./Grid";
import {resolveNextMove} from "./ai";

function initializeModel(): Model {
  return createModel(getRandomPlayer());
}

function getRandomPlayer(): Player {
  const rand = Math.floor(Math.random() * 2);
  return rand === 0 ? X : O;
}

function makePlayerMove(model: Model, position: Position): Model {
  model = move(model, position);

  if (model.gameResult !== null) {
    return model;
  }

  let aiMove = resolveNextMove(model);
  model = move(model, aiMove);
  return model;
}

const App: React.FC = () => {
  const [model, setModel] = useState(initializeModel());
  return (
    <div className="App">
      <Grid
        model={model}
        onSpaceClick={position => setModel(makePlayerMove(model, position))}
      />
    </div>
  );
};

export default App;
