import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom'
import Demo from './Demo'

const exampleCode = `const panzoom = Panzoom(elem)
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  event.preventDefault()
  panzoom.zoomUsingWheel(event)
})
`

export default function Focal() {
  const elem = useRef(null)
  useEffect(() => {
    const panzoom = Panzoom(elem.current)
    elem.current.parentElement.addEventListener('wheel', function(event: WheelEvent) {
      if (event.shiftKey) {
        event.preventDefault()
        panzoom.zoomUsingWheel(event)
      }
    })
  }, [])
  return (
    <Demo title="Panning and focal-point zooming with shift+mousewheel" code={exampleCode}>
      <div className="panzoom" ref={elem}>
        <img src="/test/demo/awesome_tiger.svg" />
      </div>
    </Demo>
  )
}
