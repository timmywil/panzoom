import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom.js'
import { PanzoomObject } from '../../src/types.js'
import Code from '../Code.js'
import Demo from '../Demo.js'

const code = (
  <Code>
    {`\
// This example also showcases the canvas option
// Pointer events anywhere in the parent move
// the target.
const panzoom = Panzoom(elem, { canvas: true })
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
    // Ensure animate doesn't interfere with zoomWithWheel
    panzoom = panzoomRef.current = Panzoom(elem.current, { animate: true, canvas: true })
    const parent = elem.current.parentElement
    parent.addEventListener('wheel', function (event) {
      if (!event.shiftKey) {
        return
      }
      panzoom.zoomWithWheel(event)
    })
  }, [])
  return (
    <Demo code={code} title="Panning and focal-point zooming (shift + mousewheel)">
      <div className="buttons">
        <button onClick={() => panzoom.reset()}>Reset</button>
      </div>
      <div className="panzoom-parent" style={{ borderWidth: '10px' }}>
        <div
          ref={elem}
          className="panzoom"
          style={{ width: '400px', height: '400px', margin: '0 auto' }}
        >
          <img src="target.png" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </Demo>
  )
}
