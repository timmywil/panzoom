/**
 * Panzoom for panning and zooming elements using CSS
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 */

import { setTransform, setTransformOrigin } from './css'
import isAttached from './isAttached'
import isSVGElement from './isSVGElement'

export interface PanOptions {
  /** Disable panning functionality. Note: disablePan also disables focal point zooming */
  disablePan?: boolean
  /** When passing x and y values to .pan(), treat the values as relative to their current values */
  relative?: boolean
  /** The cursor style to set on the panzoom element */
  cursor?: string
}

export interface ZoomOptions {
  /** Disable zooming functionality */
  disableZoom?: boolean
  /** The minimum scale when zooming */
  minScale?: number
  /** The maximum scale when zooming */
  maxScale?: number
  /** The step affects the rate of zooming with a mouse wheel, pinching, or range element */
  step?: number
}

export type PanzoomOptions = PanOptions &
  ZoomOptions & {
    /** CSS Easing used for transitions */
    easing?: string
    /** Whether to animate transitions by default */
    animate?: boolean
    /** Pass through any options like data */
    [key: string]: any
  }

const defaultOptions: PanzoomOptions = {
  disablePan: false,
  disableZoom: false,
  easing: 'ease-in-out',
  animate: false,
  minScale: 0.125,
  maxScale: 4,
  step: 0.005,
  relative: false,
  cursor: 'move'
}

function Panzoom(elem: HTMLElement | SVGElement, options?: PanzoomOptions) {
  if (!elem) {
    throw new Error('Panzoom requires an element as an argument')
  }
  if (elem.nodeType !== 1) {
    throw new Error('Panzoom requires an element with a nodeType of 1')
  }
  if (!isAttached(elem)) {
    throw new Error('Panzoom should be called on elements that have been attached to the DOM')
  }

  options = {
    ...defaultOptions,
    ...options
  }

  const htmlElem = elem as HTMLElement

  function setOptions(opts: PanzoomOptions = {}) {
    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        options[key] = opts[key]
      }
    }
  }

  // This is SVG if the namespace is SVG
  // However, while <svg> elements are SVG, we want to treat those like other elements
  const isSVG = isSVGElement(elem)

  // Set some default styles on the panzoom element
  elem.style.cursor = options.cursor
  setTransformOrigin(elem, isSVG)

  // Set overflow on the parent
  const parent = elem.parentElement
  parent.style.overflow = 'hidden'

  let x = 0
  let y = 0
  let scale = 1
  let isPanning = false

  function pan(toX: number | string, toY: number | string, panOptions?: PanOptions) {
    setOptions(panOptions)
    if (options.disablePan) {
      return
    }

    toX = parseFloat(toX as string)
    toY = parseFloat(toY as string)

    if (options.relative) {
      x += toX
      y += toY
    } else {
      x = toX
      y = toY
    }

    setTransform(elem, { x, y, scale })
  }

  function zoom(toScale: number, zoomOptions?: ZoomOptions) {
    setOptions(zoomOptions)
    if (options.disableZoom) {
      return
    }

    // Restrict scale
    scale = Math.min(Math.max(options.minScale, toScale), options.maxScale)

    setTransform(elem, { x, y, scale })
  }

  function zoomUsingWheel(event: WheelEvent, zoomOptions?: PanzoomOptions) {
    // Need to prevent the default here
    // or it conflicts with regular page scroll
    event.preventDefault()
    setOptions(zoomOptions)
    scale += event.deltaY * -options.step
    zoom(scale)
  }

  function startMove(startEvent: PointerEvent) {
    if (isPanning) {
      return
    }
    isPanning = true
    startEvent.preventDefault()
    elem.setPointerCapture(startEvent.pointerId)
    const origX = x
    const origY = y
    const startPageX = startEvent.pageX
    const startPageY = startEvent.pageY

    function move(event: PointerEvent) {
      pan(origX + event.pageX - startPageX, origY + event.pageY - startPageY)
    }

    function cancel(event: PointerEvent) {
      isPanning = false
      htmlElem.removeEventListener('pointermove', move)
      htmlElem.removeEventListener('pointerup', cancel)
      htmlElem.removeEventListener('pointercancel', cancel)
      htmlElem.releasePointerCapture(event.pointerId)
    }

    htmlElem.addEventListener('pointermove', move, { passive: true })
    htmlElem.addEventListener('pointerup', cancel, { passive: true })
    htmlElem.addEventListener('pointercancel', cancel, { passive: true })
  }

  if (!options.disablePan) {
    htmlElem.addEventListener('pointerdown', startMove)
  }

  return {
    options,
    pan,
    zoom,
    zoomUsingWheel
  }
}

Panzoom.defaultOptions = defaultOptions

export default Panzoom
