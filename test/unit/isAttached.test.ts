import { strict as assert } from 'assert'
import isAttached from '../../src/isAttached'

describe('isAttached', () => {
  it('determines if an attached element is attached', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    assert(isAttached(div))
    document.body.removeChild(div)
  })
  it('determines if a detached element is attached', () => {
    const div = document.createElement('div')
    assert(!isAttached(div))
  })
  it('does not consider a document attached', () => {
    assert(!isAttached(document))
  })
})
