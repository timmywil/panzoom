import React, { useEffect, useRef } from 'react'
import Panzoom from '../../panzoom'
import Demo from './Demo'

const exampleCode = `
Panzoom(elem, {
  focal: true
})
`

console.log(Panzoom.awesome)

export default function Focal() {
  const elem = useRef(null)
  useEffect(() => {
    console.log(elem.current)
    // Panzoom()
  }, [])
  return (
    <Demo title="Focal point zooming using mousewheel" code={exampleCode}>
      <div className="panzoom" ref={elem}>
        <img src="/test/demo/awesome_tiger.svg" />
      </div>
    </Demo>
  )
}
