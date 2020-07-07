/**
 * Determine if an element is attached to the DOM
 * Panzoom requires this so events work properly
 */
export default function isAttached(elem: HTMLElement | SVGElement | Document) {
  const doc = elem.ownerDocument
  const parent = elem.parentNode
  return (
    doc &&
    parent &&
    doc.nodeType === 9 &&
    parent.nodeType === 1 &&
    doc.documentElement.contains(parent)
  )
}
