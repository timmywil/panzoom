let events = {
  down: 'mousedown',
  move: 'mousemove',
  up: 'mouseup mouseleave'
}

if (typeof window !== 'undefined') {
  if (typeof window.PointerEvent === 'function') {
    events = {
      down: 'pointerdown',
      move: 'pointermove',
      up: 'pointerup pointerleave pointercancel'
    }
  } else if (typeof window.TouchEvent === 'function') {
    events = {
      down: 'touchstart',
      move: 'touchmove',
      up: 'touchend touchcancel'
    }
  }
}

export { events as eventNames }

type PointerEventName =
  | 'pointerdown'
  | 'pointermove'
  | 'pointerup'
  | 'pointerleave'
  | 'pointercancel'

export function onPointer(
  event: 'down' | 'move' | 'up',
  elem: HTMLElement | SVGElement | Document,
  handler: (event: PointerEvent) => void,
  eventOpts?: boolean | AddEventListenerOptions
) {
  events[event].split(' ').forEach((name) => {
    ;(elem as HTMLElement).addEventListener<PointerEventName>(
      name as PointerEventName,
      handler,
      eventOpts
    )
  })
}

export function destroyPointer(
  event: 'down' | 'move' | 'up',
  elem: HTMLElement | SVGElement | Document,
  handler: (event: PointerEvent) => void
) {
  events[event].split(' ').forEach((name) => {
    ;(elem as HTMLElement).removeEventListener<PointerEventName>(name as PointerEventName, handler)
  })
}
