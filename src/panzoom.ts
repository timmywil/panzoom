/**
 * Panzoom for panning and zooming elements using CSS transforms
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 */

import { getPadding, setStyle, setTransform, setTransformOrigin } from './css'
import isAttached from './isAttached'
import { MiscOptions, PanOptions, PanzoomObject, PanzoomOptions, ZoomOptions } from './types'

const defaultOptions: PanzoomOptions = {
  animate: false,
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
  setTransformOrigin(elem)

  // Set overflow on the parent
  const parent = elem.parentElement
  parent.style.overflow = 'hidden'

  let x = 0
  let y = 0
  let scale = 1
  let isPanning = false

  function pan(toX: number | string, toY: number | string, panOptions?: PanOptions & MiscOptions) {
    const opts = { ...options, ...panOptions }
    if (opts.disablePan) {
      return
    }

    toX = parseFloat(toX as string)
    toY = parseFloat(toY as string)

    if (!opts.disableXAxis) {
      x = (opts.relative ? x : 0) + toX
    }

    if (!opts.disableYAxis) {
      y = (opts.relative ? y : 0) + toY
    }

    if (!opts.skipUpdate) {
      opts.setTransform(elem, { x, y, scale }, opts)
    }
  }

  function zoom(toScale: number, zoomOptions?: ZoomOptions & MiscOptions) {
    const opts = { ...options, ...zoomOptions }
    if (opts.disableZoom) {
      return
    }

    // Restrict scale
    scale = Math.min(Math.max(opts.minScale, toScale), opts.maxScale)

    if (!opts.skipUpdate) {
      opts.setTransform(elem, { x, y, scale }, opts)
    }
  }

  function zoomIn(zoomOptions?: ZoomOptions & MiscOptions) {
    const opts = { animate: true, ...zoomOptions }
    zoom(scale * Math.exp(options.step), opts)
  }

  function zoomOut(zoomOptions?: ZoomOptions & MiscOptions) {
    const opts = { animate: true, ...zoomOptions }
    zoom(scale * Math.exp(-options.step), opts)
  }

  function zoomWithWheel(event: WheelEvent) {
    // Need to prevent the default here
    // or it conflicts with regular page scroll
    event.preventDefault()

    // Normalize to deltaX in case shift modifier is used on Mac
    const delta = event.deltaY === 0 && event.deltaX ? event.deltaX : event.deltaY
    const wheel = delta < 0 ? 1 : -1
    const startScale = scale

    // scale becomes the new scale in the subsequent lines
    zoom(startScale * Math.exp(wheel * options.step), { skipUpdate: true })

    const parentRect = parent.getBoundingClientRect()
    const padding = getPadding(parent)
    const rect = elem.getBoundingClientRect()

    const newWidth = (rect.width / startScale) * scale
    const newHeight = (rect.height / startScale) * scale

    // Convert the mouse point from it's position over the
    // panzoom element before the scale to the position
    // over element after the scale
    // Parent padding affects the element position,
    // so pretend the area inside the padding is all
    // we care about
    const focalX =
      ((event.clientX - parentRect.left - padding.left) /
        (parentRect.width - padding.left - padding.right)) *
      newWidth
    const focalY =
      ((event.clientY - parentRect.top - padding.top) /
        (parentRect.height - padding.top - padding.bottom)) *
      newHeight

    // The difference between the point after the scale and the point before the scale
    // plus the current translation after the scale
    // neutralized to no scale (as the transform scale will apply to the translation)
    const toX = (focalX / scale - focalX / startScale + x * scale) / scale
    const toY = (focalY / scale - focalY / startScale + y * scale) / scale
    pan(toX, toY, { relative: false, skipUpdate: true })

    options.setTransform(elem, { x, y, scale }, { ...options, animate: false })
  }

  function reset(resetOptions?: PanzoomOptions) {
    const opts = { ...options, animate: true, ...resetOptions, skipUpdate: true }
    zoom(1, opts)
    pan(0, 0, opts)
    options.setTransform(elem, { x, y, scale }, opts)
  }

  function startMove(startEvent: PointerEvent) {
    if (isPanning) {
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
