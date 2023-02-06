import Picture from "./core/Picture";
import ConcreteColor from "./core/Color";
import Editor from "./core/Editor";
import { EditorState } from "./types/state";
import draw from "./tools/draw";
import fill from "./tools/fill";
import picker from "./tools/picker";
import rectangle from "./tools/rectangle";
import ToolSelect from "./controls/ToolSelect";
import ColorSelect from "./controls/ColorSelect";

let state: EditorState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.fill(60, 30, new ConcreteColor("#f0f0f0")),
};

function updateState(state: EditorState, action: Partial<EditorState>) {
  return Object.assign({}, state, action);
}

let app = new Editor(
  {
    tools: { draw, fill, rectangle, picker },
    controls: [ToolSelect, ColorSelect],
    dispatch(action: Partial<EditorState>) {
      state = updateState(state, action);
      app.syncState(state);
    },
  },
  state
);

document.querySelector<HTMLDivElement>("#app")?.append(app.dom);
