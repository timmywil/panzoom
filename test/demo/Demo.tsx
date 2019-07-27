import React from 'react'

interface Props {
  title: string
  code: React.ReactNode
  children: React.ReactNode
}

export default function Demo({ title, code, children }: Props) {
  return (
    <div className="demo">
      <h2>{title}</h2>
      {code}
      <div className="live-example">{children}</div>
    </div>
  )
}
