export const X = "X";
export const O = "O";

export type Player = "X" | "O";

export type Space = Player | null;

export type Grid = Space[][];

export type GameResult = Player | null;

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
    [null, null, null]
  ];
  const gameResult = null;
  return {
    grid,
    playerOnMove,
    gameResult
  };
}

export function isValidMove(model: Model, position: Position): boolean {
  return (
    model.grid[position.row][position.col] === null && model.gameResult === null
  );
}

export function move(model: Model, position: Position): Model {
  if (!isValidMove(model, position)) {
    throw Error("Invalid move");
  }
  let grid = markSpace(model.grid, model.playerOnMove, position);
  let playerOnMove = switchPlayerOnMove(model.playerOnMove);
  let gameResult = computeGameResult(model.grid);

  return { grid, playerOnMove, gameResult };
}

function switchPlayerOnMove(currentPlayer: Player): Player {
  return currentPlayer === O ? X : O;
}

function markSpace(currentGrid: Grid, player: Player, position: Position) {
  const newGrid = [...currentGrid];
  newGrid[position.row][position.col] = player;
  return newGrid;
}

function computeGameResult(grid: Grid): GameResult {
  for (let i = 0; i < gridRows.length; i++) {
    if (hasPlayerThreeInRow(grid, O, gridRows[i])) {
      return O;
    }
    if (hasPlayerThreeInRow(grid, X, gridRows[i])) {
      return X;
    }
  }

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
  { row: 2, col: 2 }
];

export const gridRows: Position[][] = [
  //rows
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 }
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 }
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 }
  ],
  //columns
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 }
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 }
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 }
  ],
  //diagonals
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 }
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 }
  ]
];
