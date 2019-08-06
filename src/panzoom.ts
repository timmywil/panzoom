/**
 * Panzoom for panning and zooming elements using CSS transforms
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 */
import { getBorder, getMargin, getPadding, setStyle, setTransform } from './css'
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
  startX: 0,
  startY: 0,
  startScale: 1,
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

  // Set overflow on the parent
  const parent = elem.parentElement
  parent.style.overflow = 'hidden'

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

  /**
   * Dimensions used in containment and focal point zooming
   */
  function getDimensions() {
    const style = window.getComputedStyle(elem)
    const parentStyle = window.getComputedStyle(parent)
    const rectElem = elem.getBoundingClientRect()
    const rectParent = parent.getBoundingClientRect()

    return {
      elem: {
        style,
        width: rectElem.width,
        height: rectElem.height,
        top: rectElem.top,
        bottom: rectElem.bottom,
        left: rectElem.left,
        right: rectElem.right,
        margin: getMargin(elem, style),
        border: getBorder(elem, style)
      },
      parent: {
        style: parentStyle,
        width: rectParent.width,
        height: rectParent.height,
        top: rectParent.top,
        bottom: rectParent.bottom,
        left: rectParent.left,
        right: rectParent.right,
        padding: getPadding(parent, parentStyle),
        border: getBorder(parent, parentStyle)
      }
    }
  }

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

    if (opts.contain === 'inside') {
      const dims = getDimensions()
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
      const dims = getDimensions()
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

    const dims = getDimensions()

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
      event.clientX -
      dims.parent.left -
      dims.parent.padding.left -
      dims.parent.border.left -
      dims.elem.margin.left
    let clientY =
      event.clientY -
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

    // The new width after the scale
    const newWidth = effectiveArea.width * toScale
    const newHeight = effectiveArea.height * toScale

    // Convert the mouse point from it's position over the
    // effective area before the scale to the position
    // over element after the scale.
    const focal = {
      x: (clientX / effectiveArea.width) * newWidth,
      y: (clientY / effectiveArea.height) * newHeight
    }

    zoom(toScale, { focal, animate: false })
  }

  function reset(resetOptions?: PanzoomOptions) {
    const opts = { ...options, animate: true, ...resetOptions }
    const panResult = constrainXY(opts.startX, opts.startY, opts)
    x = panResult.x
    y = panResult.y
    scale = constrainScale(opts.startScale, opts).scale
    options.setTransform(elem, { x, y, scale }, opts)
  }

  function startMove(startEvent: PointerEvent) {
    const target = startEvent.target as Element
    if (isPanning || (target && target.classList.contains(options.clickableClass))) {
      return
    }
    isPanning = true
    startEvent.preventDefault()
    startEvent.stopPropagation()
    const pointerId = startEvent.pointerId
    elem.setPointerCapture(pointerId)
    const origX = x
    const origY = y
    const startPageX = startEvent.pageX
    const startPageY = startEvent.pageY

    function move(event: PointerEvent) {
      pan(origX + (event.pageX - startPageX) / scale, origY + (event.pageY - startPageY) / scale, {
        animate: false
      })
    }

    function cancel() {
      isPanning = false
      htmlElem.removeEventListener('pointermove', move)
      htmlElem.removeEventListener('pointerup', cancel)
      htmlElem.removeEventListener('pointercancel', cancel)
      document.removeEventListener('mouseup', cancel)
      htmlElem.releasePointerCapture(pointerId)
    }

    htmlElem.addEventListener('pointermove', move, { passive: true })
    htmlElem.addEventListener('pointerup', cancel, { passive: true })
    htmlElem.addEventListener('pointercancel', cancel, { passive: true })
    document.addEventListener('mouseup', cancel, { passive: true })
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
