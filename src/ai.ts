import { gridPositions, isValidMove, Model, Position } from "./model";

export function resolveNextMove(model: Model): Position {
  const validMoves = gridPositions.filter(position =>
    isValidMove(model, position)
  );

  if (validMoves.length === 0) {
    throw Error("No valid move available");
  }

  return validMoves[0];
}
