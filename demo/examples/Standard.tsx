import React, { useEffect, useRef, useState } from 'react'
import Panzoom from '../../src/panzoom'
import { PanzoomObject } from '../../src/types'
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
    <Demo title="Panning and zooming" code={code}>
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn()
            range.current.value = panzoom.getScale() + ''
          }}>
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut()
            range.current.value = panzoom.getScale() + ''
          }}>
          Zoom out
        </button>
        <button
          onClick={() => {
            panzoom.reset()
            range.current.value = panzoom.getScale() + ''
          }}>
          Reset
        </button>
        <input
          ref={range}
          onInput={(event) => {
            panzoom.zoom((event.target as HTMLInputElement).valueAsNumber)
          }}
          onChange={(event) => {
            panzoom.zoom((event.target as HTMLInputElement).valueAsNumber)
          }}
          className="range-input"
          type="range"
          min="0.1"
          max="4"
          step="0.1"
          defaultValue="1"
        />
        <div>
          <input
            type="checkbox"
            id="disable-pan"
            checked={panEnabled}
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
        <div className="panzoom" ref={elem}>
          <img width="450" height="450" src="awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
