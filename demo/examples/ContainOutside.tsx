import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom'
import Code from '../Code'
import Demo from '../Demo'

const code = <Code>{`Panzoom(elem, { contain: 'outside', startScale: 1.5 })`}</Code>

export default function ContainOutside() {
  const elem = useRef<HTMLDivElement>(null)
  useEffect(() => {
    Panzoom(elem.current, { contain: 'outside', startScale: 1.5 })
  }, [])
  return (
    <Demo title="Containment within a parent" code={code}>
      <div className="panzoom-parent" style={{ height: '900px' }}>
        <div
          className="panzoom"
          ref={elem}
          style={{
            background: '#000',
            width: '900px',
            height: '900px',
            border: '1px solid #ddee00'
          }}>
          <img style={{ width: '100%', height: '100%' }} src="awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
