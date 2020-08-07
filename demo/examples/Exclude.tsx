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

export default function Exclude() {
  const elem = useRef<HTMLDivElement>(null)
  useEffect(() => {
    Panzoom(elem.current, {
      exclude: [document.getElementById('link')],
      excludeClass: 'custom-excluded-class'
    })
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
            id="link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://timmywil.com/panzoom/">
            This link will not allow dragging.
          </a>
          <a
            style={{ ...anchorStyle, top: ANCHOR_TOP + 50 }}
            className="custom-excluded-class"
            target="_blank"
            rel="noopener noreferrer"
            href="https://timmywil.com/panzoom/">
            This link will also not allow dragging.
          </a>
          <a
            style={{ ...anchorStyle, top: ANCHOR_TOP + 100 }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://timmywil.com/panzoom/">
            This one will allow dragging.
          </a>
        </div>
      </div>
    </Demo>
  )
}
