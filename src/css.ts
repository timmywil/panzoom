/**
 * Proper prefixing for cross-browser compatibility
 */
const divStyle = document.createElement('div').style
const prefixes = ['webkit', 'moz', 'ms']
const prefixCache: { [key: string]: string } = {}
function getPrefixedName(name: string) {
  if (prefixCache[name]) {
    return prefixCache[name]
  }
  const capName = name[0].toUpperCase() + name.slice(1)
  let i = prefixes.length
  while (i--) {
    const prefixedName = `${prefixes[i]}${capName}`
    if (prefixedName in divStyle) {
      return (prefixCache[name] = prefixedName)
    }
  }
  return (prefixCache[name] = name)
}

/**
 * Set a style using the properly prefixed name
 */
export function setStyle(elem: HTMLElement | SVGElement, name: string, value: string) {
  elem.style[getPrefixedName(name) as any] = value
}

/**
 * Set the default transform-origin for HTML and SVG
 * SVG transform-origin cannot be changed to 50% 50% in IE9-11 or Edge 13-14+
 */
export function setTransformOrigin(elem: HTMLElement | SVGElement, isSVG: boolean) {
  setStyle(elem, 'transformOrigin', isSVG ? '0 0' : '50% 50%')
}

/**
 * Set the transform using the proper prefix
 */
export function setTransform(
  elem: HTMLElement | SVGElement,
  { x, y, scale }: { x: number; y: number; scale: number }
) {
  setStyle(elem, 'transform', `scale(${scale}) translate(${x}px, ${y}px)`)
}
