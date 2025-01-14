import isAttached from '../../src/isAttached.js'

QUnit.module('isAttached', () => {
  QUnit.test('determines if an attached element is attached', (assert) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    assert.ok(isAttached(div))
    document.body.removeChild(div)
  })
  QUnit.test('determines if an attached shadow dom element is attached', (assert) => {
    const div = document.createElement('div')
    const shadowChild = document.createElement('div')
    div.attachShadow({ mode: 'open' }).appendChild(shadowChild)
    document.body.appendChild(div)
    assert.ok(isAttached(shadowChild))
    document.body.removeChild(div)
  })
  QUnit.test('determines if a nested, attached shadow dom element is attached', (assert) => {
    const div = document.createElement('div')
    const shadowChild = document.createElement('div')
    const shadowGrandChild = document.createElement('div')
    shadowChild.attachShadow({ mode: 'open' }).appendChild(shadowGrandChild)
    div.attachShadow({ mode: 'open' }).appendChild(shadowChild)
    document.body.appendChild(div)
    assert.ok(isAttached(shadowGrandChild))
    document.body.removeChild(div)
  })
  QUnit.test('determines if a detached shadow dom element is attached', (assert) => {
    const div = document.createElement('div')
    const shadowChild = document.createElement('div')
    div.attachShadow({ mode: 'open' }).appendChild(shadowChild)
    assert.ok(!isAttached(shadowChild))
  })
  QUnit.test('determines if a detached element is attached', (assert) => {
    const div = document.createElement('div')
    assert.ok(!isAttached(div))
  })
  QUnit.test('does not consider a document attached', (assert) => {
    assert.ok(!isAttached(document))
  })
})
