import React, {useState} from "react";
import "./App.css";

import {createModel} from "./model";
import Grid from "./Grid";

const App: React.FC = () => {
  const [model, setModel] = useState(createModel());
  return (
    <div className="App">
      <Grid model={model} />
    </div>
  );
};

export default App;
