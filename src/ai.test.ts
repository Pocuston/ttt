import { createModel, move, O } from "./model";
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
  model = move(model, resolveNextMove(model));
});
