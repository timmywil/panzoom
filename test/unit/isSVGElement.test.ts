import { strict as assert } from 'assert'
import isSVGElement from '../../src/isSVGElement'

describe('isSVGElement', () => {
  it('determines if an element is SVG', () => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    assert(isSVGElement(elem))
  })
  it('determines whether an HTML element is SVG', () => {
    const elem = document.createElement('div')
    assert(!isSVGElement(elem))
  })
  it('treats <svg> as HTML', () => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    assert(!isSVGElement(elem))
  })
})
