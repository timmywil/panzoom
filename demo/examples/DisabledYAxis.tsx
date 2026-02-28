import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom.js'
import Code from '../Code.js'
import Demo from '../Demo.js'

const code = <Code>{`Panzoom(elem, { disableYAxis: true })`}</Code>

export default function DisabledYAxis() {
  const elem = useRef<HTMLDivElement>(null)
  useEffect(() => {
    Panzoom(elem.current, { disableYAxis: true })
  }, [])
  return (
    <Demo code={code} title="Disabling one axis">
      <div className="panzoom-parent">
        <div ref={elem} className="panzoom" style={{ width: '400px', margin: '0 auto' }}>
          <img src="awesome_tiger.svg" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </Demo>
  )
}
