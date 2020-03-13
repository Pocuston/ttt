import React from "react";

import "./Grid.css";
import {Model} from "./model";

type GridProps = {
  model: Model;
};

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const { model } = props;
  return (
    <div className={"grid"}>
      {model.grid.map(row => row.map(col => <div className={"space"}>O</div>))}
    </div>
  );
};

export default Grid;
