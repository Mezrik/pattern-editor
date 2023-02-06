import { createElement } from "../lib/dom";
import { EditorInputConfig } from "../types/editor";
import { ControlInterface } from "../controls/Control";
import { EditorState } from "../types/state";

class ToolSelect implements ControlInterface {
  private _dom: HTMLElement;
  private _select: HTMLSelectElement;

  constructor(state: EditorState, { tools, dispatch }: EditorInputConfig) {
    this._select = createElement(
      "select",
      {
        onchange: () => dispatch({ tool: this._select.value }),
      },
      ...Object.keys(tools).map((name) =>
        createElement(
          "option",
          {
            selected: name === state.tool,
          },
          name
        )
      )
    );

    this._dom = createElement("label", null, "🖌 Tool: ", this._select);
  }

  syncState(state: EditorState) {
    this._select.value = state.tool;
  }

  get dom() {
    return this._dom;
  }
}

export default ToolSelect;
