import React, { useEffect, useRef } from 'react'
import Panzoom, { PanzoomObject } from '../../src/panzoom.js'

import Code from '../Code.js'
import Demo from '../Demo.js'

const code = <Code>{`Panzoom(elem, { contain: 'inside' })`}</Code>

export default function ContainInside() {
  const elem = useRef<HTMLDivElement>(null)
  let panzoom: PanzoomObject
  useEffect(() => {
    panzoom = Panzoom(elem.current, { contain: 'inside' })
  }, [])
  return (
    <Demo code={code} title="Containment within the parent">
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn()
          }}
        >
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut()
          }}
        >
          Zoom out
        </button>
        <button
          onClick={() => {
            panzoom.reset()
          }}
        >
          Reset
        </button>
      </div>
      <div className="panzoom-parent">
        <div
          ref={elem}
          className="panzoom"
          style={{ width: '400px', border: '2px dotted', margin: '0 auto' }}
        >
          <img src="awesome_tiger.svg" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </Demo>
  )
}
