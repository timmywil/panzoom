/**
 * Panzoom for panning and zooming elements using CSS transforms
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 *
 */
import './polyfills'

import { PanOptions, PanzoomEvent, PanzoomObject, PanzoomOptions, ZoomOptions } from './types'
import { addPointer, getDistance, getMiddle, removePointer } from './pointers'
import { destroyPointer, onPointer } from './events'
import { getDimensions, setStyle, setTransform } from './css'

import isAttached from './isAttached'
import isSVGElement from './isSVGElement'
import shallowClone from './shallowClone'

const defaultOptions: PanzoomOptions = {
  animate: false,
  cursor: 'move',
  disablePan: false,
  disableZoom: false,
  disableXAxis: false,
  disableYAxis: false,
  duration: 200,
  easing: 'ease-in-out',
  exclude: [],
  excludeClass: 'panzoom-exclude',
  handleStartEvent: (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  },
  maxScale: 4,
  minScale: 0.125,
  panOnlyWhenZoomed: false,
  relative: false,
  setTransform,
  startX: 0,
  startY: 0,
  startScale: 1,
  step: 0.3
}

function Panzoom(
  elem: HTMLElement | SVGElement,
  options?: Omit<PanzoomOptions, 'force'>
): PanzoomObject {
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

  const isSVG = isSVGElement(elem)

  function setOptions(opts: Omit<PanzoomOptions, 'force'> = {}) {
    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        options[key] = opts[key]
      }
    }
    // Handle option side-effects
    if (opts.hasOwnProperty('cursor')) {
      elem.style.cursor = opts.cursor
    }
  }

  // Set overflow on the parent
  const parent = elem.parentElement
  parent.style.overflow = 'hidden'
  parent.style.userSelect = 'none'
  // This is important for mobile to
  // prevent scrolling while panning
  parent.style.touchAction = 'none'

  // Set some default styles on the panzoom element
  elem.style.cursor = options.cursor
  elem.style.userSelect = 'none'
  elem.style.touchAction = 'none'
  // The default for HTML is '50% 50%'
  // The default for SVG is '0 0'
  // SVG can't be changed in IE
  setStyle(
    elem,
    'transformOrigin',
    typeof options.origin === 'string' ? options.origin : isSVG ? '0 0' : '50% 50%'
  )

  let x = 0
  let y = 0
  let scale = 1
  let isPanning = false
  zoom(options.startScale, { animate: false })
  // Wait for scale to update
  // for accurate dimensions
  // to constrain initial values
  setTimeout(() => {
    pan(options.startX, options.startY, { animate: false })
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function trigger(eventName: PanzoomEvent, detail: any, opts: PanzoomOptions) {
    if (opts.silent) {
      return
    }
    const event = new CustomEvent(eventName, { detail })
    elem.dispatchEvent(event)
  }

  function setTransformWithEvent(eventName: PanzoomEvent, opts: PanzoomOptions) {
    const value = { x, y, scale }
    opts.setTransform(elem, value, opts)
    trigger(eventName, value, opts)
    trigger('panzoomchange', value, opts)
    return value
  }

  function constrainXY(toX: number | string, toY: number | string, panOptions?: PanOptions) {
    const opts = { ...options, ...panOptions }
    const result = { x, y, opts }
    if (!opts.force && (opts.disablePan || (opts.panOnlyWhenZoomed && scale === opts.startScale))) {
      return result
    }
    toX = parseFloat(toX as string)
    toY = parseFloat(toY as string)

    if (!opts.disableXAxis) {
      result.x = (opts.relative ? x : 0) + toX
    }

    if (!opts.disableYAxis) {
      result.y = (opts.relative ? y : 0) + toY
    }

    if (opts.contain === 'inside') {
      const dims = getDimensions(elem)
      result.x = Math.max(
        -dims.elem.margin.left - dims.parent.padding.left,
        Math.min(
          dims.parent.width -
            dims.elem.width / scale -
            dims.parent.padding.left -
            dims.elem.margin.left -
            dims.parent.border.left -
            dims.parent.border.right,
          result.x
        )
      )
      result.y = Math.max(
        -dims.elem.margin.top - dims.parent.padding.top,
        Math.min(
          dims.parent.height -
            dims.elem.height / scale -
            dims.parent.padding.top -
            dims.elem.margin.top -
            dims.parent.border.top -
            dims.parent.border.bottom,
          result.y
        )
      )
    } else if (opts.contain === 'outside') {
      const dims = getDimensions(elem)
      const diffHorizontal = (dims.elem.width - dims.elem.width / scale) / 2
      const diffVertical = (dims.elem.height - dims.elem.height / scale) / 2
      result.x = Math.max(
        Math.min(result.x, (diffHorizontal - dims.parent.padding.left) / scale),
        (-(dims.elem.width - dims.parent.width) -
          dims.parent.padding.left -
          dims.parent.border.left -
          dims.parent.border.right +
          diffHorizontal) /
          scale
      )
      result.y = Math.max(
        Math.min(result.y, (diffVertical - dims.parent.padding.top) / scale),
        (-(dims.elem.height - dims.parent.height) -
          dims.parent.padding.top -
          dims.parent.border.top -
          dims.parent.border.bottom +
          diffVertical) /
          scale
      )
    }
    return result
  }

  function constrainScale(toScale: number, zoomOptions?: ZoomOptions) {
    const opts = { ...options, ...zoomOptions }
    const result = { scale, opts }
    if (!opts.force && opts.disableZoom) {
      return result
    }
    result.scale = Math.min(Math.max(toScale, opts.minScale), opts.maxScale)
    return result
  }

  function pan(toX: number | string, toY: number | string, panOptions?: PanOptions) {
    const result = constrainXY(toX, toY, panOptions)
    const opts = result.opts

    x = result.x
    y = result.y

    return setTransformWithEvent('panzoompan', opts)
  }

  function zoom(toScale: number, zoomOptions?: ZoomOptions) {
    const result = constrainScale(toScale, zoomOptions)
    const opts = result.opts
    if (!opts.force && opts.disableZoom) {
      return
    }
    toScale = result.scale

    if (opts.focal) {
      // The difference between the point after the scale and the point before the scale
      // plus the current translation after the scale
      // neutralized to no scale (as the transform scale will apply to the translation)
      const focal = opts.focal
      const toX = (focal.x / toScale - focal.x / scale + x * toScale) / toScale
      const toY = (focal.y / toScale - focal.y / scale + y * toScale) / toScale
      const panResult = constrainXY(toX, toY, { relative: false })
      x = panResult.x
      y = panResult.y
    }

    scale = toScale
    return setTransformWithEvent('panzoomzoom', opts)
  }

  function zoomInOut(isIn: boolean, zoomOptions?: ZoomOptions) {
    const opts = { ...options, animate: true, ...zoomOptions }
    return zoom(scale * Math.exp((isIn ? 1 : -1) * opts.step), opts)
  }

  function zoomIn(zoomOptions?: ZoomOptions) {
    return zoomInOut(true, zoomOptions)
  }

  function zoomOut(zoomOptions?: ZoomOptions) {
    return zoomInOut(false, zoomOptions)
  }

  function zoomToPoint(
    toScale: number,
    point: { clientX: number; clientY: number },
    zoomOptions?: ZoomOptions
  ) {
    const dims = getDimensions(elem)

    // Instead of thinking of operating on the panzoom element,
    // think of operating on the area inside the panzoom
    // element's parent
    // Subtract padding and border
    const effectiveArea = {
      width:
        dims.parent.width -
        dims.parent.padding.left -
        dims.parent.padding.right -
        dims.parent.border.left -
        dims.parent.border.right,
      height:
        dims.parent.height -
        dims.parent.padding.top -
        dims.parent.padding.bottom -
        dims.parent.border.top -
        dims.parent.border.bottom
    }

    // Adjust the clientX/clientY to ignore the area
    // outside the effective area
    let clientX =
      point.clientX -
      dims.parent.left -
      dims.parent.padding.left -
      dims.parent.border.left -
      dims.elem.margin.left
    let clientY =
      point.clientY -
      dims.parent.top -
      dims.parent.padding.top -
      dims.parent.border.top -
      dims.elem.margin.top

    // Adjust the clientX/clientY for HTML elements,
    // because they have a transform-origin of 50% 50%
    if (!isSVG) {
      clientX -= dims.elem.width / scale / 2
      clientY -= dims.elem.height / scale / 2
    }

    // Convert the mouse point from it's position over the
    // effective area before the scale to the position
    // over the effective area after the scale.
    const focal = {
      x: (clientX / effectiveArea.width) * (effectiveArea.width * toScale),
      y: (clientY / effectiveArea.height) * (effectiveArea.height * toScale)
    }

    return zoom(toScale, { ...zoomOptions, focal, animate: false })
  }

  function zoomWithWheel(event: WheelEvent, zoomOptions?: ZoomOptions) {
    // Need to prevent the default here
    // or it conflicts with regular page scroll
    event.preventDefault()

    const opts = { ...options, ...zoomOptions }

    // Normalize to deltaX in case shift modifier is used on Mac
    const delta = event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY
    const wheel = delta < 0 ? 1 : -1
    const toScale = constrainScale(scale * Math.exp((wheel * opts.step) / 3), opts).scale

    return zoomToPoint(toScale, event, opts)
  }

  function reset(resetOptions?: PanzoomOptions) {
    const opts = { ...options, animate: true, ...resetOptions }
    const panResult = constrainXY(opts.startX, opts.startY, opts)
    x = panResult.x
    y = panResult.y
    scale = constrainScale(opts.startScale, opts).scale
    return setTransformWithEvent('panzoomreset', opts)
  }

  let origX: number
  let origY: number
  let startClientX: number
  let startClientY: number
  let startScale: number
  let startDistance: number
  const pointers: PointerEvent[] = []

  function handleDown(event: PointerEvent) {
    // Don't handle this event if the target is excluded
    if (
      event.target &&
      ((event.target as Element).classList.contains(options.excludeClass) ||
        options.exclude.indexOf(event.target as Element) > -1)
    ) {
      return
    }
    addPointer(pointers, event)
    isPanning = true
    options.handleStartEvent(event)
    origX = x
    origY = y

    trigger('panzoomstart', { x, y, scale }, options)

    // This works whether there are multiple
    // pointers or not
    const point = getMiddle(pointers)
    startClientX = point.clientX
    startClientY = point.clientY
    startScale = scale
    startDistance = getDistance(pointers)
  }

  function move(event: PointerEvent) {
    if (
      !isPanning ||
      origX === undefined ||
      origY === undefined ||
      startClientX === undefined ||
      startClientY === undefined
    ) {
      return
    }
    addPointer(pointers, event)
    const current = getMiddle(pointers)
    if (pointers.length > 1) {
      // Use the distance between the first 2 pointers
      // to determine the current scale
      const diff = getDistance(pointers) - startDistance
      const toScale = constrainScale((diff * options.step) / 80 + startScale).scale
      zoomToPoint(toScale, current)
    }

    pan(
      origX + (current.clientX - startClientX) / scale,
      origY + (current.clientY - startClientY) / scale,
      {
        animate: false
      }
    )
  }

  function handleUp(event: PointerEvent) {
    // Note: don't remove all pointers
    // Can restart without having to reinitiate all of them
    // Remove the pointer regardless of the isPanning state
    removePointer(pointers, event)
    if (!isPanning) {
      return
    }
    // Only call panzoomend once
    if (pointers.length === 1) {
      trigger('panzoomend', { x, y, scale }, options)
    }
    isPanning = false
    origX = origY = startClientX = startClientY = undefined
  }

  if (!options.disablePan) {
    onPointer('down', elem, handleDown)
    onPointer('move', document, move, { passive: true })
    onPointer('up', document, handleUp, { passive: true })
  }

  function destroy() {
    destroyPointer('down', elem, handleDown)
    destroyPointer('move', document, move)
    destroyPointer('up', document, handleUp)
  }

  return {
    destroy,
    getPan: () => ({ x, y }),
    getScale: () => scale,
    getOptions: () => shallowClone(options),
    pan,
    reset,
    setOptions,
    setStyle: (name: string, value: string) => setStyle(elem, name, value),
    zoom,
    zoomIn,
    zoomOut,
    zoomToPoint,
    zoomWithWheel
  }
}

Panzoom.defaultOptions = defaultOptions

export default Panzoom
