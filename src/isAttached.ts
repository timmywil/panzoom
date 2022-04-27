/**
 * Determine if an element is attached to the DOM
 * Panzoom requires this so events work properly
 */
export default function isAttached(node: Node) {
  let currentNode = node
  while (currentNode && currentNode.parentNode) {
    if (currentNode.parentNode === document) return true
    currentNode =
      currentNode.parentNode instanceof ShadowRoot
        ? currentNode.parentNode.host
        : currentNode.parentNode
  }
  return false
}
