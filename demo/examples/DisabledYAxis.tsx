import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom'
import Code from '../Code'
import Demo from '../Demo'

const code = <Code>{`Panzoom(elem, { disableYAxis: true })`}</Code>

export default function DisabledYAxis() {
  const elem = useRef<HTMLDivElement>(null)
  useEffect(() => {
    Panzoom(elem.current, { disableYAxis: true })
  }, [])
  return (
    <Demo title="Disabling one axis" code={code}>
      <div className="panzoom-parent">
        <div className="panzoom" ref={elem} style={{ width: '400px', margin: '0 auto' }}>
          <img style={{ width: '100%', height: '100%' }} src="awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
