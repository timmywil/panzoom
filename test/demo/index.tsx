import React from 'react'
import ReactDOM from 'react-dom'
import './demo.css'
import Focal from './Focal'

function Demos() {
  return (
    <div className="container">
      <h1 className="main-header">Panzoom demos</h1>
      <Focal />
    </div>
  )
}

ReactDOM.render(<Demos />, document.body)
