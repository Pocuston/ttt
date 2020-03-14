import {createModel, move, O, X} from "./model";
import {resolveNextMove} from "./ai";

test("AI does always valid move", () => {
  let model = createModel(O);
  model = move(model, resolveNextMove(model, O));
  model = move(model, resolveNextMove(model, X));
  model = move(model, resolveNextMove(model, O));
  model = move(model, resolveNextMove(model, X));
  model = move(model, resolveNextMove(model, O));
  model = move(model, resolveNextMove(model, X));
  model = move(model, resolveNextMove(model, O));
  model = move(model, resolveNextMove(model, X));
  model = move(model, resolveNextMove(model, O));
});
