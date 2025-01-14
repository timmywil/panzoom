import React, { useEffect, useRef, useState } from 'react'
import Panzoom from '../../src/panzoom.js'
import { PanzoomObject } from '../../src/types.js'
import Code from '../Code.js'
import Demo from '../Demo.js'

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

export default function Standard() {
  const elem = useRef<HTMLDivElement>(null)
  const range = useRef<HTMLInputElement>(null)
  const panzoomRef = useRef<PanzoomObject>(null)
  let panzoom = panzoomRef.current
  const [panEnabled, setPanEnabled] = useState(true)
  useEffect(() => {
    panzoom = panzoomRef.current = Panzoom(elem.current)
  }, [])
  return (
    <Demo code={code} title="Panning and zooming">
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn()
            range.current.value = panzoom.getScale() + ''
          }}
        >
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut()
            range.current.value = panzoom.getScale() + ''
          }}
        >
          Zoom out
        </button>
        <button
          onClick={() => {
            panzoom.reset()
            range.current.value = panzoom.getScale() + ''
          }}
        >
          Reset
        </button>
        <input
          ref={range}
          className="range-input"
          defaultValue="1"
          max="4"
          min="0.1"
          step="0.1"
          type="range"
          onChange={(event) => {
            panzoom.zoom((event.target as HTMLInputElement).valueAsNumber)
          }}
          onInput={(event) => {
            panzoom.zoom((event.target as HTMLInputElement).valueAsNumber)
          }}
        />
        <div>
          <input
            checked={panEnabled}
            id="disable-pan"
            type="checkbox"
            onChange={(e) => {
              setPanEnabled(e.target.checked)
              panzoom.setOptions({
                disablePan: !e.target.checked
              })
            }}
          />
          <label htmlFor="disable-pan">Enable panning</label>
        </div>
      </div>
      <div className="panzoom-parent">
        <div ref={elem} className="panzoom">
          <img height="450" src="awesome_tiger.svg" width="450" />
        </div>
      </div>
    </Demo>
  )
}
