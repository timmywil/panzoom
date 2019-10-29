import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom'
import { PanzoomObject } from '../../src/types'
import Code from '../Code'
import Demo from '../Demo'

const code = (
  <Code>
    {`\
const panzoom = Panzoom(elem)
const parent = elem.parentElement
// No function bind needed
parent.addEventListener('wheel', panzoom.zoomWithWheel)

// This demo binds to shift + wheel
parent.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomWithWheel(event)
})`}
  </Code>
)

export default function Focal() {
  const elem = useRef<HTMLDivElement>(null)
  const panzoomRef = useRef<PanzoomObject>(null)
  let panzoom = panzoomRef.current
  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(elem.current)
    const parent = elem.current.parentElement
    parent.addEventListener('wheel', function(event) {
      if (!event.shiftKey) {
        return
      }
      panzoom.zoomWithWheel(event)
    })
  }, [])
  return (
    <Demo title="Panning and focal-point zooming (shift + mousewheel)" code={code}>
      <div className="buttons">
        <button onClick={() => panzoom.reset()}>Reset</button>
      </div>
      <div className="panzoom-parent" style={{ borderWidth: '10px' }}>
        <div
          className="panzoom"
          ref={elem}
          style={{ width: '400px', height: '400px', margin: '0 auto' }}>
          <img style={{ width: '100%', height: '100%' }} src="target.png" />
        </div>
      </div>
    </Demo>
  )
}
