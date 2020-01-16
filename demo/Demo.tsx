import React from 'react'

interface Props {
  title: string
  subtitle?: string
  code: React.ReactNode
  children: React.ReactNode
}

export default function Demo({ title, subtitle, code, children }: Props) {
  return (
    <div className="demo">
      <a
        id={title}
        href={`#${encodeURIComponent(title)}`}
        style={{ textDecoration: 'none', color: 'black' }}>
        <h2>{title}</h2>
      </a>
      {code}
      {subtitle && <p>{subtitle}</p>}
      <div className="live-example">{children}</div>
    </div>
  )
}
