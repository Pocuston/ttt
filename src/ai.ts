import {gridPositions, isValidMove, Model, Player, Position} from "./model";

export function resolveNextMove(model: Model, player: Player): Position {
  const validMoves = gridPositions.filter(position =>
    isValidMove(model, position)
  );

  if (validMoves.length === 0) {
    throw Error("No valid move available");
  }

  return validMoves[0];
}
