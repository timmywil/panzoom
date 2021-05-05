import { strict as assert, throws } from 'assert'

import Panzoom from '../../src/panzoom'
import { PanzoomEventDetail } from '../../src/types'

function assertStyleMatches(elem: HTMLElement | SVGElement, name: string, value: string) {
  const capName = name[0].toUpperCase() + name.slice(1)
  const style: any = elem.style // eslint-disable-line
  if (style[name]) {
    assert.ok(style[name].includes(value))
  } else if (style[`webkit${capName}`]) {
    assert.ok(style[`webkit${capName}`].includes(value))
  } else if (style[`moz${capName}`]) {
    assert.ok(style[`moz${capName}`].includes(value))
  } else if (style[`ms${capName}`]) {
    assert.ok(style[`ms${capName}`].includes(value))
  }
}

function skipFrame() {
  return new Promise((resolve) => {
    setTimeout(resolve, 16)
  })
}

describe('Panzoom', () => {
  it('exists', () => {
    assert(Panzoom, 'Panzoom exists')
  })
  it('checks the element exists before creating the instance', () => {
    throws(() => {
      Panzoom(undefined as any) // eslint-disable-line
    })
  })
  it('checks the element has the right nodeType', () => {
    throws(() => {
      Panzoom(document as any) // eslint-disable-line
    })
  })
  it('checks the element is attached', () => {
    throws(() => {
      const div = document.createElement('div')
      Panzoom(div)
    })
  })
  it('returns an object with expected methods', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const panzoom = Panzoom(div)
    assert(panzoom.pan)
    assert(panzoom.zoom)
    assert(panzoom.zoomWithWheel)
    assert(panzoom.getOptions())
    assertStyleMatches(div, 'transformOrigin', '50% 50%')
    document.body.removeChild(div)
  })
  it('has expected properties on event detail for panzoom events', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const events: any = {} // eslint-disable-line
    const addEvent = Element.prototype.addEventListener
    const removeEvent = Element.prototype.removeEventListener
    // eslint-disable-next-line
    Element.prototype.addEventListener = function (event: any, fn: any, options: any) {
      events[event] = fn
      addEvent.call(this, event, fn, options)
    }
    // eslint-disable-next-line
    Element.prototype.removeEventListener = function (event: any, fn: any, options: any) {
      delete events[event]
      removeEvent.call(this, event, fn, options)
    }
    Panzoom(div)
    assert(Object.keys(events).length > 0)
    function checkEvent(event: CustomEvent<PanzoomEventDetail>) {
      console.log(`${event.type} called`)
      assert.ok(event.detail, 'Event detail exists')
      assert.ok(event.detail.hasOwnProperty('x'), 'Event detail has x value')
      assert.ok(event.detail.hasOwnProperty('y'), 'Event detail has y value')
      assert.ok(event.detail.hasOwnProperty('scale'), 'Event detail has scale value')
      assert.ok(event.detail.hasOwnProperty('isSVG'), 'Event detail has isSVG value')
      assert.ok(
        event.detail.hasOwnProperty('originalEvent'),
        'Event detail has originalEvent value'
      )
    }
    ;(div as any).addEventListener('panzoomstart', checkEvent)
    ;(div as any).addEventListener('panzoomchange', checkEvent)
    ;(div as any).addEventListener('panzoompan', checkEvent)
    ;(div as any).addEventListener('panzoomzoom', checkEvent)
    ;(div as any).addEventListener('panzoomend', checkEvent)
    div.dispatchEvent(new PointerEvent('pointerdown'))
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 10, clientY: 10 }))
    document.dispatchEvent(new PointerEvent('pointerup'))
    Element.prototype.addEventListener = addEvent
    Element.prototype.removeEventListener = removeEvent
    document.body.removeChild(div)
  })
  it('removes the events when using the destroy method', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const events: any = {} // eslint-disable-line
    const addEvent = Element.prototype.addEventListener
    const removeEvent = Element.prototype.removeEventListener
    // eslint-disable-next-line
    Element.prototype.addEventListener = function (event: any, fn: any, options: any) {
      events[event] = fn
      addEvent.call(this, event, fn, options)
    }
    // eslint-disable-next-line
    Element.prototype.removeEventListener = function (event: any, fn: any, options: any) {
      delete events[event]
      removeEvent.call(this, event, fn, options)
    }
    const panzoom = Panzoom(div)
    assert(Object.keys(events).length > 0)
    const endListener = () => {
      console.log('panzoomend called')
      assert.ok('panzoomend called on pan')
    }
    ;(div as any).addEventListener('panzoomend', endListener)
    div.dispatchEvent(new PointerEvent('pointerdown'))
    document.dispatchEvent(new PointerEvent('pointerup'))
    panzoom.destroy()
    ;(div as any).removeEventListener('panzoomend', endListener)
    assert(Object.keys(events).length === 0)
    Element.prototype.addEventListener = addEvent
    Element.prototype.removeEventListener = removeEvent
    document.body.removeChild(div)
  })
  it('resets all styles with the resetStyle method', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const panzoom = Panzoom(div)
    assert.strictEqual(
      document.body.style.overflow,
      'hidden',
      'overflow: hidden is set on the parent'
    )
    assert.strictEqual(div.style.cursor, 'move', 'cursor: move is set on the element')
    panzoom.resetStyle()
    assert.strictEqual(document.body.style.overflow, '', 'overflow style is reset on the parent')
    assert.strictEqual(div.style.cursor, '', 'cursor style is reset on the element')
    document.body.removeChild(div)
  })
  it('sets the expected transform-origin on SVG', () => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    document.body.appendChild(elem)
    Panzoom(elem)
    assertStyleMatches(elem, 'transformOrigin', '0px 0px')
    document.body.removeChild(elem)
  })
  it('changes the cursor with the cursor option', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const panzoom = Panzoom(div)
    panzoom.setOptions({ cursor: 'default' })
    assert.strictEqual(
      div.style.cursor,
      'default',
      'Cursor style changes when setting the cursor option'
    )
    document.body.removeChild(div)
  })
  it("changes the parent's overflow with the overflow option", () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const panzoom = Panzoom(div)
    panzoom.setOptions({ overflow: 'visible' })
    assert.strictEqual(
      div.parentElement.style.overflow,
      'visible',
      'Overflow style changes when setting the overflow option'
    )
    document.body.removeChild(div)
  })
  it("changes the parent's and elemenet's touchAction style with the touchAction option", () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const panzoom = Panzoom(div)
    panzoom.setOptions({ touchAction: 'auto' })
    assert.strictEqual(
      div.style.touchAction,
      'auto',
      'touch-action style changes when setting the touchAction option'
    )
    assert.strictEqual(
      div.parentElement.style.touchAction,
      'auto',
      'touch-action style changes when setting the touchAction option'
    )
    document.body.removeChild(div)
  })
  it('changes the cursor with the canvas option', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const panzoom = Panzoom(div)
    assert.strictEqual(div.style.cursor, 'move', 'cursor: move is set on the element')
    panzoom.setOptions({ canvas: true })
    assert.strictEqual(div.style.cursor, '', 'cursor style is reset on the element')
    assert.strictEqual(
      div.parentElement.style.cursor,
      'move',
      'Cursor style changes when setting the canvas option'
    )
    document.body.removeChild(div)
  })
  describe('contain option', () => {
    it(': outside sets the pan on the zoom to maintain containment', async () => {
      const parent = document.createElement('div')
      const div = document.createElement('div')
      parent.style.width = div.style.width = '100px'
      parent.style.height = div.style.height = '100px'
      parent.appendChild(div)
      document.body.appendChild(parent)
      const panzoom = Panzoom(div, { contain: 'outside' })
      await skipFrame()
      panzoom.zoom(2)
      // Zoom needs to paint first
      await skipFrame()
      panzoom.pan(100, 100)
      await skipFrame()
      // Should constrain to 25, 25
      let pan = panzoom.getPan()
      assert.strictEqual(pan.x, 25)
      assert.strictEqual(pan.y, 25)
      panzoom.zoom(1)
      await skipFrame()
      // Should constrain back to 0 0
      pan = panzoom.getPan()
      assert.strictEqual(pan.x, 0)
      assert.strictEqual(pan.y, 0)
      document.body.removeChild(parent)
    })
  })
  describe('reset', () => {
    it('ignores disablePan, disableZoom, and panOnlyWhenZoomed', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const panzoom = Panzoom(div)
      panzoom.pan(1, 1)
      panzoom.zoom(2)
      let pan = panzoom.getPan()
      assert.strictEqual(pan.x, 1)
      assert.strictEqual(pan.y, 1)
      let scale = panzoom.getScale()
      assert.strictEqual(scale, 2)
      panzoom.setOptions({
        disablePan: true,
        disableZoom: true,
        panOnlyWhenZoomed: true
      })
      panzoom.reset()
      pan = panzoom.getPan()
      assert.strictEqual(pan.x, 0)
      assert.strictEqual(pan.y, 0)
      scale = panzoom.getScale()
      assert.strictEqual(scale, 1)
    })
  })
  describe('force option', () => {
    it('ignores disablePan', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const panzoom = Panzoom(div)
      panzoom.setOptions({
        disablePan: true
      })
      panzoom.pan(1, 1)
      let pan = panzoom.getPan()
      assert.strictEqual(pan.x, 0)
      assert.strictEqual(pan.y, 0)
      panzoom.pan(1, 1, { force: true })
      pan = panzoom.getPan()
      assert.strictEqual(pan.x, 1)
      assert.strictEqual(pan.y, 1)
      document.body.removeChild(div)
    })
    it('ignores disableZoom', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const panzoom = Panzoom(div)
      panzoom.setOptions({
        disableZoom: true
      })
      panzoom.zoom(2)
      let scale = panzoom.getScale()
      assert.strictEqual(scale, 1)
      panzoom.zoom(2, { force: true })
      scale = panzoom.getScale()
      assert.strictEqual(scale, 2)
      document.body.removeChild(div)
    })
    it('ignores panOnlyWhenZoomed', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const panzoom = Panzoom(div)
      panzoom.setOptions({
        panOnlyWhenZoomed: true
      })
      panzoom.pan(1, 1)
      let pan = panzoom.getPan()
      assert.strictEqual(pan.x, 0)
      assert.strictEqual(pan.y, 0)
      panzoom.pan(1, 1, { force: true })
      pan = panzoom.getPan()
      assert.strictEqual(pan.x, 1)
      assert.strictEqual(pan.y, 1)
      document.body.removeChild(div)
    })
  })
  it('calls the handleStartEvent option', () => {
    return new Promise((resolve) => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      Panzoom(div, {
        handleStartEvent: (event: Event) => {
          event.preventDefault()
          assert.ok('handleStartEvent called')
          resolve(null)
        }
      })
      div.dispatchEvent(new PointerEvent('pointerdown'))
      document.body.removeChild(div)
    })
  })
  describe('noBind option', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const events: any = {} // eslint-disable-line
    const addEvent = Element.prototype.addEventListener
    const removeEvent = Element.prototype.removeEventListener
    // eslint-disable-next-line
    Element.prototype.addEventListener = function (event: any, fn: any, options: any) {
      events[event] = fn
      addEvent.call(this, event, fn, options)
    }
    // eslint-disable-next-line
    Element.prototype.removeEventListener = function (event: any, fn: any, options: any) {
      delete events[event]
      removeEvent.call(this, event, fn, options)
    }
    const panzoom = Panzoom(div, { noBind: true })
    assert(Object.keys(events).length === 0)
    panzoom.bind()
    assert(Object.keys(events).length > 0)
    Element.prototype.addEventListener = addEvent
    Element.prototype.removeEventListener = removeEvent
    document.body.removeChild(div)
  })
})
