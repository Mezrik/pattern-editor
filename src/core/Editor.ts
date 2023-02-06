import PictureCanvas from "./PictureCanvas";
import { EditorInputConfig } from "../types/editor";
import { createElement } from "../lib/dom";
import { EditorState } from "../types/state";
import { ControlInterface } from "../controls/Control";

class Editor {
  private state: EditorState;
  private _canvas: PictureCanvas;
  private _controls: ControlInterface[];
  private _dom: HTMLElement;

  constructor(config: EditorInputConfig, state: EditorState) {
    const { tools, controls, dispatch } = config;
    this.state = state;

    this._canvas = new PictureCanvas(state.picture, (pos) => {
      let onMove = tools[this.state.tool](pos, this.state, dispatch);
      if (onMove) return (pos) => onMove && onMove(pos, this.state);
      return;
    });

    this._controls = controls.map((Control) => new Control(state, config));

    this._dom = createElement(
      "div",
      {},
      this._canvas.dom,
      createElement("br"),
      ...this._controls.reduce<(HTMLElement | string)[]>(
        (a, c) => a.concat(" ", c.dom),
        []
      )
    );
  }

  public syncState(state: EditorState) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this._controls) ctrl.syncState(state);
  }

  get dom() {
    return this._dom;
  }

  get canvas() {
    return this._canvas;
  }
}

export default Editor;
