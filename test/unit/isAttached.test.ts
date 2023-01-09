import { strict as assert } from 'assert'
import isAttached from '../../src/isAttached'

describe('isAttached', () => {
  it('determines if an attached element is attached', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    assert(isAttached(div))
    document.body.removeChild(div)
  })
  it('determines if an attached shadow dom element is attached', () => {
    const div = document.createElement('div')
    const shadowChild = document.createElement('div')
    div.attachShadow({ mode: 'open' }).appendChild(shadowChild)
    document.body.appendChild(div)
    assert(isAttached(shadowChild))
    document.body.removeChild(div)
  })
  it('determines if a nested, attached shadow dom element is attached', () => {
    const div = document.createElement('div')
    const shadowChild = document.createElement('div')
    const shadowGrandChild = document.createElement('div')
    shadowChild.attachShadow({ mode: 'open' }).appendChild(shadowGrandChild)
    div.attachShadow({ mode: 'open' }).appendChild(shadowChild)
    document.body.appendChild(div)
    assert(isAttached(shadowGrandChild))
    document.body.removeChild(div)
  })
  it('determines if a detached shadow dom element is attached', () => {
    const div = document.createElement('div')
    const shadowChild = document.createElement('div')
    div.attachShadow({ mode: 'open' }).appendChild(shadowChild)
    assert(!isAttached(shadowChild))
  })
  it('determines if a detached element is attached', () => {
    const div = document.createElement('div')
    assert(!isAttached(div))
  })
  it('does not consider a document attached', () => {
    assert(!isAttached(document))
  })
})
