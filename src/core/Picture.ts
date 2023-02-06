import { Color } from "./Color";
import { Pixel } from "../types/picture";

class Picture {
  private _width: number;
  private _height: number;
  private pixels: Color[];

  constructor(width: number, height: number, pixels: Color[]) {
    this._width = width;
    this._height = height;
    this.pixels = pixels;
  }

  public static fill(width: number, height: number, color: Color) {
    const pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  public draw(pixels: Pixel[]) {
    const pixelsCopy = [...this.pixels];
    pixels.forEach(
      ({ x, y, color }) => (pixelsCopy[x + y * this._width] = color)
    );
    return new Picture(this._width, this._height, pixelsCopy);
  }

  public getPixel(x: number, y: number): Readonly<Color> {
    return Object.freeze(this.pixels[x + y * this._width]);
  }

  public getWidth(): number {
    return this._width;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }
}

export default Picture;
