import { createModel, move, O, X } from "./model";
import { resolveNextMove } from "./ai";

test("AI does always valid move", () => {
  let model = createModel(O);
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  model = move(model, resolveNextMove(model));
  move(model, resolveNextMove(model));
});

//On situation below, O player chooses [0,2]
// - X -
// - O X
// O X -
test("AI takes shortest path to victory", () => {
  //X plays first, AI plays O second
  let model = createModel(X);
  model = move(model, { row: 0, col: 1 });
  model = move(model, { row: 1, col: 1 });
  model = move(model, { row: 1, col: 2 });
  model = move(model, { row: 2, col: 0 });
  model = move(model, { row: 2, col: 1 });

  //O is on the move. It should choose {0,2} to win
  let aiNextMove = resolveNextMove(model);
  expect(aiNextMove).toStrictEqual({ row: 0, col: 2 });
});

//On situation below, O player chooses [2,2]
// O X X
// X X -
// O O -
test("AI chooses right from two final moves", () => {
  let model = createModel(X);
  model.grid[0][0] = O;
  model.grid[0][1] = X;
  model.grid[0][2] = X;

  model.grid[1][0] = X;
  model.grid[1][1] = X;

  model.grid[2][0] = O;
  model.grid[2][1] = O;

  model.playerOnMove = O;

  let aiNextMove = resolveNextMove(model);
  expect(aiNextMove).toStrictEqual({ row: 2, col: 2 });
});

//On situation below, X player chooses [0,0]
// - O -
// O X O
// - - X
test("AI chooses first victory move", () => {
  let model = createModel(X);

  model.grid[0][1] = O; //1
  model.grid[1][1] = X; //2
  model.grid[1][0] = O; //3
  model.grid[2][2] = X; //4
  model.grid[1][2] = O; //5

  model.playerOnMove = X;

  let aiNextMove = resolveNextMove(model);
  expect(aiNextMove).toStrictEqual({ row: 0, col: 0 });
});

//On situation below, X player chooses [0,0]
// X - O
// - - O
// - - -
test("AI prevents opponent's victory", () => {
  let model = createModel(O);

  model.grid[0][0] = X;
  model.grid[0][2] = O;
  model.grid[1][2] = O;

  model.playerOnMove = X;

  let aiNextMove = resolveNextMove(model);
  expect(aiNextMove).toStrictEqual({ row: 2, col: 2 });
});
