export const X = "X";
export const O = "O";

export type Player = "X" | "O";

export const humanPlayer = X;
export const aiPlayer = O;

export type Space = Player | null;

export type Grid = Space[][];

export type GameResult = Player | "draw" | null;

export type Model = {
  grid: Grid;
  playerOnMove: Player;
  gameResult: GameResult;
};

export type Position = {
  row: number;
  col: number;
};

export function createModel(playerOnMove: Player): Model {
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const gameResult = null;
  return {
    grid,
    playerOnMove,
    gameResult,
  };
}

export function isValidMove(model: Model, move: Position): boolean {
  return model.grid[move.row][move.col] === null;
}

export function makeMove(model: Model, move: Position): Model {
  if (!isValidMove(model, move)) {
    throw Error("Invalid move");
  }
  let grid = markSpace(model.grid, model.playerOnMove, move);
  let playerOnMove = opponent(model.playerOnMove);
  let gameResult = computeGameResult(grid);

  return { grid, playerOnMove, gameResult };
}

export function opponent(player: Player): Player {
  return player === O ? X : O;
}

function markSpace(currentGrid: Grid, player: Player, position: Position) {
  //to make copy of two dimensional array, spread operator must be used for each row instead of [...currentGrid] otherwise reference would be copied and reused
  const newGrid: Grid = [
    [...currentGrid[0]],
    [...currentGrid[1]],
    [...currentGrid[2]],
  ];
  newGrid[position.row][position.col] = player;
  return newGrid;
}

export function computeGameResult(grid: Grid): GameResult {
  for (let i = 0; i < gridRows.length; i++) {
    if (hasPlayerThreeInRow(grid, O, gridRows[i])) {
      return O;
    }
    if (hasPlayerThreeInRow(grid, X, gridRows[i])) {
      return X;
    }
  }

  if (!isAnySpaceLeft(grid)) return "draw";

  return null;
}

function hasPlayerThreeInRow(
  grid: Grid,
  player: Player,
  row: Position[]
): boolean {
  return (
    spaceAt(grid, row[0]) === player &&
    spaceAt(grid, row[1]) === player &&
    spaceAt(grid, row[2]) === player
  );
}

function isAnySpaceLeft(grid: Grid) {
  return (
    gridPositions.find((position) => spaceAt(grid, position) === null) !==
    undefined
  );
}

export function spaceAt(grid: Grid, position: Position): Space {
  return grid[position.row][position.col];
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
  { row: 2, col: 2 },
];

export const gridRows: Position[][] = [
  //rows
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  //columns
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  //diagonals
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];
