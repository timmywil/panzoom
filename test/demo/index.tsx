import React from 'react'
import ReactDOM from 'react-dom'
import './demo.css'
import Focal from './examples/Focal'
import Standard from './examples/Standard'

function Demos() {
  return (
    <div className="container">
      <h1 className="main-header">Panzoom demos</h1>
      <Standard />
      <Focal />
    </div>
  )
}

ReactDOM.render(<Demos />, document.getElementById('container'))
