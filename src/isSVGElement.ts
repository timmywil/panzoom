/**
 * Determine if an element is SVG
 * The <svg> element itself should be treated like HTML
 */
const rsvg = /^http:[\w\.\/]+svg$/
export default function isSVGElement(elem: HTMLElement | SVGElement) {
  return rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== 'svg'
}
