import {gridPositions, isValidMove, Model, Player, Position} from "./model";

export function resolveNextMove(model: Model, player: Player): Position {
  const validMoves = gridPositions.filter(position =>
    isValidMove(model, position)
  );
  return validMoves[0];
}
