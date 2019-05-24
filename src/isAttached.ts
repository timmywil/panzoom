/**
 * Determine if an element is attached to the DOM
 * Panzoom requires this so events work properly
 */
export default function isAttached(elem: HTMLElement | SVGElement) {
  const doc = elem.ownerDocument
  const parent = elem.parentElement
  return doc && parent && doc.nodeType === 9 && parent.nodeType === 1 && doc.contains(parent)
}
