import isSVGElement from '../../src/isSVGElement.js'

QUnit.module('isSVGElement', () => {
  QUnit.test('determines if an element is SVG', (assert) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    assert.ok(isSVGElement(elem))
  })
  QUnit.test('determines whether an HTML element is SVG', (assert) => {
    const elem = document.createElement('div')
    assert.ok(!isSVGElement(elem))
  })
  QUnit.test('treats <svg> as HTML', (assert) => {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    assert.ok(!isSVGElement(elem))
  })
})
