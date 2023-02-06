import { ControlConstructor } from "../controls/Control";
import { Pointer } from "../lib/dom";
import { EditorState } from "./state";

export type EditorInputConfig<ToolNames extends string = any> = {
  tools: Record<ToolNames, ToolConstructor>;
  controls: ControlConstructor[];
  dispatch: (state: Partial<EditorState>) => void;
};

export type Tool = ({ x, y }: Pointer, state: EditorState) => void;

export type ToolConstructor = (
  pos: Pointer,
  state: EditorState,
  dispatch: EditorInputConfig["dispatch"]
) => Tool | void;
