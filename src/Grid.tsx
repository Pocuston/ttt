import React from "react";

import "./Grid.css";
import {Model, Position} from "./model";

type GridProps = {
  model: Model;
  onSpaceClick: (position: Position) => void;
};

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const { model, onSpaceClick } = props;
  return (
    <div className={"grid"}>
      {model.grid.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={"space"}
            onClick={() => onSpaceClick({ row: rowIndex, col: colIndex })}
          >
            {col}
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
