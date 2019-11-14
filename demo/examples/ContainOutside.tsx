import React, { useEffect, useRef } from 'react'

import Code from '../Code'
import Demo from '../Demo'
import Panzoom from '../../src/panzoom'
import { PanzoomObject } from '../../src/types'

const code = <Code>{`Panzoom(elem, { contain: 'outside', startScale: 1.5 })`}</Code>

export default function ContainOutside() {
  const elem = useRef<HTMLDivElement>(null)
  let panzoom: PanzoomObject
  useEffect(() => {
    setTimeout(() => {
      panzoom = Panzoom(elem.current, { contain: 'outside', startScale: 1.5 })
    }, 1000)
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
      <div className="panzoom-parent" style={{ height: '900px' }}>
        <div
          className="panzoom"
          ref={elem}
          style={{
            background: '#000',
            width: '900px',
            height: '900px',
            border: '1px solid #ddee00'
          }}>
          <img style={{ width: '100%', height: '100%' }} src="awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
