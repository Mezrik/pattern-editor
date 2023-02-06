import ConcreteColor from "../core/Color";
import { ToolConstructor } from "../types/editor";

const around = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

const fill: ToolConstructor = ({ x, y }, state, dispatch) => {
  let targetColor = state.picture.getPixel(x, y);

  let drawn = [{ x, y, color: new ConcreteColor(state.color) }];
  for (let done = 0; done < drawn.length; done++) {
    for (let { dx, dy } of around) {
      let x = drawn[done].x + dx,
        y = drawn[done].y + dy;
      if (
        x >= 0 &&
        x < state.picture.width &&
        y >= 0 &&
        y < state.picture.height &&
        state.picture.getPixel(x, y) == targetColor &&
        !drawn.some((p) => p.x == x && p.y == y)
      ) {
        drawn.push({ x, y, color: new ConcreteColor(state.color) });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
};

export default fill;
