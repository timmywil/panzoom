import Panzoom, { PanzoomObject } from '../../src/panzoom'
import React, { useEffect, useRef } from 'react'

import Code from '../Code'
import Demo from '../Demo'

const code = <Code>{`Panzoom(elem, { contain: 'inside' })`}</Code>

export default function ContainInside() {
  const elem = useRef<HTMLDivElement>(null)
  let panzoom: PanzoomObject
  useEffect(() => {
    panzoom = Panzoom(elem.current, { contain: 'inside' })
  }, [])
  return (
    <Demo title="Containment within the parent" code={code}>
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn()
          }}>
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut()
          }}>
          Zoom out
        </button>
        <button
          onClick={() => {
            panzoom.reset()
          }}>
          Reset
        </button>
      </div>
      <div className="panzoom-parent">
        <div
          className="panzoom"
          ref={elem}
          style={{ width: '400px', border: '2px dotted', margin: '0 auto' }}>
          <img style={{ width: '100%', height: '100%' }} src="awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
