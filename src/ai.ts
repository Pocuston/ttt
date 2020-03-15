import {
  gridPositions,
  isValidMove,
  Model,
  move,
  opponent,
  Player,
  Position
} from "./model";

export function resolveNextMove(model: Model): Position {
  const validMoves = getValidMoves(model);

  if (validMoves.length === 0) {
    throw Error("No valid move available");
  }

  let bestValue: number;
  let bestPosition = validMoves[0];

  validMoves.forEach(position => {
    let value = minimax(model, model.playerOnMove, position);
    if (!bestValue || value > bestValue) {
      bestValue = value;
      bestPosition = position;
    }
  });

  return bestPosition;
}

function minimax(model: Model, player: Player, position: Position): number {
  model = move(model, position);
  const gameResult = model.gameResult;

  if (gameResult === player) {
    return 1;
  }

  if (gameResult === opponent(player)) {
    return -1;
  }

  if (gameResult === "draw") {
    return 0;
  }

  let value = 0;
  //TODO recursively value all other moves
  const validMoves = getValidMoves(model);
  //TODO use reduce
  validMoves.forEach(
    position => (value = value + minimax(model, player, position))
  );

  return value;
}

function getValidMoves(model: Model): Position[] {
  return gridPositions.filter(position => isValidMove(model, position));
}
