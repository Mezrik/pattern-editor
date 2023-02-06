import { ToolConstructor } from "../types/editor";

const pick: ToolConstructor = (pos, state, dispatch) => {
  dispatch({ color: state.picture.getPixel(pos.x, pos.y).value });
};

export default pick;
