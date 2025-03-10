import React, { useEffect, useRef } from 'react'
import Panzoom from '../../src/panzoom.js'
import Code from '../Code.js'
import Demo from '../Demo.js'

const code = (
  <Code>{`const panzoom = Panzoom(elem, {
  setTransform: (_, { scale, x, y }) => {
    panzoom.setStyle('transform', \`rotate($\{x / 20}deg) scale($\{scale}) translate($\{x}px, $\{y}px)\`)
  }
})`}</Code>
)

const code2 = <Code>{`Panzoom(elem)`}</Code>

export default function Rotate() {
  const elem = useRef<HTMLDivElement>(null)
  const elem2 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const panzoom = Panzoom(elem.current, {
      setTransform: (
        _: HTMLElement | SVGElement,
        { scale, x, y }: { scale: number; x: number; y: number }
      ) => {
        panzoom.setStyle(
          'transform',
          `rotate(${x / 20}deg) scale(${scale}) translate(${x}px, ${y}px)`
        )
      }
    })
    Panzoom(elem2.current)
  }, [])
  return (
    <>
      <Demo
        code={code}
        subtitle="Warning: the setTransform option should be used with caution. Most cases can be handled by adding a parent element and applying any special transforms to the child (see the next example)."
        title="Adding on matrix functions to the transform"
      >
        <div className="panzoom-parent">
          <div ref={elem} className="panzoom" style={{ width: '400px', margin: '0 auto' }}>
            <img src="awesome_tiger.svg" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </Demo>
      <Demo
        code={code2}
        subtitle="A rotation of 180deg is applied to the image tag. It's almost always better to add any special transforms to a child of the panzoom element instead of the panzoom element."
        title="Adding a transform to a child"
      >
        <div className="panzoom-parent">
          <div ref={elem2} className="panzoom" style={{ width: '400px', margin: '0 auto' }}>
            <img
              src="awesome_tiger.svg"
              style={{ width: '100%', height: '100%', transform: 'rotate(180deg)' }}
            />
          </div>
        </div>
      </Demo>
    </>
  )
}
