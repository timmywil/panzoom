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
   * Changing this should work with many things, but
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
  /** Values used to set the beginning transform */
  startX?: number /* Default: 0 */
  startY?: number /* Default: 0 */
  startScale?: number /* Default: 1 */
  /** Pass through any options like data */
  [key: string]: any
}

interface PanOptions {
  /**
   * Contain the panzoom element either
   * inside or outside the parent.
   * Inside: The panzoom element is smaller
   *   than its parent and cannot be panned
   *   to the outside.
   * Outside: The panzoom element is larger
   *   than its parent and cannot be panned
   *   to the inside. In other words, no
   *   empty space around the element will be shown.
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
  /** Disable panning while the scale is equal to the starting value */
  panOnlyWhenZoomed?: boolean
}

interface ZoomOptions {
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

type PanOnlyOptions = MiscOptions & PanOptions
export { PanOnlyOptions as PanOptions }
type ZoomOnlyOptions = MiscOptions & ZoomOptions
export { ZoomOnlyOptions as ZoomOptions }
export type PanzoomOptions = PanOptions & ZoomOptions & MiscOptions

interface CurrentValues {
  x: number
  y: number
  scale: number
}

export interface PanzoomObject {
  /** Get the current x/y translation */
  getPan: () => { x: number; y: number }
  /** Get the current scale */
  getScale: () => number
  /** Returns a copy of the current options object */
  getOptions: () => PanzoomOptions
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
  pan: (x: number | string, y: number | string, panOptions?: PanOptions) => CurrentValues
  /** Reset the pan and zoom to startX, startY, and startScale */
  reset: (options?: PanzoomOptions) => CurrentValues
  /** Change options for the Panzoom instance */
  setOptions: (options?: PanzoomOptions) => void
  /** A convenience method for setting prefixed styles on the Panzoom element */
  setStyle: typeof setStyle
  /**
   * Zoom the Panzoom element to the given scale
   *
   * ```js
   * panzoom.zoom(2.2)
   * panzoom.zoom(2.2, { animate: true })
   * ```
   */
  zoom: (scale: number, zoomOptions?: ZoomOptions) => CurrentValues
  /**
   * Zoom in using the predetermined increment set in options
   */
  zoomIn: (zoomOptions?: ZoomOptions) => CurrentValues
  /**
   * Zoom out using the predetermined increment set in options
   */
  zoomOut: (zoomOptions?: ZoomOptions) => CurrentValues
  /**
   * Zoom the Panzoom element to a focal point using
   * the given pointer/touch/mouse event or constructed point.
   * The clientX/clientY values should be calculated
   * the same way as a pointer event on the Panzoom element.
   */
  zoomToPoint: (
    scale: number,
    point: { clientX: number; clientY: number },
    zoomOptions?: ZoomOptions
  ) => CurrentValues
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
   * Other cases should handroll solutions using the `zoomToPoint`
   * method or the `zoom` method's focal option.
   *
   * ```js
   * // Bind to mousewheel
   * elem.parentElement.addEventListener('wheel', panzoom.zoomUsingWheel)
   * // Bind to shift+mousewheel
   * elem.parentElement.addEventListener('wheel', function(event) {
   *   if (!event.shiftKey) return
   *   panzoom.zoomUsingWheel(event)
   * })
   * ```
   */
  zoomWithWheel: (event: WheelEvent, zoomOptions?: ZoomOptions) => CurrentValues
}
