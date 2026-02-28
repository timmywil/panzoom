import { setStyle, setTransform } from '../../src/css.js'

function assertStyle(assert: Assert, elem: HTMLElement | SVGElement, name: string, value: string) {
  const capName = name[0].toUpperCase() + name.slice(1)
  const style: any = elem.style
  if (style[name]) {
    assert.equal(style[name], value)
  } else if (style[`webkit${capName}`]) {
    assert.equal(style[`webkit${capName}`], value)
  } else if (style[`moz${capName}`]) {
    assert.equal(style[`moz${capName}`], value)
  } else if (style[`ms${capName}`]) {
    assert.equal(style[`ms${capName}`], value)
  }
}

QUnit.module('css', () => {
  QUnit.module('setStyle', () => {
    QUnit.test('sets a style on an HTMLElement', (assert) => {
      const elem = document.createElement('div')
      const border = '1px solid black'
      setStyle(elem, 'border', border)
      assert.equal(elem.style.border, border)
    })
    QUnit.test('sets a style on a SVGElement', (assert) => {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const strokeWidth = '1px'
      setStyle(elem, 'strokeWidth', strokeWidth)
      assert.equal(elem.style.strokeWidth, strokeWidth)
    })
  })

  QUnit.module('setTransform', () => {
    QUnit.test('sets the default transform-origin for HTML', (assert) => {
      const elem = document.createElement('div')
      setTransform(elem, { x: 1, y: 1, scale: 1 })
      assertStyle(assert, elem, 'transform', 'scale(1) translate(1px, 1px)')
    })
    QUnit.test('sets the default transform-origin for SVG', (assert) => {
      const elem = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      setTransform(elem, { x: 1, y: 1, scale: 1 })
      assertStyle(assert, elem, 'transform', 'scale(1) translate(1px, 1px)')
    })
  })
})
