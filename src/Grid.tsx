import React from "react";

import "./Grid.css";
import { humanPlayer, isValidMove, Model, Position, Space } from "./model";

/**
 * Grid component props
 */
export type GridProps = {
  model: Model | null;
  onSpaceClick: (position: Position) => void;
};

function spaceClassName(
  canMove: boolean,
  rowIndex: number,
  colIndex: number,
  space: Space
) {
  let classByPlayer = "";
  if (space !== null) {
    classByPlayer = space === humanPlayer ? "human" : "ai";
  }
  return `space ${canMove ? "can-move" : ""} ${rowIndex < 2 ? "bottom" : ""} ${
    colIndex < 2 ? "right" : ""
  } ${classByPlayer}`;
}

const Grid: React.FC<GridProps> = ({ model, onSpaceClick }) => {
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
                className={spaceClassName(canMove, rowIndex, colIndex, col)}
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
