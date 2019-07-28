import { setStyle, setTransform } from './css'

interface MiscOptions {
  /** Whether to animate transitions */
  animate?: boolean
  /**
   * Add this class to any element within the panzoom element
   * that you want to be clickable and not initiate the drag
   */
  clickableClass?: string
  /** Duration of the transition (ms) */
  duration?: number
  /** CSS Easing used for transitions */
  easing?: string
  /**
   * **Change this at your own risk.**
   * The `transform-origin` is the origin from which transforms are applied.
   * Default: `'50% 50%'` for HTML and `'0 0'` for SVG.
   * The defaults are set because changing the `transform-origin` on
   * SVG elements doesn't work in IE.
   *
   * Changing this should work with most things, but
   * it will break focal point zooming, which assumes the
   * defaults are set to do the more complicated calculations.
   *
   * And again, changing this for SVG in IE doesn't work at all.
   */
  origin?: string
  /**
   * Override the transform setter
   * This is exposed mostly so the user could
   * set other parts of a transform
   * aside from scale and translate.
   *
   * ```js
   * // This example always sets a rotation
   * // when setting the scale and translation
   * Panzoom(elem, {
   *   setTransform: (elem, { scale, x, y }) => {
   *     setStyle(elem, 'transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
   *   }
   * })
   * ```
   */
  setTransform?: typeof setTransform
  /** Pass through any options like data */
  [key: string]: any
}

export type PanOptions = MiscOptions & {
  /**
   * Contain the panzoom element either
   * inside or outside the parent.
   * Inside: The panzoom element is smaller
   *   than its parent and cannot be panned
   *   to the outside.
   * Outside: The panzoom element is larger
   *   than its parent and cannot be panned
   *   so that any empty space is shown.
   */
  contain?: 'inside' | 'outside'
  /** The cursor style to set on the panzoom element */
  cursor?: string
  /** Disable panning functionality. Note: disablePan also disables focal point zooming */
  disablePan?: boolean
  /** Pan only on the Y axis */
  disableXAxis?: boolean
  /** Pan only on the X axis */
  disableYAxis?: boolean
  /** When passing x and y values to .pan(), treat the values as relative to their current values */
  relative?: boolean
}

export type ZoomOptions = MiscOptions & {
  /** Disable zooming functionality */
  disableZoom?: boolean
  /**
   * Zoom to the given point on the panzoom element.
   * This point is expected to be relative to
   * the panzoom element's dimensions and is unrelated
   * to the parent dimensions.
   */
  focal?: { x: number; y: number }
  /** The minimum scale when zooming */
  minScale?: number
  /** The maximum scale when zooming */
  maxScale?: number
  /** The step affects the rate of zooming with a mouse wheel, pinching, or range element */
  step?: number
}

export type PanzoomOptions = PanOptions & ZoomOptions

export interface PanzoomObject {
  /** Get the current x/y translation */
  getPan: () => { x: number; y: number }
  /** Get the current scale */
  getScale: () => number
  /**
   * Pan the Panzoom element to the given x and y coordinates
   *
   * ```js
   * // Translates the element to 50px, 100px
   * panzoom.pan(50, 100)
   * // Pans the element right 10px and down 10px from its current position
   * panzoom.pan(10, 10, { relative: true })
   * ```
   */
  pan: (x: number | string, y: number | string, panOptions?: PanOptions) => void
  /**
   * Zoom in using the predetermined increment set in options
   */
  zoomIn: (zoomOptions?: ZoomOptions) => void
  /**
   * Zoom out using the predetermined increment set in options
   */
  zoomOut: (zoomOptions?: ZoomOptions) => void
  /**
   * Zoom the Panzoom element to the given scale
   *
   * ```js
   * panzoom.zoom(2.2)
   * panzoom.zoom(2.2, { animate: true })
   * ```
   */
  zoom: (scale: number, zoomOptions?: ZoomOptions) => void
  /**
   * Zoom the Panzoom element to a focal point using the given WheelEvent
   *
   * `disablePan` will prevent the focal point adjustment and will only zoom.
   *
   * `zoomWithWheel` normally uses `deltaY` to determine the scale,
   * but will fall back to `deltaX` in case the shift modifier is used with
   * the wheel event. On a mac, that usually translates to horizontal scrolling,
   * but this method assumes the desired behavior is zooming.
   *
   * This is a convenience function that may not handle all use cases.
   *
   * ```js
   * elem.parentElement.addEventListener('wheel', function(event) {
   *   if (!event.shiftKey) return
   *   panzoom.zoomUsingWheel(event)
   * })
   * ```
   */
  zoomWithWheel: (event: WheelEvent) => void
  /** The contructed options for this Panzoom instance */
  options: PanzoomOptions
  /** Change options for the Panzoom instance */
  setOptions: (options?: PanzoomOptions) => void
  /** Reset the pan and zoom to 0 */
  reset: (options?: PanzoomOptions) => void
  /** A convenience method for setting prefixed styles on the Panzoom element */
  setStyle: typeof setStyle
}
