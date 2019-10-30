import { strict as assert, throws } from 'assert'
import Panzoom from '../../src/panzoom'

function assertStyleMatches(elem: HTMLElement | SVGElement, name: string, value: string) {
  const capName = name[0].toUpperCase() + name.slice(1)
  const style: any = elem.style
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

describe('Panzoom', () => {
  it('exists', () => {
    assert(Panzoom, 'Panzoom exists')
  })
  it('checks the element exists before creating the instance', () => {
    throws(() => {
      Panzoom(undefined as any) // tslint:disable-line
    })
  })
  it('checks the element has the right nodeType', () => {
    throws(() => {
      Panzoom(document as any)
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
  it('removes the events when using the destroy method', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const events: any = {}
    const addEvent = Element.prototype.addEventListener
    const removeEvent = Element.prototype.removeEventListener
    Element.prototype.addEventListener = function(event: any, fn: any, options: any) {
      events[event] = fn
      addEvent.call(this, event, fn, options)
    }
    Element.prototype.removeEventListener = function(event: any, fn: any, options: any) {
      delete events[event]
      removeEvent.call(this, event, fn, options)
    }
    const panzoom = Panzoom(div)
    assert(Object.keys(events).length > 0)
    panzoom.destroy()
    assert(Object.keys(events).length === 0)
    Element.prototype.addEventListener = addEvent
    Element.prototype.removeEventListener = removeEvent
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
    assert.equal(div.style.cursor, 'default', 'Cursor style changes when setting the cursor option')
    document.body.removeChild(div)
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
      assert.equal(pan.x, 0)
      assert.equal(pan.y, 0)
      panzoom.pan(1, 1, { force: true })
      pan = panzoom.getPan()
      assert.equal(pan.x, 1)
      assert.equal(pan.y, 1)
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
      assert.equal(scale, 1)
      panzoom.zoom(2, { force: true })
      scale = panzoom.getScale()
      assert.equal(scale, 2)
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
      assert.equal(pan.x, 0)
      assert.equal(pan.y, 0)
      panzoom.pan(1, 1, { force: true })
      pan = panzoom.getPan()
      assert.equal(pan.x, 1)
      assert.equal(pan.y, 1)
    })
  })
})
