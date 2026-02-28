import isExcluded from '../../src/isExcluded.js'

QUnit.module('isExcluded', () => {
  QUnit.test('determines if an excluded element is excluded by class', (assert) => {
    const div = document.createElement('div')
    div.className = 'excluded'
    document.body.appendChild(div)
    assert.ok(isExcluded(div, { excludeClass: 'excluded', exclude: [] }))
    document.body.removeChild(div)
  })
  QUnit.test(
    'determines if an excluded element is excluded by inclusion in the exclude array',
    (assert) => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      assert.ok(isExcluded(div, { exclude: [div] }))
      document.body.removeChild(div)
    }
  )
  QUnit.test('checks ancestors against the exclude class', (assert) => {
    const parent = document.createElement('div')
    parent.className = 'excluded'
    const span = document.createElement('span')
    parent.appendChild(span)
    document.body.appendChild(parent)
    assert.ok(isExcluded(span, { excludeClass: 'excluded', exclude: [] }))
    document.body.removeChild(parent)
  })
  QUnit.test('checks ancestors against the exclude array', (assert) => {
    const parent = document.createElement('div')
    const div = document.createElement('div')
    parent.appendChild(div)
    document.body.appendChild(parent)
    assert.ok(isExcluded(div, { exclude: [parent] }))
    document.body.removeChild(parent)
  })
})
