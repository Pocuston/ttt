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
  let depth = 0;
  validMoves.forEach(position => {
    let value = minimax(model, model.playerOnMove, position, depth);
    //console.log("For position", position, "value is:", value);
    if (!bestValue || value > bestValue) {
      bestValue = value;
      bestPosition = position;
    }
  });

  return bestPosition;
}

export function minimax(
  model: Model,
  player: Player,
  position: Position,
  depth: number
): number {
  let newModel = move(model, position);
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
  let value = isAiOnMove ? Number.MIN_VALUE : Number.MAX_VALUE;
  depth++;

  nextMoves.forEach(position => {
    let positionValue = minimax(newModel, player, position, depth);
    //for AI player we use maximum value from all next moves
    if (isAiOnMove && positionValue > value) {
      value = positionValue;
    }
    //for human player we use minimum value
    if (!isAiOnMove && positionValue < value) {
      value = positionValue;
    }
  });

  return value;
}

function getValidMoves(model: Model): Position[] {
  return gridPositions.filter(position => isValidMove(model, position));
}
