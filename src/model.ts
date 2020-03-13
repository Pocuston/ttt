export const X = "X";
export const O = "O";

export type Space = "X" | "O" | null;

export type Grid = Space[][];

export type Player = "X" | "O";

export type Model = {
  grid: Grid;
  onMove: Player;
};

export type Position = {
  row: number;
  col: number;
};

export function createModel(): Model {
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const onMove = O;
  return {
    grid,
    onMove
  };
}

export function isValidMove(model: Model, position: Position): boolean {
  return model.grid[position.row][position.col] === null;
}

export function move(model: Model, position: Position): Model {
  if (!isValidMove(model, position)) {
    return model;
  }
  const grid = markSpace(model.grid, position, model.onMove);
  const onMove = switchOnMove(model.onMove);
  return { ...model, grid, onMove };
}

function switchOnMove(currentPlayer: Player): Player {
  return currentPlayer === O ? X : O;
}

function markSpace(currentGrid: Grid, position: Position, player: Player) {
  const newGrid = [...currentGrid];
  newGrid[position.row][position.col] = player;
  return newGrid;
}
