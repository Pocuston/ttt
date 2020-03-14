import {createModel, gridPositions, isValidMove, move, spaceAt} from "./model";

test("createModel() creates empty grid", () => {
  const model = createModel();

  gridPositions.forEach(position =>
    expect(spaceAt(model, position)).toBe(null)
  );
});

test("createModel() creates 3x3 grid", () => {
  const model = createModel();

  expect(model.grid).toHaveLength(3);
  model.grid.forEach(row => expect(row).toHaveLength(3));
});

test("move() correctly changes space by player", () => {
  const model = createModel();
  const player = model.playerOnMove;
  move(model, { row: 2, col: 0 });

  expect(model.grid[2][0]).toBe(player);
});

test("isValidMove() returns true on non-occupied cell", () => {
  const model = createModel();
  const position = { row: 2, col: 0 };
  expect(isValidMove(model, position)).toBe(true);
});

test("isValidMove() indicates occupies space", () => {
  let model = createModel();
  const position = { row: 2, col: 0 };
  model = move(model, position);

  expect(isValidMove(model, position)).toBe(false);
});
