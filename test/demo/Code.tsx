import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import React, { useEffect, useRef } from 'react'

interface Props {
  language?: string
  children: string
}

export default function Code({ children, language = 'javascript' }: Props) {
  const elem = useRef(null)
  useEffect(() => {
    Prism.highlightElement(elem.current, false)
  }, [])
  return (
    <pre className={`language-${language}`} ref={elem}>
      <code>{children}</code>
    </pre>
  )
}
