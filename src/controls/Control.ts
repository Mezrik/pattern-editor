import { EditorInputConfig } from "../types/editor";
import { EditorState } from "../types/state";

export interface ControlConstructor {
  new (state: EditorState, config: EditorInputConfig): ControlInterface;
}

export interface ControlInterface {
  syncState(state: EditorState): void;
  get dom(): HTMLElement;
}
