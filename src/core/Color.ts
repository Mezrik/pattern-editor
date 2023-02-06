export interface Color {
  value: string;
}

class ConcreteColor implements Color {
  private _value: string;
  constructor(value: string) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}

export default ConcreteColor;
