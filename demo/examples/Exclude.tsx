import React, { CSSProperties, useEffect, useRef } from 'react'

import Code from '../Code'
import Demo from '../Demo'
import Panzoom from '../../src/panzoom'

const code = (
  <Code>{`\
Panzoom(elem, {
  // Can add an element reference
  exclude: [document.getElementById('link')],
  // ...or set a class on the element
  excludeClass: 'custom-excluded-class'
})`}</Code>
)

const ANCHOR_TOP = 20

const anchorStyle: CSSProperties = {
  position: 'absolute',
  top: ANCHOR_TOP,
  left: 0,
  right: 0,
  padding: '10px 0',
  textAlign: 'center',
  fontSize: 20,
  color: '#baffc1',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderWidth: 1,
  borderColor: '#dd33aa'
}

const lastAnchorStyle = {
  ...anchorStyle,
  top: ANCHOR_TOP + 50
}

export default function Exclude() {
  const elem = useRef<HTMLDivElement>(null)
  const elemTwo = useRef<HTMLDivElement>(null)
  useEffect(() => {
    Panzoom(elem.current, {
      exclude: [document.getElementById('link')],
      excludeClass: 'custom-excluded-class'
    })
    Panzoom(elemTwo.current)
  }, [])
  return (
    <Demo title="Exclude elements within the Panzoom element from event handling" code={code}>
      <div className="panzoom-parent">
        <div
          className="panzoom"
          ref={elem}
          style={{
            width: '400px',
            border: '2px dotted',
            margin: '0 auto'
          }}>
          <img style={{ width: '100%', height: '100%' }} src="awesome_tiger.svg" />
          <a
            style={anchorStyle}
            target="_blank"
            rel="noopener noreferrer"
            id="link"
            href="https://timmywil.com/panzoom/">
            This link will handle the click
          </a>
          <a style={lastAnchorStyle}>This one will pass through the event.</a>
          <div
            ref={elemTwo}
            style={{
              width: '200px',
              margin: '0 auto',
              padding: 20,
              backgroundColor: '#33DDDD',
              color: 'black'
            }}>
            This is a Panzoom element within another Panzoom element. This works by default.
          </div>
        </div>
      </div>
    </Demo>
  )
}
