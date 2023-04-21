export function getParentElement(
  element: Element | Document
): HTMLElement | SVGElement | undefined {
  if (element.parentElement) {
    return element.parentElement
  }
  const node = element.getRootNode()
  if (node instanceof ShadowRoot && node.host instanceof HTMLElement) {
    return node.host
  }
}
