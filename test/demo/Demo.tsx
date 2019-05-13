import React from 'react'
import Code from './Code'

interface Props {
  title: string
  code: string
  children: React.ReactNode
}

export default function Demo({ title, code, children }: Props) {
  return (
    <div className="demo">
      <h2>{title}</h2>
      <Code>{code}</Code>
      <div className="live-example">{children}</div>
    </div>
  )
}
