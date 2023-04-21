import { strict as assert } from 'assert'
import { getParentElement } from '../../src/parent'

describe('getParentElement', () => {
  it('should return simple parent', () => {
    const div_1 = document.createElement('div')
    const div_2 = document.createElement('div')
    div_1.appendChild(div_2)
    assert.equal(getParentElement(div_2), div_1)
  })
  it('should return shadow root parent', () => {
    const div_1 = document.createElement('div')
    const div_1_shadow = div_1.attachShadow({ mode: 'open' })
    const div_2 = document.createElement('div')
    div_1_shadow.appendChild(div_2)
    assert.equal(getParentElement(div_2), div_1)
  })
})
