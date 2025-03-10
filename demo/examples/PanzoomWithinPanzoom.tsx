import React, { useEffect, useRef } from 'react'

import Panzoom, { PanzoomObject } from '../../src/panzoom.js'
import Code from '../Code.js'
import Demo from '../Demo.js'

const code = (
  <Code>{`\
const panzoom = Panzoom(elem)
const panzoom2 = Panzoom(child, {
  setTransform: (elem, { x, y, scale }) => {
    // Adjust the panning according to the parent's scale
    const parentScale = panzoom.getScale()
    panzoom2.setStyle(
      'transform',
      \`scale(\${scale}) translate(\${x / parentScale}px, \${y / parentScale}px)\`
    )
  }
})
function adjustScale(zoomIn: boolean) {
  const oldScale = panzoom.getScale()
  if (zoomIn) {
    panzoom.zoomIn()
  } else {
    panzoom.zoomOut()
  }
  const newScale = panzoom.getScale()
  const pan = panzoom2.getPan()
  // Adjust child starting X/Y according the new scale for panning
  panzoom2.pan((pan.x / oldScale) * newScale, (pan.y / oldScale) * newScale, {
    animate: true
  })
}
zoomInButton.addEventListener('click', () => adjustScale(true))
zoomOutButton.addEventListener('click', () => adjustScale(false))
`}</Code>
)

export default function PanzoomWithinPanzoom() {
  const elem = useRef<HTMLDivElement>(null)
  const elemTwo = useRef<HTMLDivElement>(null)
  const panzoomRef = useRef<PanzoomObject>(null)
  const panzoom2Ref = useRef<PanzoomObject>(null)
  let panzoom = panzoomRef.current
  let panzoom2 = panzoom2Ref.current
  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(elem.current)
    panzoom2 = panzoom2Ref.current = Panzoom(elemTwo.current, {
      setTransform: (
        _elem: HTMLElement | SVGElement,
        { x, y, scale }: { x: number; y: number; scale: number }
      ) => {
        // Adjust the panning according to the parent's scale
        const parentScale = panzoom.getScale()
        panzoom2.setStyle(
          'transform',
          `scale(${scale}) translate(${x / parentScale}px, ${y / parentScale}px)`
        )
      }
    })
  }, [])

  function adjustScale(zoomIn: boolean) {
    const oldScale = panzoom.getScale()
    if (zoomIn) {
      panzoom.zoomIn()
    } else {
      panzoom.zoomOut()
    }
    const newScale = panzoom.getScale()
    const pan = panzoom2.getPan()
    // Adjust child starting X/Y according the new scale for panning
    panzoom2.pan((pan.x / oldScale) * newScale, (pan.y / oldScale) * newScale, {
      animate: true
    })
  }
  return (
    <Demo
      code={code}
      subtitle="With no zooming, this is trivial. However, if you want the parent to zoom, you must account for the parent's scale to pan the child element properly."
      title="A Panzoom instance within another Panzoom instance"
    >
      <div className="buttons">
        <button onClick={() => adjustScale(true)}>Zoom In</button>
        <button onClick={() => adjustScale(false)}>Zoom Out</button>
        <button
          onClick={() => {
            panzoom.reset()
            panzoom2.reset()
          }}
        >
          Reset
        </button>
      </div>
      <div className="panzoom-parent">
        <div
          ref={elem}
          className="panzoom"
          style={{
            width: '400px',
            border: '2px dotted',
            margin: '0 auto'
          }}
        >
          <div
            ref={elemTwo}
            style={{
              width: '200px',
              margin: '0 auto',
              padding: 20,
              backgroundColor: '#33DDDD',
              border: '1px solid #000000',
              color: 'black',
              textAlign: 'center'
            }}
          >
            This is a Panzoom element within another Panzoom element. See example code for panning
            within a zoomed parent.
          </div>
          <img src="awesome_tiger.svg" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </Demo>
  )
}
