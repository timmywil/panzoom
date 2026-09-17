import { getParentElement } from '../../src/parent.js'

QUnit.module('getParentElement', () => {
  QUnit.test('returns the parent element', (assert) => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)
    assert.equal(getParentElement(child), parent)
  })
  QUnit.test('returns the shadow root host when the parent is a shadow root', (assert) => {
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    const child = document.createElement('div')
    shadow.appendChild(child)
    assert.equal(getParentElement(child), host)
  })
  QUnit.test('returns nothing when the element has no parent', (assert) => {
    assert.equal(getParentElement(document.createElement('div')), undefined)
  })
})
