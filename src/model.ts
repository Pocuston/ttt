export const X = "X";
export const O = "O";

export type Space = "X" | "O" | null;

export type Grid = Space[][];

export type Model = {
  grid: Grid;
  onMove: "X" | "O";
};

export function createModel(): Model {
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const onMove = O;
  return {
    grid,
    onMove
  };
}
