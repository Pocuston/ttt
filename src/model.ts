export const X = "X";
export const O = "O";

export type Player = "X" | "O";

export type Space = Player | null;

export type Grid = Space[][];

export type Model = {
  grid: Grid;
  playerOnMove: Player;
};

export type Position = {
  row: number;
  col: number;
};

export function createModel(playerOnMove: Player): Model {
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  return {
    grid,
    playerOnMove
  };
}

export function isValidMove(model: Model, position: Position): boolean {
  return model.grid[position.row][position.col] === null;
}

export function move(model: Model, position: Position): Model {
  if (!isValidMove(model, position)) {
    throw Error("Invalid move");
  }
  let grid = markSpace(model.grid, model.playerOnMove, position);
  let playerOnMove = switchPlayerOnMove(model.playerOnMove);

  return { grid, playerOnMove };
}

function switchPlayerOnMove(currentPlayer: Player): Player {
  return currentPlayer === O ? X : O;
}

function markSpace(currentGrid: Grid, player: Player, position: Position) {
  const newGrid = [...currentGrid];
  newGrid[position.row][position.col] = player;
  return newGrid;
}

export const gridPositions: Position[] = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 2, col: 0 },
  { row: 2, col: 1 },
  { row: 2, col: 2 }
];

export function spaceAt(model: Model, position: Position): Space {
  return model.grid[position.row][position.col];
}
