import { SCALE } from "../constants/drawing";

export function createElement<K extends keyof HTMLElementTagNameMap>(
  element: K,
  props?: Partial<HTMLElementTagNameMap[K]> | null,
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const dom = document.createElement(element);

  if (props) Object.assign(dom, props);

  children.forEach((child) =>
    dom.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    )
  );

  return dom;
}

export type Pointer = {
  x: number;
  y: number;
};

export function pointer(
  event: MouseEvent | Touch,
  element: HTMLElement,
  scale = SCALE
): Pointer {
  const rect = element.getBoundingClientRect();
  return {
    x: Math.floor((event.clientX - rect.left) / scale),
    y: Math.floor((event.clientY - rect.top) / scale),
  };
}
