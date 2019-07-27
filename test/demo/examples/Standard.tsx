import React, { useEffect, useRef, useState } from 'react'
import Panzoom from '../../../src/panzoom'
import Code from '../Code'
import Demo from '../Demo'

const code = (
  <Code>
    {`\
const panzoom = Panzoom(elem)
zoomInButton.addEventListener('click', panzoom.zoomIn)
zoomOutButton.addEventListener('click', panzoom.zoomOut)
resetButton.addEventListener('click', panzoom.reset)
rangeInput.addEventListener('input', (event) => {
  panzoom.zoom(event.target.valueAsNumber)
})`}
  </Code>
)

export default function Focal() {
  const elem = useRef<HTMLDivElement>(null)
  const range = useRef<HTMLInputElement>(null)
  const panzoomRef = useRef<Panzoom>(null)
  let panzoom = panzoomRef.current
  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(elem.current)
  }, [])
  return (
    <Demo title="Panning and zooming" code={code}>
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn()
            range.current.value = panzoom.getScale()
          }}>
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut()
            range.current.value = panzoom.getScale()
          }}>
          Zoom out
        </button>
        <button onClick={() => panzoom.reset()}>Reset</button>
        <input
          ref={range}
          onInput={(event) => {
            panzoom.zoom((event.target as HTMLInputElement).valueAsNumber)
          }}
          className="range-input"
          type="range"
          min="0.1"
          max="4"
          step="0.1"
          defaultValue="1"
        />
      </div>
      <div className="panzoom-parent">
        <div className="panzoom" ref={elem}>
          <img width="450" height="450" src="/test/demo/awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
