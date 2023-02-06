import ConcreteColor from "../core/Color";
import { Tool, ToolConstructor } from "../types/editor";

const draw: ToolConstructor = (pos, state, dispatch) => {
  const drawPixel: Tool = ({ x, y }, state) => {
    let drawn = { x, y, color: new ConcreteColor(state.color) };
    dispatch({ picture: state.picture.draw([drawn]) });
  };
  drawPixel(pos, state);
  return drawPixel;
};

export default draw;
