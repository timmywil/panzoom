import React, { useEffect, useRef } from 'react'
import Panzoom from '../../../src/panzoom'
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
  useEffect(() => {
    const panzoom = Panzoom(elem.current)
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
      <div className="panzoom-parent">
        <div className="panzoom" ref={elem}>
          <img width="400" height="400" src="/test/demo/target.png" />
        </div>
      </div>
    </Demo>
  )
}
