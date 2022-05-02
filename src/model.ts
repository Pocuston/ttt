/** Symbol for X */
export const X = "X";

/** Symbol for O */
export const O = "O";

/** Player is X or O */
export type Player = "X" | "O";

/** Human player is always X */
export const humanPlayer = X;

/** AI player is always O */
export const aiPlayer = O;

/** Space in grid can be occupied by Player or empty */
export type Space = Player | null;

/** 3x3 grid of Spaces */
export type Grid = Space[][];

/** Game result can be a win of one of Players, draw or null (game is in progress) */
export type GameResult = Player | "draw" | null;

/** Game model */
export type Model = {
  grid: Grid;
  playerOnMove: Player;
  gameResult: GameResult;
};

/** Position in 3x3 grid */
export type Position = {
  row: number;
  col: number;
};

/**
 * Creates model for a new game
  * @param playerOnMove
 */
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

/**
 * Validates valid move
 * @param model
 * @param move
 */
export function isValidMove(model: Model, move: Position): boolean {
  return model.grid[move.row][move.col] === null;
}

/**
 * Makes move and returns mutated model
 * @param model
 * @param move
 */
export function makeMove(model: Model, move: Position): Model {
  if (!isValidMove(model, move)) {
    throw Error("Invalid move");
  }
  let grid = markSpace(model.grid, model.playerOnMove, move);
  let playerOnMove = opponent(model.playerOnMove);
  let gameResult = computeGameResult(grid);

  return { grid, playerOnMove, gameResult };
}

/**
 * Gives opponent for player
 * @param player
 */
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

/**
 * Computes and returns current game result
 * @param grid
 */
export function computeGameResult(grid: Grid): GameResult {
  for (const element of gridRows) {
    if (hasPlayerThreeInRow(grid, O, element)) {
      return O;
    }
    if (hasPlayerThreeInRow(grid, X, element)) {
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

/**
 * Returns space at grid position
 * @param grid
 * @param position
 */
export function spaceAt(grid: Grid, position: Position): Space {
  return grid[position.row][position.col];
}

/**
 * List of 3x3 grid positions
 */
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

/**
 * Positions to check for a win
 */
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
