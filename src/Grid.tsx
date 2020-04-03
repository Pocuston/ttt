import React from "react";

import "./Grid.css";
import { isValidMove, Model, Position } from "./model";

type GridProps = {
  model: Model | null;
  onSpaceClick: (position: Position) => void;
};

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const { model, onSpaceClick } = props;
  return (
    <div className={"grid"}>
      {model &&
        model.grid.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            const position = { row: rowIndex, col: colIndex };
            const canMove =
              model.gameResult === null && isValidMove(model, position);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={"space " + (canMove ? "can-move" : "")}
                onClick={() => canMove && onSpaceClick(position)}
              >
                {col}
              </div>
            );
          })
        )}
    </div>
  );
};

export default Grid;
