import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom'
import Demo from './Demo'

const exampleCode = `const panzoom = Panzoom(elem)
const parent = elem.parentElement
// No function bind needed
parent.addEventListener('wheel', panzoom.zoomWithWheel)

// This demo binds to shift + wheel
parent.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomWithWheel(event)
})
`

export default function Focal() {
  const elem = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const panzoom = Panzoom(elem.current)
    const parent = elem.current.parentElement
    // panzoom.pan(-100, 0)
    parent.addEventListener('wheel', function(event) {
      if (!event.shiftKey) {
        return
      }
      panzoom.zoomWithWheel(event)
    })
    // parent.addEventListener('mousemove', (event) => {
    //   const parentRect = parent.getBoundingClientRect()
    //   const rect = elem.current.getBoundingClientRect()
    //   const positionInParent = event.clientX - parentRect.left
    //   const x = event.clientX - rect.left
    //   const y = event.clientY - rect.top
    //   // const y = event.clientY - parentRect.top - (parentRect.height - rect.height)
    //   console.log(
    //     `clientX: ${event.clientX - parentRect.left}, clientY: ${event.clientY - parentRect.top}`
    //   )
    //   console.log(`positionInParent: ${positionInParent}, x: ${x}, y: ${y}`)
    //   dot.current.style.left = `${x - 2}px`
    //   dot.current.style.top = `${y - 2}px`
    // })
  }, [])
  return (
    <Demo title="Panning and focal-point zooming (shift + mousewheel)" code={exampleCode}>
      <div className="panzoom" ref={elem}>
        <img width="400" height="400" src="/test/demo/target.png" />
        <div className="dot" ref={dot} />
      </div>
      <div className="dot" />
    </Demo>
  )
}
