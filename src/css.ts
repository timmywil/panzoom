import { PanzoomOptions } from './types'

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
  if (name in divStyle) {
    return (prefixCache[name] = name)
  }
  const capName = name[0].toUpperCase() + name.slice(1)
  let i = prefixes.length
  while (i--) {
    const prefixedName = `${prefixes[i]}${capName}`
    if (prefixedName in divStyle) {
      return (prefixCache[name] = prefixedName)
    }
  }
}

/**
 * Gets a style value expected to be a number
 */
export function getCSSNum(style: CSSStyleDeclaration, name: string) {
  return parseFloat(style[getPrefixedName(name) as any]) || 0
}

export function getPadding(elem: HTMLElement | SVGElement) {
  const style = window.getComputedStyle(elem)
  return {
    left: getCSSNum(style, 'paddingLeft'),
    right: getCSSNum(style, 'paddingRight'),
    top: getCSSNum(style, 'paddingTop'),
    bottom: getCSSNum(style, 'paddingBottom')
  }
}

/**
 * Set a style using the properly prefixed name
 */
export function setStyle(elem: HTMLElement | SVGElement, name: string, value: string) {
  elem.style[getPrefixedName(name) as any] = value
}

/**
 * Sets the default transform-origin for both HTML and SVG to 0 0
 * SVG transform-origin cannot be changed to 50% 50% in IE9-11 or Edge 13-14+,
 * so we default to 0 0 for everything.
 */
export function setTransformOrigin(elem: HTMLElement | SVGElement) {
  setStyle(elem, 'transformOrigin', '0 0')
}

/**
 * Constructs the transition from panzoom options
 * and takes care of prefixing the transition and transform
 */
export function setTransition(elem: HTMLElement | SVGElement, options: PanzoomOptions) {
  const transition = getPrefixedName('transition')
  const transform = getPrefixedName('transform')
  setStyle(elem, transition, `${transform} ${options.duration}ms ${options.easing}`)
}

/**
 * Set the transform using the proper prefix
 */
export function setTransform(
  elem: HTMLElement | SVGElement,
  { x, y, scale }: { x: number; y: number; scale: number },
  options: PanzoomOptions = {}
) {
  if (typeof options.animate === 'boolean') {
    if (options.animate) {
      setTransition(elem, options)
    } else {
      setStyle(elem, 'transition', 'none')
    }
  }
  setStyle(elem, 'transform', `scale(${scale}) translate(${x}px, ${y}px)`)
}
