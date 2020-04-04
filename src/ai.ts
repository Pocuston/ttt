import {
  gridPositions,
  isValidMove,
  Model,
  makeMove,
  opponent,
  Player,
  Position,
} from "./model";

export function resolveNextMove(model: Model): Position {
  const validMoves = getValidMoves(model);

  if (validMoves.length === 0) {
    throw Error("No valid move available");
  }

  let bestValue = Number.MIN_SAFE_INTEGER;
  let bestMove = validMoves[0];
  let depth = 0;
  validMoves.forEach((move) => {
    let value = minimax(model, model.playerOnMove, move, depth);
    //console.log("For position", position, "value is:", value);
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  });

  return bestMove;
}

export function minimax(
  model: Model,
  player: Player,
  move: Position,
  depth: number
): number {
  let newModel = makeMove(model, move);
  const gameResult = newModel.gameResult;

  //if move lead to AI player victory, we give positive reward
  //reward is lessen by recursion depth to prefer early victory
  if (gameResult === player) {
    return 10 - depth;
  }
  //if move lead to human victory, we give negative reward
  //reward is increased by recursion depth to prefer later loss
  if (gameResult === opponent(player)) {
    return -10 + depth;
  }

  if (gameResult === "draw") {
    return 0;
  }

  //if game we are not in final state, we call minimax recursively until we reach one of final states
  const nextMoves = getValidMoves(newModel);
  let isAiOnMove = newModel.playerOnMove === player;
  let value = isAiOnMove ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
  depth++;

  nextMoves.forEach((move) => {
    let moveValue = minimax(newModel, player, move, depth);
    //for AI player we use maximum value from all next moves
    if (isAiOnMove && moveValue > value) {
      value = moveValue;
    }
    //for human player we use minimum value
    if (!isAiOnMove && moveValue < value) {
      value = moveValue;
    }
  });

  return value + (isAiOnMove ? -depth : depth);
}

function getValidMoves(model: Model): Position[] {
  return gridPositions.filter((position) => isValidMove(model, position));
}
