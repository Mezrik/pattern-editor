import { createElement, Pointer, pointer } from "../lib/dom";
import { SCALE } from "../constants/drawing";
import Picture from "./Picture";

type MouseCallback<T = void> = (pointer: Pointer) => T;
type MouseMoveCallback = MouseCallback;
type MouseDownCallback = MouseCallback<MouseMoveCallback | undefined>;

class PictureCanvas {
  private _dom: HTMLCanvasElement;
  private scale: number;
  private picture?: Picture;

  constructor(
    picture: Picture,
    handleMouseDown: MouseDownCallback,
    scale = SCALE
  ) {
    this._dom = createElement("canvas", {
      onmousedown: (event) => this.mouse(event, handleMouseDown),
      ontouchstart: (event) => this.touch(event, handleMouseDown),
    });
    this.scale = scale;

    this.syncState(picture);
  }

  public drawPicture(picture: Picture) {
    const { _dom, scale } = this;
    _dom.width = picture.width * scale;
    _dom.height = picture.height * scale;
    let ctx = _dom.getContext("2d");

    if (!ctx) throw Error("2D canvas context is not available.");

    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        ctx.fillStyle = picture.getPixel(x, y).value;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  public syncState(picture: Picture) {
    if (this.picture === picture) return;
    this.picture = picture;
    this.drawPicture(this.picture);
  }

  private mouse(downEvent: MouseEvent, onDown: MouseDownCallback) {
    if (downEvent.button !== 0) return;
    let pos = pointer(downEvent, this.dom);
    const onMove = onDown(pos);

    if (!onMove) return;

    const move = (moveEvent: MouseEvent) => {
      if (moveEvent.buttons === 0) {
        this.dom.removeEventListener("mousemove", move);
      } else {
        let newPos = pointer(moveEvent, this.dom);
        if (newPos.x === pos.x && newPos.y === pos.y) return;
        pos = newPos;
        onMove(newPos);
      }
    };

    this._dom.addEventListener("mousemove", move);
  }

  private touch(startEvent: TouchEvent, onDown: MouseDownCallback) {
    let pos = pointer(startEvent.touches[0], this._dom);
    const onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;

    const move = (moveEvent: TouchEvent) => {
      let newPos = pointer(moveEvent.touches[0], this._dom);
      if (newPos.x === pos.x && newPos.y === pos.y) return;
      pos = newPos;
      onMove(newPos);
    };

    const end = () => {
      this._dom.removeEventListener("touchmove", move);
      this._dom.removeEventListener("touchend", end);
    };

    this._dom.addEventListener("touchmove", move);
    this._dom.addEventListener("touchend", end);
  }

  get dom() {
    return this._dom;
  }
}

export default PictureCanvas;
