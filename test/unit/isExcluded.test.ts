import { strict as assert } from 'assert'
import isExcluded from '../../src/isExcluded'

describe('isExcluded', () => {
  it('determines if an excluded element is excluded by class', () => {
    const div = document.createElement('div')
    div.className = 'excluded'
    document.body.appendChild(div)
    assert(isExcluded(div, { excludeClass: 'excluded', exclude: [] }))
    document.body.removeChild(div)
  })
  it('determines if an excluded element is excluded by inclusion in the exclude array', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    assert(isExcluded(div, { exclude: [div] }))
    document.body.removeChild(div)
  })
  it('checks ancestors against the exclude class', () => {
    const parent = document.createElement('div')
    parent.className = 'excluded'
    const span = document.createElement('span')
    parent.appendChild(span)
    document.body.appendChild(parent)
    assert(isExcluded(span, { excludeClass: 'excluded', exclude: [] }))
    document.body.removeChild(parent)
  })
  it('checks ancestors against the exclude array', () => {
    const parent = document.createElement('div')
    const div = document.createElement('div')
    parent.appendChild(div)
    document.body.appendChild(parent)
    assert(isExcluded(div, { exclude: [parent] }))
    document.body.removeChild(parent)
  })
})
