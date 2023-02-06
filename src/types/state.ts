import Picture from "../core/Picture";

export type EditorState<Tools = any> = {
  tool: Tools;
  color: string;
  picture: Picture;
};
