import React from 'react'
import "./dataview.css"
const DataView = (props) => {
  return (
    <div className='comp-box'>
      { props.children}
    </div>
  )
}

export default DataView
