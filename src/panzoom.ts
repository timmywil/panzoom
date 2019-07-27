/**
 * Panzoom for panning and zooming elements using CSS transforms
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 */
import { getPadding, setStyle, setTransform } from './css'
import isAttached from './isAttached'
import isSVGElement from './isSVGElement'
import './polyfills'
import { PanOptions, PanzoomObject, PanzoomOptions, ZoomOptions } from './types'

const defaultOptions: PanzoomOptions = {
  animate: false,
  clickableClass: 'clickable',
  cursor: 'move',
  disablePan: false,
  disableZoom: false,
  disableXAxis: false,
  disableYAxis: false,
  duration: 200,
  easing: 'ease-in-out',
  maxScale: 4,
  minScale: 0.125,
  relative: false,
  setTransform,
  step: 0.1
}

function Panzoom(elem: HTMLElement | SVGElement, options?: PanzoomOptions): PanzoomObject {
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
  // SVG has pointer events, but TypeScript doesn't know that
  const htmlElem = elem as HTMLElement

  function setOptions(opts: PanzoomOptions = {}) {
    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        options[key] = opts[key]
      }
    }
  }

  // Set some default styles on the panzoom element
  elem.style.cursor = options.cursor
  // The default for HTML is '50% 50%'
  // The default for SVG is '0 0'
  // SVG can't be changed in IE
  setStyle(
    elem,
    'transformOrigin',
    typeof options.origin === 'string' ? options.origin : isSVG ? '0 0' : '50% 50%'
  )

  // Set overflow on the parent
  const parent = elem.parentElement
  parent.style.overflow = 'hidden'

  let x = 0
  let y = 0
  let scale = 1
  let isPanning = false

  function constrainXY(toX: number | string, toY: number | string, panOptions?: PanOptions) {
    const opts = { ...options, ...panOptions }
    const result = { x, y, opts }
    if (opts.disablePan) {
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
    return result
  }

  function constrainScale(toScale: number, zoomOptions?: ZoomOptions) {
    const opts = { ...options, ...zoomOptions }
    const result = { scale, opts }
    if (opts.disableZoom) {
      return result
    }
    result.scale = Math.min(Math.max(opts.minScale, toScale), opts.maxScale)
    return result
  }

  function pan(toX: number | string, toY: number | string, panOptions?: PanOptions) {
    const result = constrainXY(toX, toY, panOptions)
    const opts = result.opts

    x = result.x
    y = result.y

    opts.setTransform(elem, { x, y, scale }, opts)
  }

  function zoom(toScale: number, zoomOptions?: ZoomOptions) {
    const result = constrainScale(toScale, zoomOptions)
    const opts = result.opts
    if (opts.disableZoom) {
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
    opts.setTransform(elem, { x, y, scale }, opts)
  }

  function zoomInOut(isIn: boolean, zoomOptions?: ZoomOptions) {
    const opts = { ...options, animate: true, ...zoomOptions }
    zoom(scale * Math.exp((isIn ? 1 : -1) * opts.step), opts)
  }

  function zoomIn(zoomOptions?: ZoomOptions) {
    zoomInOut(true, zoomOptions)
  }

  function zoomOut(zoomOptions?: ZoomOptions) {
    zoomInOut(false, zoomOptions)
  }

  function zoomWithWheel(event: WheelEvent) {
    // Need to prevent the default here
    // or it conflicts with regular page scroll
    event.preventDefault()

    // Normalize to deltaX in case shift modifier is used on Mac
    const delta = event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY
    const wheel = delta < 0 ? 1 : -1
    const toScale = constrainScale(scale * Math.exp(wheel * options.step)).scale

    // Get the position of point over the element before the scale
    const rect = elem.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()
    const padding = getPadding(parent)
    let clientX = event.clientX - parentRect.left - padding.left
    let clientY = event.clientY - parentRect.top - padding.top

    // Adjust the clientX because HTML elements
    // have a transform-origin of 50% 50%
    if (!isSVG) {
      clientX -= rect.width / scale / 2
      clientY -= rect.height / scale / 2
    }

    // The new width after the scale
    const newWidth = (rect.width / scale) * toScale
    const newHeight = (rect.height / scale) * toScale

    // Convert the mouse point from it's position over the
    // panzoom element before the scale to the position
    // over element after the scale.
    // Parent padding affects the element position,
    // so pretend the area inside the padding is all
    // we care about.
    const focal = {
      x: (clientX / (parentRect.width - padding.left - padding.right)) * newWidth,
      y: (clientY / (parentRect.height - padding.top - padding.bottom)) * newHeight
    }

    zoom(toScale, { focal, animate: false })
  }

  function reset(resetOptions?: PanzoomOptions) {
    const panResult = constrainXY(0, 0, resetOptions)
    x = panResult.x
    y = panResult.y
    scale = constrainScale(1, resetOptions).scale
    options.setTransform(
      elem,
      { x, y, scale },
      {
        ...options,
        animate: true,
        ...resetOptions
      }
    )
  }

  function startMove(startEvent: PointerEvent) {
    const target = startEvent.target as Element
    if (isPanning || (target && target.classList.contains(options.clickableClass))) {
      return
    }
    isPanning = true
    startEvent.preventDefault()
    startEvent.stopPropagation()
    elem.setPointerCapture(startEvent.pointerId)
    const origX = x
    const origY = y
    const startPageX = startEvent.pageX
    const startPageY = startEvent.pageY

    function move(event: PointerEvent) {
      pan(origX + (event.pageX - startPageX) / scale, origY + (event.pageY - startPageY) / scale, {
        animate: false
      })
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
    getPan: () => ({ x, y }),
    getScale: () => scale,
    options,
    pan,
    reset,
    setOptions,
    setStyle,
    zoom,
    zoomIn,
    zoomOut,
    zoomWithWheel
  }
}

Panzoom.defaultOptions = defaultOptions

export default Panzoom
