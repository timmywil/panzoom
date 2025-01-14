import React, { CSSProperties, useEffect, useRef } from 'react'

import Panzoom from '../../src/panzoom.js'
import Code from '../Code.js'
import Demo from '../Demo.js'

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
    <Demo code={code} title="Exclude elements within the Panzoom element from event handling">
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
          <img src="awesome_tiger.svg" style={{ width: '100%', height: '100%' }} />
          <a
            href="https://timmywil.com/panzoom/"
            id="link"
            rel="noopener noreferrer"
            style={anchorStyle}
            target="_blank"
          >
            This link will not allow dragging.
          </a>
          <a
            className="custom-excluded-class"
            href="https://timmywil.com/panzoom/"
            rel="noopener noreferrer"
            style={{ ...anchorStyle, top: ANCHOR_TOP + 50 }}
            target="_blank"
          >
            This link will also not allow dragging.
          </a>
          <a
            href="https://timmywil.com/panzoom/"
            rel="noopener noreferrer"
            style={{ ...anchorStyle, top: ANCHOR_TOP + 100 }}
            target="_blank"
          >
            This one will allow dragging.
          </a>
        </div>
      </div>
    </Demo>
  )
}
