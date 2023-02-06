import ConcreteColor from "../core/Color";
import { Tool, ToolConstructor } from "../types/editor";

const rectangle: ToolConstructor = (start, state, dispatch) => {
  const drawRectangle: Tool = (pos) => {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: new ConcreteColor(state.color) });
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  };
  drawRectangle(start, state);
  return drawRectangle;
};

export default rectangle;
