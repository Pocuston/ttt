import React, {useState} from "react";
import "./App.css";

import {createModel, move} from "./model";
import Grid from "./Grid";

const App: React.FC = () => {
  const [model, setModel] = useState(createModel());
  return (
    <div className="App">
      <Grid
        model={model}
        onSpaceClick={position => setModel(model => move(model, position))}
      />
    </div>
  );
};

export default App;
