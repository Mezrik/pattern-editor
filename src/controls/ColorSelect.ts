import { createElement } from "../lib/dom";
import { EditorInputConfig } from "../types/editor";
import { EditorState } from "../types/state";
import { ControlInterface } from "./Control";

class ColorSelect implements ControlInterface {
  private _dom: HTMLElement;
  private _input: HTMLInputElement;

  constructor(state: EditorState, { dispatch }: EditorInputConfig) {
    this._input = createElement("input", {
      type: "color",
      value: state.color,
      onchange: () => dispatch({ color: this._input.value }),
    });
    this._dom = createElement("label", null, "🎨 Color: ", this._input);
  }

  syncState(state: EditorState) {
    this._input.value = state.color;
  }

  get dom() {
    return this._dom;
  }
}

export default ColorSelect;
